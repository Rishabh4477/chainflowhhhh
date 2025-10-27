import express from 'express';
import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';
import Supplier from '../models/Supplier.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Private
router.get('/dashboard', protect, async (req, res) => {
  try {
    // Get date ranges
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const lastMonth = new Date(thisMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const thisYear = new Date();
    thisYear.setMonth(0);
    thisYear.setDate(1);
    thisYear.setHours(0, 0, 0, 0);

    // Inventory metrics
    const inventoryMetrics = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          totalValue: { $sum: '$totalValue' },
          lowStockItems: {
            $sum: { $cond: [{ $eq: ['$status', 'low_stock'] }, 1, 0] }
          },
          outOfStockItems: {
            $sum: { $cond: [{ $eq: ['$status', 'out_of_stock'] }, 1, 0] }
          }
        }
      }
    ]);

    // Supplier metrics
    const supplierMetrics = await Supplier.aggregate([
      {
        $group: {
          _id: null,
          totalSuppliers: { $sum: 1 },
          activeSuppliers: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          }
        }
      }
    ]);

    // Order metrics
    const orderMetrics = await Order.aggregate([
      {
        $facet: {
          total: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                revenue: { $sum: '$pricing.total' }
              }
            }
          ],
          today: [
            {
              $match: {
                'dates.orderDate': { $gte: today }
              }
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                revenue: { $sum: '$pricing.total' }
              }
            }
          ],
          thisMonth: [
            {
              $match: {
                'dates.orderDate': { $gte: thisMonth }
              }
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                revenue: { $sum: '$pricing.total' }
              }
            }
          ],
          pending: [
            {
              $match: {
                status: { $in: ['pending', 'processing'] }
              }
            },
            {
              $count: 'count'
            }
          ],
          shipped: [
            {
              $match: {
                status: 'shipped',
                'shipping.shippedDate': { $gte: thisMonth }
              }
            },
            {
              $count: 'count'
            }
          ]
        }
      }
    ]);

    // Recent activities
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('supplier', 'name')
      .select('orderNumber type status pricing.total createdAt');

    res.json({
      success: true,
      data: {
        inventory: inventoryMetrics[0] || {
          totalItems: 0,
          totalValue: 0,
          lowStockItems: 0,
          outOfStockItems: 0
        },
        suppliers: supplierMetrics[0] || {
          totalSuppliers: 0,
          activeSuppliers: 0
        },
        orders: {
          total: orderMetrics[0].total[0] || { count: 0, revenue: 0 },
          today: orderMetrics[0].today[0] || { count: 0, revenue: 0 },
          thisMonth: orderMetrics[0].thisMonth[0] || { count: 0, revenue: 0 },
          pending: orderMetrics[0].pending[0]?.count || 0,
          shipped: orderMetrics[0].shipped[0]?.count || 0
        },
        recentOrders
      }
    });
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard analytics',
      error: error.message
    });
  }
});

// @route   GET /api/analytics/inventory-trends
// @desc    Get inventory trends over time
// @access  Private
router.get('/inventory-trends', protect, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Get inventory value over time (simplified - in production would need daily snapshots)
    const inventoryByCategory = await Inventory.aggregate([
      {
        $group: {
          _id: '$category',
          totalValue: { $sum: '$totalValue' },
          totalQuantity: { $sum: '$quantity' },
          itemCount: { $sum: 1 }
        }
      },
      { $sort: { totalValue: -1 } }
    ]);

    // Get top moving items (based on recent orders)
    const topMovingItems = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.inventory',
          totalQuantity: { $sum: '$items.quantity' },
          totalValue: { $sum: '$items.totalPrice' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'inventories',
          localField: '_id',
          foreignField: '_id',
          as: 'inventory'
        }
      },
      { $unwind: '$inventory' },
      {
        $project: {
          name: '$inventory.name',
          sku: '$inventory.sku',
          totalQuantity: 1,
          totalValue: 1,
          orderCount: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        byCategory: inventoryByCategory,
        topMovingItems
      }
    });
  } catch (error) {
    console.error('Inventory trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory trends',
      error: error.message
    });
  }
});

// @route   GET /api/analytics/order-analytics
// @desc    Get detailed order analytics
// @access  Private
router.get('/order-analytics', protect, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);
    
    const matchStage = Object.keys(dateFilter).length > 0 
      ? { $match: { 'dates.orderDate': dateFilter } }
      : { $match: {} };

    const orderAnalytics = await Order.aggregate([
      matchStage,
      {
        $facet: {
          byType: [
            {
              $group: {
                _id: '$type',
                count: { $sum: 1 },
                totalValue: { $sum: '$pricing.total' },
                avgValue: { $avg: '$pricing.total' }
              }
            }
          ],
          byStatus: [
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalValue: { $sum: '$pricing.total' }
              }
            }
          ],
          byPriority: [
            {
              $group: {
                _id: '$priority',
                count: { $sum: 1 },
                totalValue: { $sum: '$pricing.total' }
              }
            }
          ],
          timeline: [
            {
              $group: {
                _id: {
                  year: { $year: '$dates.orderDate' },
                  month: { $month: '$dates.orderDate' },
                  day: { $dayOfMonth: '$dates.orderDate' }
                },
                count: { $sum: 1 },
                revenue: { $sum: '$pricing.total' }
              }
            },
            {
              $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
            },
            { $limit: 30 }
          ],
          topSuppliers: [
            {
              $match: { supplier: { $exists: true } }
            },
            {
              $group: {
                _id: '$supplier',
                orderCount: { $sum: 1 },
                totalSpent: { $sum: '$pricing.total' }
              }
            },
            { $sort: { totalSpent: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: 'suppliers',
                localField: '_id',
                foreignField: '_id',
                as: 'supplier'
              }
            },
            { $unwind: '$supplier' },
            {
              $project: {
                name: '$supplier.name',
                code: '$supplier.code',
                orderCount: 1,
                totalSpent: 1
              }
            }
          ]
        }
      }
    ]);

    res.json({
      success: true,
      data: orderAnalytics[0]
    });
  } catch (error) {
    console.error('Order analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order analytics',
      error: error.message
    });
  }
});

// @route   GET /api/analytics/supplier-performance
// @desc    Get supplier performance analytics
// @access  Private
router.get('/supplier-performance', protect, async (req, res) => {
  try {
    const supplierPerformance = await Supplier.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $project: {
          name: 1,
          code: 1,
          rating: 1,
          performanceMetrics: 1,
          categories: 1
        }
      },
      {
        $sort: { rating: -1 }
      },
      {
        $limit: 20
      }
    ]);

    // Get order fulfillment rates by supplier
    const fulfillmentRates = await Order.aggregate([
      {
        $match: {
          type: 'purchase',
          supplier: { $exists: true }
        }
      },
      {
        $group: {
          _id: '$supplier',
          totalOrders: { $sum: 1 },
          deliveredOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          },
          avgDeliveryTime: {
            $avg: {
              $cond: [
                { $and: [
                  { $ne: ['$shipping.actualDelivery', null] },
                  { $ne: ['$dates.orderDate', null] }
                ]},
                {
                  $divide: [
                    { $subtract: ['$shipping.actualDelivery', '$dates.orderDate'] },
                    1000 * 60 * 60 * 24 // Convert to days
                  ]
                },
                null
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: '_id',
          foreignField: '_id',
          as: 'supplier'
        }
      },
      { $unwind: '$supplier' },
      {
        $project: {
          name: '$supplier.name',
          code: '$supplier.code',
          totalOrders: 1,
          deliveredOrders: 1,
          cancelledOrders: 1,
          fulfillmentRate: {
            $multiply: [
              { $divide: ['$deliveredOrders', '$totalOrders'] },
              100
            ]
          },
          avgDeliveryTime: 1
        }
      },
      { $sort: { fulfillmentRate: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        performance: supplierPerformance,
        fulfillment: fulfillmentRates
      }
    });
  } catch (error) {
    console.error('Supplier performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching supplier performance',
      error: error.message
    });
  }
});

// @route   GET /api/analytics/financial-summary
// @desc    Get financial summary
// @access  Private
router.get('/financial-summary', protect, async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);

    const financialData = await Order.aggregate([
      {
        $match: {
          'dates.orderDate': {
            $gte: startOfYear,
            $lte: endOfYear
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$dates.orderDate' },
            type: '$type'
          },
          revenue: {
            $sum: {
              $cond: [{ $eq: ['$type', 'sales'] }, '$pricing.total', 0]
            }
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ['$type', 'purchase'] }, '$pricing.total', 0]
            }
          },
          orderCount: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.month',
          revenue: { $sum: '$revenue' },
          expenses: { $sum: '$expenses' },
          orderCount: { $sum: '$orderCount' }
        }
      },
      {
        $project: {
          month: '$_id',
          revenue: 1,
          expenses: 1,
          profit: { $subtract: ['$revenue', '$expenses'] },
          orderCount: 1
        }
      },
      { $sort: { month: 1 } }
    ]);

    // Calculate year totals
    const yearTotals = financialData.reduce(
      (acc, month) => ({
        totalRevenue: acc.totalRevenue + month.revenue,
        totalExpenses: acc.totalExpenses + month.expenses,
        totalProfit: acc.totalProfit + month.profit,
        totalOrders: acc.totalOrders + month.orderCount
      }),
      { totalRevenue: 0, totalExpenses: 0, totalProfit: 0, totalOrders: 0 }
    );

    res.json({
      success: true,
      data: {
        monthly: financialData,
        yearTotals,
        year
      }
    });
  } catch (error) {
    console.error('Financial summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching financial summary',
      error: error.message
    });
  }
});

export default router;
