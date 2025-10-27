import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Download,
  Upload, 
  Edit2, 
  Trash2, 
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Package
} from 'lucide-react';
import toast from 'react-hot-toast';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSuppliers();
  }, [filterStatus]);

  const fetchSuppliers = () => {
    setLoading(true);
    setTimeout(() => {
      setSuppliers([
        {
          id: 1,
          name: 'Bharat Tech Supplies Pvt Ltd',
          contactPerson: 'Rajesh Kumar',
          email: 'rajesh@bharattech.in',
          phone: '+91 98765 43210',
          address: '101 Business Park, Andheri East, Mumbai, MH 400093',
          category: 'Electronics',
          rating: 4.5,
          totalOrders: 145,
          activeOrders: 12,
          totalSpent: 125000,
          paymentTerms: 'Net 30',
          status: 'active',
          joinedDate: '2023-01-15'
        },
        {
          id: 2,
          name: 'Desi Parts Pvt Ltd',
          contactPerson: 'Anita Sharma',
          email: 'anita@desiparts.in',
          phone: '+91 99888 77665',
          address: '22/3 Industrial Area, Peenya, Bengaluru, KA 560058',
          category: 'Components',
          rating: 4.8,
          totalOrders: 203,
          activeOrders: 8,
          totalSpent: 189500,
          paymentTerms: 'Net 45',
          status: 'active',
          joinedDate: '2022-11-20'
        },
        {
          id: 3,
          name: 'Materials Direct India',
          contactPerson: 'Rohit Iyer',
          email: 'rohit@materialsdirect.in',
          phone: '+91 90909 80807',
          address: '55 Supply Road, Okhla Industrial Estate, New Delhi, DL 110020',
          category: 'Raw Materials',
          rating: 4.2,
          totalOrders: 98,
          activeOrders: 5,
          totalSpent: 87200,
          paymentTerms: 'Net 30',
          status: 'active',
          joinedDate: '2023-03-10'
        },
        {
          id: 4,
          name: 'Pack Solutions India',
          contactPerson: 'Neha Gupta',
          email: 'neha@packsolutions.in',
          phone: '+91 91234 56780',
          address: 'Plot 12, Hitech City, Hyderabad, TS 500081',
          category: 'Packaging',
          rating: 3.9,
          totalOrders: 67,
          activeOrders: 0,
          totalSpent: 45800,
          paymentTerms: 'Net 60',
          status: 'inactive',
          joinedDate: '2023-05-22'
        }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      toast.success('Supplier deleted successfully');
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <span className="badge badge-success">Active</span>
      : <span className="badge badge-secondary">Inactive</span>;
  };

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Export suppliers to CSV
  const exportToCSV = () => {
    if (!suppliers.length) {
      toast.error('No suppliers to export');
      return;
    }
    const headers = [
      'name','contactPerson','email','phone','address','category','rating','totalOrders','activeOrders','totalSpent','paymentTerms','status','joinedDate'
    ];
    const rows = suppliers.map(s => ([
      s.name,
      s.contactPerson,
      s.email,
      s.phone,
      s.address,
      s.category,
      s.rating,
      s.totalOrders,
      s.activeOrders,
      s.totalSpent,
      s.paymentTerms,
      s.status,
      s.joinedDate
    ]));
    const csv = [headers.join(','), ...rows.map(r => r.map(v => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
    }).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suppliers_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported suppliers to CSV');
  };

  // Import suppliers from JSON
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
        toast.error('Invalid format: expected an array of suppliers');
        return;
      }
      const normalized = data.map((s, idx) => ({
        id: s.id ?? Date.now() + idx,
        name: s.name ?? 'New Supplier',
        contactPerson: s.contactPerson ?? 'Contact',
        email: s.email ?? '',
        phone: s.phone ?? '',
        address: s.address ?? '',
        category: s.category ?? 'Electronics',
        rating: Number(s.rating ?? 0),
        totalOrders: Number(s.totalOrders ?? 0),
        activeOrders: Number(s.activeOrders ?? 0),
        totalSpent: Number(s.totalSpent ?? 0),
        paymentTerms: s.paymentTerms ?? 'Net 30',
        status: s.status ?? 'active',
        joinedDate: s.joinedDate ?? new Date().toISOString().slice(0,10)
      }));
      setSuppliers(prev => [...prev, ...normalized]);
      toast.success(`Imported ${normalized.length} suppliers`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to import suppliers');
    } finally {
      if (e.target) e.target.value = '';
    }
  };

  const AddEditModal = () => {
    const [formData, setFormData] = useState(selectedSupplier || {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      category: 'Electronics',
      paymentTerms: 'Net 30',
      status: 'active'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedSupplier) {
        setSuppliers(suppliers.map(supplier => 
          supplier.id === selectedSupplier.id ? { ...formData, id: selectedSupplier.id } : supplier
        ));
        toast.success('Supplier updated successfully');
      } else {
        const newSupplier = {
          ...formData,
          id: Date.now(),
          rating: 0,
          totalOrders: 0,
          activeOrders: 0,
          totalSpent: 0,
          joinedDate: new Date().toISOString().split('T')[0]
        };
        setSuppliers([...suppliers, newSupplier]);
        toast.success('Supplier added successfully');
      }
      setShowAddModal(false);
      setSelectedSupplier(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">
            {selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="input-field"
                rows="2"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input-field"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Components">Components</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Logistics">Logistics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                  className="input-field"
                >
                  <option value="Net 30">Net 30</option>
                  <option value="Net 45">Net 45</option>
                  <option value="Net 60">Net 60</option>
                  <option value="COD">COD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="input-field"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedSupplier(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {selectedSupplier ? 'Update Supplier' : 'Add Supplier'}
              </button>
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
          <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-gray-600 mt-2">Manage your supplier relationships</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold">{suppliers.length}</span>
          </div>
          <p className="text-gray-600">Total Suppliers</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold">
              {suppliers.filter(s => s.status === 'active').length}
            </span>
          </div>
          <p className="text-gray-600">Active Suppliers</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold">
              {suppliers.reduce((acc, s) => acc + s.totalOrders, 0)}
            </span>
          </div>
          <p className="text-gray-600">Total Orders</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-primary-600">$</span>
            <span className="text-2xl font-bold">
              {(suppliers.reduce((acc, s) => acc + s.totalSpent, 0) / 1000).toFixed(0)}K
            </span>
          </div>
          <p className="text-gray-600">Total Spent</p>
        </div>
      </div>

      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
                <p className="text-gray-600 text-sm">{supplier.category}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(supplier.status)}
                <button
                  onClick={() => {
                    setSelectedSupplier(supplier);
                    setShowAddModal(true);
                  }}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(supplier.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${supplier.email}`} className="hover:text-primary-600">
                  {supplier.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{supplier.address}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Total Orders</p>
                  <p className="text-lg font-semibold">{supplier.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Orders</p>
                  <p className="text-lg font-semibold text-primary-600">{supplier.activeOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Spent</p>
                  <p className="text-lg font-semibold">${(supplier.totalSpent / 1000).toFixed(0)}K</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  {getRatingStars(supplier.rating)}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Payment Terms</p>
                  <p className="text-sm font-medium">{supplier.paymentTerms}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="card text-center py-12 text-gray-500">
          No suppliers found
        </div>
      )}

      {showAddModal && <AddEditModal />}
    </div>
  );
};

export default Suppliers;
