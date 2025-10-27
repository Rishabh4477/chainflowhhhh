import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Download,
  Upload,
  Edit2, 
  Trash2, 
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders([
        {
          id: 1,
          orderNumber: 'ORD-2024-001',
          supplier: 'Bharat Tech Supplies Pvt Ltd',
          items: [
            { name: 'Widget A', quantity: 50, unitPrice: 25.50 },
            { name: 'Component B', quantity: 30, unitPrice: 45.00 }
          ],
          totalAmount: 2625.00,
          orderDate: '2024-01-15',
          expectedDelivery: '2024-01-25',
          status: 'pending',
          priority: 'high',
          shippingAddress: '101 Business Park, Andheri East, Mumbai, MH 400093',
          notes: 'Urgent delivery required'
        },
        {
          id: 2,
          orderNumber: 'ORD-2024-002',
          supplier: 'Desi Parts Pvt Ltd',
          items: [
            { name: 'Raw Material C', quantity: 200, unitPrice: 12.75 }
          ],
          totalAmount: 2550.00,
          orderDate: '2024-01-18',
          expectedDelivery: '2024-01-28',
          status: 'shipped',
          priority: 'medium',
          shippingAddress: '22/3 Industrial Area, Peenya, Bengaluru, KA 560058',
          trackingNumber: 'TRK123456789',
          notes: 'Standard shipping'
        },
        {
          id: 3,
          orderNumber: 'ORD-2024-003',
          supplier: 'Materials Direct India',
          items: [
            { name: 'Finished Product E', quantity: 100, unitPrice: 150.00 }
          ],
          totalAmount: 15000.00,
          orderDate: '2024-01-20',
          expectedDelivery: '2024-02-05',
          status: 'delivered',
          priority: 'low',
          shippingAddress: '55 Supply Road, Okhla Industrial Estate, New Delhi, DL 110020',
          deliveryDate: '2024-02-04',
          notes: 'Delivered ahead of schedule'
        },
        {
          id: 4,
          orderNumber: 'ORD-2024-004',
          supplier: 'Pack Solutions India',
          items: [
            { name: 'Packaging Box D', quantity: 500, unitPrice: 2.50 }
          ],
          totalAmount: 1250.00,
          orderDate: '2024-01-22',
          expectedDelivery: '2024-02-01',
          status: 'cancelled',
          priority: 'low',
          shippingAddress: 'Plot 12, Hitech City, Hyderabad, TS 500081',
          notes: 'Cancelled due to supplier issues'
        },
        {
          id: 5,
          orderNumber: 'ORD-2024-005',
          supplier: 'Quality Logistics India Pvt Ltd',
          items: [
            { name: 'Component B', quantity: 75, unitPrice: 45.00 },
            { name: 'Widget A', quantity: 25, unitPrice: 25.50 }
          ],
          totalAmount: 4012.50,
          orderDate: '2024-01-23',
          expectedDelivery: '2024-02-08',
          status: 'pending',
          priority: 'medium',
          shippingAddress: 'Plot 45, Sector 62, Noida, UP 201309',
          notes: 'Regular order'
        }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
      toast.success('Order deleted successfully');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: <span className="badge badge-warning">Pending</span>,
      shipped: <span className="badge badge-info">Shipped</span>,
      delivered: <span className="badge badge-success">Delivered</span>,
      cancelled: <span className="badge badge-danger">Cancelled</span>
    };
    return badges[status] || null;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">High</span>,
      medium: <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>,
      low: <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Low</span>
    };
    return badges[priority] || null;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Export orders to CSV (flattening items as JSON string)
  const exportToCSV = () => {
    if (!orders.length) {
      toast.error('No orders to export');
      return;
    }
    const headers = [
      'orderNumber','supplier','orderDate','expectedDelivery','status','priority','totalAmount','shippingAddress','trackingNumber','notes','items'
    ];
    const rows = orders.map(o => ([
      o.orderNumber,
      o.supplier,
      o.orderDate,
      o.expectedDelivery,
      o.status,
      o.priority,
      o.totalAmount,
      o.shippingAddress || '',
      o.trackingNumber || '',
      o.notes || '',
      JSON.stringify(o.items || [])
    ]));
    const csv = [headers.join(','), ...rows.map(r => r.map(v => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
    }).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported orders to CSV');
  };

  // Import orders from JSON file
  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    try {
      if (!file) return;
      if (!file.name.toLowerCase().endsWith('.json')) {
        toast.error('Please upload a JSON file');
        return;
      }
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        toast.error('Invalid format: expected an array of orders');
        return;
      }
      // Normalize minimal fields
      const normalized = data.map((o, idx) => ({
        id: o.id ?? Date.now() + idx,
        orderNumber: o.orderNumber ?? `ORD-${new Date().getFullYear()}-${String(orders.length + idx + 1).padStart(3,'0')}`,
        supplier: o.supplier ?? 'Unknown Supplier',
        items: Array.isArray(o.items) ? o.items : [],
        totalAmount: o.totalAmount ?? (Array.isArray(o.items) ? o.items.reduce((s,it)=>(s + (Number(it.quantity)||0)*(Number(it.unitPrice)||0)),0) : 0),
        orderDate: o.orderDate ?? new Date().toISOString().slice(0,10),
        expectedDelivery: o.expectedDelivery ?? new Date().toISOString().slice(0,10),
        status: o.status ?? 'pending',
        priority: o.priority ?? 'medium',
        shippingAddress: o.shippingAddress ?? '',
        trackingNumber: o.trackingNumber ?? '',
        notes: o.notes ?? ''
      }));
      setOrders(prev => [...prev, ...normalized]);
      toast.success(`Imported ${normalized.length} orders`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to import orders');
    } finally {
      // reset input to allow re-uploading same file
      if (e.target) e.target.value = '';
    }
  };

  const OrderDetailsModal = ({ order }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{order.orderNumber}</h2>
              <p className="text-gray-600">{order.supplier}</p>
            </div>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <div className="mt-1">{getStatusBadge(order.status)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Priority</p>
              <div className="mt-1">{getPriorityBadge(order.priority)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expected Delivery</p>
              <p className="font-medium">{new Date(order.expectedDelivery).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unit Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 font-medium">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-right font-semibold">Total Amount:</td>
                    <td className="px-4 py-3 font-bold text-primary-600">${order.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-gray-700">{order.shippingAddress}</p>
          </div>

          {order.trackingNumber && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Tracking Number</h3>
              <p className="text-gray-700 font-mono">{order.trackingNumber}</p>
            </div>
          )}

          {order.notes && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-gray-700">{order.notes}</p>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="btn-secondary"
            >
              Close
            </button>
            <button className="btn-primary">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddEditModal = () => {
    const isEdit = !!selectedOrder;
    const [formData, setFormData] = useState({
      orderNumber: selectedOrder?.orderNumber || `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      supplier: selectedOrder?.supplier || '',
      orderDate: selectedOrder?.orderDate || new Date().toISOString().slice(0, 10),
      expectedDelivery: selectedOrder?.expectedDelivery || new Date().toISOString().slice(0, 10),
      status: selectedOrder?.status || 'pending',
      priority: selectedOrder?.priority || 'medium',
      shippingAddress: selectedOrder?.shippingAddress || '',
      trackingNumber: selectedOrder?.trackingNumber || '',
      notes: selectedOrder?.notes || '',
      items: selectedOrder?.items?.map(it => ({ ...it })) || [{ name: '', quantity: 1, unitPrice: 0 }]
    });

    const totalAmount = formData.items.reduce((sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0);

    const handleItemChange = (idx, key, value) => {
      setFormData(prev => {
        const items = prev.items.map((it, i) => i === idx ? { ...it, [key]: value } : it);
        return { ...prev, items };
      });
    };

    const addItemRow = () => {
      setFormData(prev => ({ ...prev, items: [...prev.items, { name: '', quantity: 1, unitPrice: 0 }] }));
    };

    const removeItemRow = (idx) => {
      setFormData(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
    };

    const closeModal = () => {
      setShowAddModal(false);
      setSelectedOrder(null);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.orderNumber || !formData.supplier || formData.items.length === 0) {
        toast.error('Please fill required fields and add at least one item');
        return;
      }
      const payload = {
        ...formData,
        totalAmount: Number(totalAmount.toFixed(2))
      };

      if (isEdit) {
        setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...payload, id: selectedOrder.id } : o));
        toast.success('Order updated successfully');
      } else {
        const newId = Date.now();
        setOrders(prev => [{ ...payload, id: newId }, ...prev]);
        toast.success('Order created successfully');
      }
      closeModal();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{isEdit ? 'Edit Order' : 'Create New Order'}</h2>
              <p className="text-gray-600">{isEdit ? selectedOrder?.orderNumber : 'Fill details to create a new order'}</p>
            </div>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                <input
                  type="text"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                <input
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
                <input
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-field"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="input-field"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
              <div className="space-y-3">
                {formData.items.map((it, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={it.name}
                      onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                      className="input-field col-span-6"
                      required
                    />
                    <input
                      type="number"
                      min="1"
                      value={it.quantity}
                      onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                      className="input-field col-span-2"
                      required
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={it.unitPrice}
                      onChange={(e) => handleItemChange(idx, 'unitPrice', Number(e.target.value))}
                      className="input-field col-span-3"
                      required
                    />
                    <button type="button" onClick={() => removeItemRow(idx)} className="text-red-600 hover:text-red-700 col-span-1">
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                ))}
                <div>
                  <button type="button" onClick={addItemRow} className="btn-outline">
                    Add Item
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <textarea
                  rows={3}
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                <input
                  type="text"
                  value={formData.trackingNumber}
                  onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                  className="input-field"
                />
                <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Total Amount</div>
              <div className="text-xl font-semibold">${totalAmount.toFixed(2)}</div>
            </div>

            <div className="flex justify-end gap-4">
              <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary">{isEdit ? 'Update Order' : 'Create Order'}</button>
            </div>
          </form>
        </div>
      </div>
    );
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Order
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold">{orders.length}</span>
          </div>
          <p className="text-gray-600">Total Orders</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold">
              {orders.filter(o => o.status === 'pending').length}
            </span>
          </div>
          <p className="text-gray-600">Pending</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold">
              {orders.filter(o => o.status === 'shipped').length}
            </span>
          </div>
          <p className="text-gray-600">Shipped</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold">
              {orders.filter(o => o.status === 'delivered').length}
            </span>
          </div>
          <p className="text-gray-600">Delivered</p>
        </div>
      </div>

      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button onClick={handleImportClick} className="btn-outline flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button onClick={exportToCSV} className="btn-outline flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Supplier</th>
                <th>Order Date</th>
                <th>Expected Delivery</th>
                <th>Total Amount</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.orderNumber}</td>
                  <td>{order.supplier}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{new Date(order.expectedDelivery).toLocaleDateString()}</td>
                  <td className="font-semibold">${order.totalAmount.toFixed(2)}</td>
                  <td>{getPriorityBadge(order.priority)}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetailsModal(true);
                        }}
                        className="text-primary-600 hover:text-primary-700"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowAddModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>

      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} />
      )}
      {showAddModal && (
        <AddEditModal />
      )}
    </div>
  );
};

export default Orders;
