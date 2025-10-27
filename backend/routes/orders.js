import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route   GET /api/orders
// @desc    Get all orders with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { 
      type,
      status, 
      priority,
      supplier,
      search, 
      startDate,
      endDate,
      sortBy = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = {};
    
    if (type) query.type = type;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (supplier) query.supplier = supplier;
    
    // Date range filter
    if (startDate || endDate) {
      query['dates.orderDate'] = {};
      if (startDate) query['dates.orderDate'].$gte = new Date(startDate);
      if (endDate) query['dates.orderDate'].$lte = new Date(endDate);
    }
    
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.company': { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const orders = await Order.find(query)
      .populate('supplier', 'name code')
      .populate('items.inventory', 'name sku')
      .populate('createdBy', 'name')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

// @route   GET /api/orders/stats
// @desc    Get order statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$pricing.total' },
          avgOrderValue: { $avg: '$pricing.total' },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          processingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'processing'] }, 1, 0] }
          },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          }
        }
      }
    ]);

    // Orders by type
    const ordersByType = await Order.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalValue: { $sum: '$pricing.total' }
        }
      }
    ]);

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentTrends = await Order.aggregate([
      {
        $match: {
          'dates.orderDate': { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$dates.orderDate' } },
          orders: { $sum: 1 },
          revenue: { $sum: '$pricing.total' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {},
        byType: ordersByType,
        byStatus: ordersByStatus,
        recentTrends
      }
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order statistics',
      error: error.message
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('supplier')
      .populate('items.inventory')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('history.user', 'name')
      .populate('approvals.approvedBy', 'name');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private (Admin, Manager)
router.post('/', protect, authorize('admin', 'manager'), [
  body('type').isIn(['purchase', 'sales', 'transfer']).withMessage('Invalid order type'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.inventory').notEmpty().withMessage('Inventory ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.unitPrice').isFloat({ min: 0 }).withMessage('Unit price must be non-negative'),
  handleValidationErrors
], async (req, res) => {
  try {
    const orderData = req.body;

    // Calculate item totals
    for (const item of orderData.items) {
      const inventoryItem = await Inventory.findById(item.inventory);
      if (!inventoryItem) {
        return res.status(404).json({
          success: false,
          message: `Inventory item ${item.inventory} not found`
        });
      }

      item.sku = inventoryItem.sku;
      item.name = inventoryItem.name;
      item.totalPrice = item.quantity * item.unitPrice;

      // Check stock for sales orders
      if (orderData.type === 'sales' && inventoryItem.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${inventoryItem.name}. Available: ${inventoryItem.quantity}, Requested: ${item.quantity}`
        });
      }
    }

    // Calculate order totals
    const subtotal = orderData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    orderData.pricing = {
      subtotal,
      discount: orderData.pricing?.discount || 0,
      tax: orderData.pricing?.tax || 0,
      shipping: orderData.pricing?.shipping || 0,
      total: subtotal + (orderData.pricing?.tax || 0) + (orderData.pricing?.shipping || 0) - (orderData.pricing?.discount || 0),
      currency: orderData.pricing?.currency || 'USD'
    };

    // Create order
    const order = await Order.create({
      ...orderData,
      createdBy: req.user.id,
      updatedBy: req.user.id
    });

    // Update inventory for sales orders
    if (order.type === 'sales') {
      for (const item of order.items) {
        await Inventory.findByIdAndUpdate(item.inventory, {
          $inc: { quantity: -item.quantity }
        });
      }
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('supplier', 'name code')
      .populate('items.inventory', 'name sku')
      .populate('createdBy', 'name');

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order
// @access  Private (Admin, Manager)
router.put('/:id', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Don't allow editing delivered or cancelled orders
    if (['delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot edit ${order.status} orders`
      });
    }

    // Add history entry
    const historyEntry = {
      action: 'updated',
      description: `Order updated by ${req.user.name}`,
      user: req.user.id
    };

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id,
        $push: { history: historyEntry }
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('supplier', 'name code')
     .populate('items.inventory', 'name sku')
     .populate('updatedBy', 'name');

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Admin, Manager)
router.put('/:id/status', protect, authorize('admin', 'manager'), [
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'])
    .withMessage('Invalid status'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { status, notes } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const oldStatus = order.status;
    order.status = status;

    // Update specific dates based on status
    if (status === 'shipped') {
      order.shipping.shippedDate = new Date();
    } else if (status === 'delivered') {
      order.shipping.actualDelivery = new Date();
      order.dates.completedDate = new Date();
    }

    // Handle inventory updates for cancelled orders
    if (status === 'cancelled' && order.type === 'sales' && oldStatus !== 'cancelled') {
      // Return items to inventory
      for (const item of order.items) {
        await Inventory.findByIdAndUpdate(item.inventory, {
          $inc: { quantity: item.quantity }
        });
      }
    }

    // Add history entry
    order.history.push({
      action: 'status_change',
      description: `Status changed from ${oldStatus} to ${status}${notes ? `. Note: ${notes}` : ''}`,
      user: req.user.id
    });

    order.updatedBy = req.user.id;
    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate('supplier', 'name code')
      .populate('items.inventory', 'name sku')
      .populate('history.user', 'name');

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Delete order
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Don't allow deleting delivered orders
    if (order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete delivered orders'
      });
    }

    // If sales order was not cancelled, return items to inventory
    if (order.type === 'sales' && order.status !== 'cancelled') {
      for (const item of order.items) {
        await Inventory.findByIdAndUpdate(item.inventory, {
          $inc: { quantity: item.quantity }
        });
      }
    }

    await order.deleteOne();

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message
    });
  }
});

export default router;
