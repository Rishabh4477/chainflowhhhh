import express from 'express';
import { body, validationResult } from 'express-validator';
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

// @route   GET /api/inventory
// @desc    Get all inventory items with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { 
      category, 
      status, 
      supplier, 
      search, 
      sortBy = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (supplier) query.supplier = supplier;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const inventory = await Inventory.find(query)
      .populate('supplier', 'name code')
      .populate('createdBy', 'name')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await Inventory.countDocuments(query);

    res.json({
      success: true,
      count: inventory.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: inventory
    });
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory',
      error: error.message
    });
  }
});

// @route   GET /api/inventory/stats
// @desc    Get inventory statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          totalValue: { $sum: '$totalValue' },
          totalQuantity: { $sum: '$quantity' },
          avgUnitCost: { $avg: '$unitCost' },
          lowStockItems: {
            $sum: {
              $cond: [{ $eq: ['$status', 'low_stock'] }, 1, 0]
            }
          },
          outOfStockItems: {
            $sum: {
              $cond: [{ $eq: ['$status', 'out_of_stock'] }, 1, 0]
            }
          }
        }
      }
    ]);

    const categoryStats = await Inventory.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: '$totalValue' },
          totalQuantity: { $sum: '$quantity' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {},
        byCategory: categoryStats
      }
    });
  } catch (error) {
    console.error('Get inventory stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory statistics',
      error: error.message
    });
  }
});

// @route   GET /api/inventory/:id
// @desc    Get single inventory item
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id)
      .populate('supplier')
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Get inventory item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory item',
      error: error.message
    });
  }
});

// @route   POST /api/inventory
// @desc    Create new inventory item
// @access  Private (Admin, Manager)
router.post('/', protect, authorize('admin', 'manager'), [
  body('sku').notEmpty().withMessage('SKU is required'),
  body('name').notEmpty().withMessage('Product name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('unitCost').isNumeric().withMessage('Unit cost must be a number'),
  handleValidationErrors
], async (req, res) => {
  try {
    // Check if SKU already exists
    const existingItem = await Inventory.findOne({ sku: req.body.sku.toUpperCase() });
    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists'
      });
    }

    const item = await Inventory.create({
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id
    });

    const populatedItem = await Inventory.findById(item._id)
      .populate('supplier', 'name code')
      .populate('createdBy', 'name');

    res.status(201).json({
      success: true,
      data: populatedItem
    });
  } catch (error) {
    console.error('Create inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating inventory item',
      error: error.message
    });
  }
});

// @route   PUT /api/inventory/:id
// @desc    Update inventory item
// @access  Private (Admin, Manager)
router.put('/:id', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    // Don't allow changing SKU to one that already exists
    if (req.body.sku && req.body.sku !== item.sku) {
      const existingItem = await Inventory.findOne({ sku: req.body.sku.toUpperCase() });
      if (existingItem) {
        return res.status(400).json({
          success: false,
          message: 'SKU already exists'
        });
      }
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('supplier', 'name code')
     .populate('updatedBy', 'name');

    res.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating inventory item',
      error: error.message
    });
  }
});

// @route   PUT /api/inventory/:id/adjust
// @desc    Adjust inventory quantity
// @access  Private (Admin, Manager)
router.put('/:id/adjust', protect, authorize('admin', 'manager'), [
  body('adjustment').isNumeric().withMessage('Adjustment must be a number'),
  body('reason').notEmpty().withMessage('Reason is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { adjustment, reason } = req.body;
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    // Calculate new quantity
    const newQuantity = item.quantity + parseInt(adjustment);

    if (newQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient inventory'
      });
    }

    item.quantity = newQuantity;
    item.updatedBy = req.user.id;
    
    // Add adjustment to notes
    item.notes = `${item.notes || ''}\n[${new Date().toISOString()}] Adjustment: ${adjustment} units. Reason: ${reason}. By: ${req.user.name}`;

    await item.save();

    const updatedItem = await Inventory.findById(item._id)
      .populate('supplier', 'name code')
      .populate('updatedBy', 'name');

    res.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Adjust inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adjusting inventory',
      error: error.message
    });
  }
});

// @route   DELETE /api/inventory/:id
// @desc    Delete inventory item
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: 'Inventory item deleted successfully'
    });
  } catch (error) {
    console.error('Delete inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting inventory item',
      error: error.message
    });
  }
});

// @route   GET /api/inventory/low-stock/alerts
// @desc    Get low stock alerts
// @access  Private
router.get('/low-stock/alerts', protect, async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({
      $or: [
        { status: 'low_stock' },
        { status: 'out_of_stock' },
        { $expr: { $lte: ['$quantity', '$reorderPoint'] } }
      ]
    }).populate('supplier', 'name code contactPerson');

    res.json({
      success: true,
      count: lowStockItems.length,
      data: lowStockItems
    });
  } catch (error) {
    console.error('Get low stock alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching low stock alerts',
      error: error.message
    });
  }
});

export default router;
