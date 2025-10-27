import express from 'express';
import { body, validationResult } from 'express-validator';
import Supplier from '../models/Supplier.js';
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

// @route   GET /api/suppliers
// @desc    Get all suppliers with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { 
      status, 
      category,
      search, 
      sortBy = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (category) query.categories = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { 'contactPerson.name': { $regex: search, $options: 'i' } },
        { 'contactPerson.email': { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const suppliers = await Supplier.find(query)
      .populate('createdBy', 'name')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await Supplier.countDocuments(query);

    res.json({
      success: true,
      count: suppliers.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: suppliers
    });
  } catch (error) {
    console.error('Get suppliers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching suppliers',
      error: error.message
    });
  }
});

// @route   GET /api/suppliers/stats
// @desc    Get supplier statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Supplier.aggregate([
      {
        $group: {
          _id: null,
          totalSuppliers: { $sum: 1 },
          activeSuppliers: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          inactiveSuppliers: {
            $sum: { $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0] }
          },
          avgRating: { $avg: '$rating' },
          avgOnTimeDelivery: { $avg: '$performanceMetrics.onTimeDeliveryRate' },
          avgQualityScore: { $avg: '$performanceMetrics.qualityScore' }
        }
      }
    ]);

    const categoryStats = await Supplier.aggregate([
      { $unwind: '$categories' },
      {
        $group: {
          _id: '$categories',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const topSuppliers = await Supplier.find({ status: 'active' })
      .sort({ rating: -1 })
      .limit(5)
      .select('name code rating performanceMetrics');

    res.json({
      success: true,
      data: {
        overview: stats[0] || {},
        byCategory: categoryStats,
        topSuppliers
      }
    });
  } catch (error) {
    console.error('Get supplier stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching supplier statistics',
      error: error.message
    });
  }
});

// @route   GET /api/suppliers/:id
// @desc    Get single supplier
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    res.json({
      success: true,
      data: supplier
    });
  } catch (error) {
    console.error('Get supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching supplier',
      error: error.message
    });
  }
});

// @route   POST /api/suppliers
// @desc    Create new supplier
// @access  Private (Admin, Manager)
router.post('/', protect, authorize('admin', 'manager'), [
  body('code').notEmpty().withMessage('Supplier code is required'),
  body('name').notEmpty().withMessage('Supplier name is required'),
  body('contactPerson.name').notEmpty().withMessage('Contact person name is required'),
  body('contactPerson.email').isEmail().withMessage('Valid email is required'),
  body('contactPerson.phone').notEmpty().withMessage('Contact phone is required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.country').notEmpty().withMessage('Country is required'),
  body('address.postalCode').notEmpty().withMessage('Postal code is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    // Check if code already exists
    const existingSupplier = await Supplier.findOne({ code: req.body.code.toUpperCase() });
    if (existingSupplier) {
      return res.status(400).json({
        success: false,
        message: 'Supplier code already exists'
      });
    }

    const supplier = await Supplier.create({
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id
    });

    const populatedSupplier = await Supplier.findById(supplier._id)
      .populate('createdBy', 'name');

    res.status(201).json({
      success: true,
      data: populatedSupplier
    });
  } catch (error) {
    console.error('Create supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating supplier',
      error: error.message
    });
  }
});

// @route   PUT /api/suppliers/:id
// @desc    Update supplier
// @access  Private (Admin, Manager)
router.put('/:id', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    // Don't allow changing code to one that already exists
    if (req.body.code && req.body.code !== supplier.code) {
      const existingSupplier = await Supplier.findOne({ code: req.body.code.toUpperCase() });
      if (existingSupplier) {
        return res.status(400).json({
          success: false,
          message: 'Supplier code already exists'
        });
      }
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('updatedBy', 'name');

    res.json({
      success: true,
      data: updatedSupplier
    });
  } catch (error) {
    console.error('Update supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating supplier',
      error: error.message
    });
  }
});

// @route   PUT /api/suppliers/:id/performance
// @desc    Update supplier performance metrics
// @access  Private (Admin, Manager)
router.put('/:id/performance', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { onTimeDeliveryRate, qualityScore, responseTime, rating } = req.body;

    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    // Update performance metrics
    if (onTimeDeliveryRate !== undefined) {
      supplier.performanceMetrics.onTimeDeliveryRate = onTimeDeliveryRate;
    }
    if (qualityScore !== undefined) {
      supplier.performanceMetrics.qualityScore = qualityScore;
    }
    if (responseTime !== undefined) {
      supplier.performanceMetrics.responseTime = responseTime;
    }
    if (rating !== undefined) {
      supplier.rating = rating;
    }

    supplier.updatedBy = req.user.id;
    await supplier.save();

    res.json({
      success: true,
      data: supplier
    });
  } catch (error) {
    console.error('Update supplier performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating supplier performance',
      error: error.message
    });
  }
});

// @route   DELETE /api/suppliers/:id
// @desc    Delete supplier
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    // Check if supplier has active inventory items
    const Inventory = (await import('../models/Inventory.js')).default;
    const inventoryCount = await Inventory.countDocuments({ supplier: req.params.id });

    if (inventoryCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete supplier. ${inventoryCount} inventory items are linked to this supplier.`
      });
    }

    await supplier.deleteOne();

    res.json({
      success: true,
      message: 'Supplier deleted successfully'
    });
  } catch (error) {
    console.error('Delete supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting supplier',
      error: error.message
    });
  }
});

// @route   GET /api/suppliers/:id/products
// @desc    Get products from a specific supplier
// @access  Private
router.get('/:id/products', protect, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    // Get inventory items from this supplier
    const Inventory = (await import('../models/Inventory.js')).default;
    const products = await Inventory.find({ supplier: req.params.id })
      .select('sku name category quantity unitCost status');

    res.json({
      success: true,
      supplier: {
        id: supplier._id,
        name: supplier.name,
        code: supplier.code
      },
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Get supplier products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching supplier products',
      error: error.message
    });
  }
});

export default router;
