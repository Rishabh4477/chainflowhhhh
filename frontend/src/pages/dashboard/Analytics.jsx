import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  PieChart,
  Download,
  Calendar
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
import toast from 'react-hot-toast';

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

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30days');
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = () => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics({
        revenue: {
          current: 245680,
          previous: 198450,
          change: 23.8
        },
        orders: {
          current: 1247,
          previous: 1089,
          change: 14.5
        },
        inventory: {
          current: 8934,
          previous: 9245,
          change: -3.4
        },
        suppliers: {
          current: 47,
          previous: 43,
          change: 9.3
        }
      });
      setLoading(false);
    }, 500);
  };

  const exportReport = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const report = [
      ['Analytics Report', timestamp],
      [],
      ['Key Metrics'],
      ['Metric', 'Current', 'Previous', 'Change (%)'],
      ['Total Revenue', analytics.revenue.current, analytics.revenue.previous, analytics.revenue.change],
      ['Total Orders', analytics.orders.current, analytics.orders.previous, analytics.orders.change],
      ['Inventory Items', analytics.inventory.current, analytics.inventory.previous, analytics.inventory.change],
      ['Active Suppliers', analytics.suppliers.current, analytics.suppliers.previous, analytics.suppliers.change],
      [],
      ['Top Performing Items'],
      ['Item Name', 'Category', 'Units Sold', 'Revenue', 'Growth (%)'],
      ['Finished Product E', 'Finished Goods', 1245, 186750, 24.5],
      ['Component B', 'Components', 987, 44415, 18.2],
      ['Widget A', 'Components', 856, 21828, 15.8],
      ['Raw Material C', 'Raw Materials', 2340, 29835, 12.4],
      ['Packaging Box D', 'Packaging', 4567, 11417, -5.3]
    ];
    const csv = report.map(row => row.map(v => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${timestamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Analytics report exported successfully');
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [65000, 59000, 80000, 81000, 96000, 105000, 140000, 135000, 160000, 180000, 195000, 245680],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const ordersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Orders',
        data: [85, 92, 105, 98, 115, 128, 142, 138, 155, 165, 178, 195],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 8
      }
    ]
  };

  const categoryData = {
    labels: ['Raw Materials', 'Components', 'Finished Goods', 'Packaging', 'Others'],
    datasets: [
      {
        data: [35, 28, 22, 10, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(156, 163, 175, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  const supplierPerformanceData = {
    labels: ['Tech Supplies', 'Global Parts', 'Materials Direct', 'Pack Solutions', 'Quality Logistics'],
    datasets: [
      {
        label: 'Orders Fulfilled',
        data: [145, 203, 98, 67, 178],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 8
      },
      {
        label: 'Orders Pending',
        data: [12, 8, 5, 0, 15],
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true
        }
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

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your supply chain</p>
        </div>
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button onClick={exportReport} className="btn-primary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              analytics.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.revenue.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(analytics.revenue.change)}%
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${analytics.revenue.current.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">vs ${analytics.revenue.previous.toLocaleString()} last period</p>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              analytics.orders.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.orders.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(analytics.orders.change)}%
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{analytics.orders.current.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">vs {analytics.orders.previous.toLocaleString()} last period</p>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              analytics.inventory.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.inventory.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(analytics.inventory.change)}%
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Inventory Items</p>
          <p className="text-2xl font-bold text-gray-900">{analytics.inventory.current.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">vs {analytics.inventory.previous.toLocaleString()} last period</p>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              analytics.suppliers.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.suppliers.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(analytics.suppliers.change)}%
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Active Suppliers</p>
          <p className="text-2xl font-bold text-gray-900">{analytics.suppliers.current}</p>
          <p className="text-xs text-gray-500 mt-2">vs {analytics.suppliers.previous} last period</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div style={{ height: '300px' }}>
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Orders</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div style={{ height: '300px' }}>
            <Bar data={ordersData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Inventory by Category</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div style={{ height: '300px' }} className="flex items-center justify-center">
            <Doughnut data={categoryData} options={doughnutOptions} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Supplier Performance</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div style={{ height: '300px' }}>
            <Bar data={supplierPerformanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Items</h3>
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">Finished Product E</td>
                <td>Finished Goods</td>
                <td>1,245</td>
                <td className="font-semibold">$186,750</td>
                <td>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    24.5%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-medium">Component B</td>
                <td>Components</td>
                <td>987</td>
                <td className="font-semibold">$44,415</td>
                <td>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    18.2%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-medium">Widget A</td>
                <td>Components</td>
                <td>856</td>
                <td className="font-semibold">$21,828</td>
                <td>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    15.8%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-medium">Raw Material C</td>
                <td>Raw Materials</td>
                <td>2,340</td>
                <td className="font-semibold">$29,835</td>
                <td>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    12.4%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-medium">Packaging Box D</td>
                <td>Packaging</td>
                <td>4,567</td>
                <td className="font-semibold">$11,417</td>
                <td>
                  <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <TrendingDown className="w-4 h-4" />
                    5.3%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
