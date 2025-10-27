import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Truck,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulate fetching dashboard data
    setTimeout(() => {
      setDashboardData({
        stats: {
          totalInventory: { value: 15234, change: 12.5, trend: 'up' },
          activeSuppliers: { value: 48, change: 5.2, trend: 'up' },
          pendingOrders: { value: 124, change: -8.3, trend: 'down' },
          monthlyRevenue: { value: 385420, change: 18.7, trend: 'up' }
        },
        alerts: [
          { id: 1, type: 'warning', message: '12 items running low on stock', time: '2 hours ago' },
          { id: 2, type: 'info', message: 'New supplier application received', time: '4 hours ago' },
          { id: 3, type: 'success', message: 'Order #ORD-2024-1234 delivered', time: '6 hours ago' }
        ],
        recentOrders: [
          { id: 'ORD-2024-1234', customer: 'Tech Solutions India Pvt Ltd', amount: 12500, status: 'delivered', date: '2024-01-20' },
          { id: 'ORD-2024-1235', customer: 'Bharat Retail Ltd', amount: 8750, status: 'shipped', date: '2024-01-21' },
          { id: 'ORD-2024-1236', customer: 'Manufacturing India Ltd', amount: 15200, status: 'processing', date: '2024-01-21' },
          { id: 'ORD-2024-1237', customer: 'Supply Chain Pro India', amount: 6800, status: 'pending', date: '2024-01-22' },
          { id: 'ORD-2024-1238', customer: 'Logistics Express India', amount: 9400, status: 'processing', date: '2024-01-22' }
        ],
        lowStockItems: [
          { id: 1, name: 'Widget A', sku: 'WGT-001', current: 15, reorder: 50 },
          { id: 2, name: 'Component B', sku: 'CMP-002', current: 8, reorder: 30 },
          { id: 3, name: 'Part C', sku: 'PRT-003', current: 22, reorder: 40 },
          { id: 4, name: 'Material D', sku: 'MAT-004', current: 5, reorder: 25 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  // Chart configurations
  const revenueChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [42000, 48000, 45000, 52000, 58000, 61000, 55000],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const orderStatusChartData = {
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    datasets: [
      {
        data: [24, 45, 38, 52],
        backgroundColor: [
          'rgb(251, 191, 36)',
          'rgb(59, 130, 246)',
          'rgb(147, 51, 234)',
          'rgb(34, 197, 94)'
        ]
      }
    ]
  };

  const inventoryCategoryData = {
    labels: ['Raw Materials', 'Components', 'Finished Goods', 'Packaging'],
    datasets: [
      {
        label: 'Quantity',
        data: [3200, 2800, 4500, 1734],
        backgroundColor: 'rgba(37, 99, 235, 0.8)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="spinner"></div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, change, trend, color }) => (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">
        {typeof value === 'number' && title.includes('Revenue') 
          ? `$${value.toLocaleString()}` 
          : value.toLocaleString()}
      </p>
    </div>
  );

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your supply chain operations.</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {['24hours', '7days', '30days', '90days'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                timeRange === range
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range === '24hours' && 'Last 24 Hours'}
              {range === '7days' && 'Last 7 Days'}
              {range === '30days' && 'Last 30 Days'}
              {range === '90days' && 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Package}
          title="Total Inventory Items"
          value={dashboardData.stats.totalInventory.value}
          change={dashboardData.stats.totalInventory.change}
          trend={dashboardData.stats.totalInventory.trend}
          color="primary"
        />
        <StatCard
          icon={Users}
          title="Active Suppliers"
          value={dashboardData.stats.activeSuppliers.value}
          change={dashboardData.stats.activeSuppliers.change}
          trend={dashboardData.stats.activeSuppliers.trend}
          color="green"
        />
        <StatCard
          icon={ShoppingCart}
          title="Pending Orders"
          value={dashboardData.stats.pendingOrders.value}
          change={dashboardData.stats.pendingOrders.change}
          trend={dashboardData.stats.pendingOrders.trend}
          color="yellow"
        />
        <StatCard
          icon={DollarSign}
          title="Monthly Revenue"
          value={dashboardData.stats.monthlyRevenue.value}
          change={dashboardData.stats.monthlyRevenue.change}
          trend={dashboardData.stats.monthlyRevenue.trend}
          color="purple"
        />
      </div>

      {/* Alerts Section */}
      {dashboardData.alerts.length > 0 && (
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <Link to="/dashboard/alerts" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {dashboardData.alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  alert.type === 'warning' ? 'text-yellow-600' :
                  alert.type === 'info' ? 'text-blue-600' :
                  'text-green-600'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="h-64">
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
          <div className="h-64">
            <Doughnut data={orderStatusChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Inventory by Category */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory by Category</h2>
          <div className="h-64">
            <Bar data={inventoryCategoryData} options={chartOptions} />
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Items</h2>
            <Link to="/dashboard/inventory" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {dashboardData.lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-semibold">{item.current} units</p>
                  <p className="text-xs text-gray-500">Reorder: {item.reorder}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link 
            to="/dashboard/orders" 
            className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
          >
            View All Orders
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${
                      order.status === 'delivered' ? 'badge-success' :
                      order.status === 'shipped' ? 'badge-info' :
                      order.status === 'processing' ? 'badge-warning' :
                      'badge-danger'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <Link 
                      to={`/dashboard/orders/${order.id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
