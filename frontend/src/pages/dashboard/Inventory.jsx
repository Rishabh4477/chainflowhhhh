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
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchInventory();
  }, [filterCategory, filterStatus]);

  const fetchInventory = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInventory([
        {
          id: 1,
          sku: 'WGT-001',
          name: 'Widget A',
          description: 'High-quality widget for industrial use',
          category: 'components',
          quantity: 150,
          unit: 'units',
          unitCost: 25.50,
          reorderPoint: 50,
          supplier: 'Bharat Tech Supplies Pvt Ltd',
          warehouse: 'Bhiwandi DC - Mumbai',
          status: 'in_stock',
          lastRestocked: '2024-01-15'
        },
        {
          id: 2,
          sku: 'CMP-002',
          name: 'Component B',
          description: 'Essential component for assembly',
          category: 'components',
          quantity: 35,
          unit: 'units',
          unitCost: 45.00,
          reorderPoint: 40,
          supplier: 'Desi Parts Pvt Ltd',
          warehouse: 'Warehouse B - Bengaluru',
          status: 'low_stock',
          lastRestocked: '2024-01-10'
        },
        {
          id: 3,
          sku: 'MAT-003',
          name: 'Raw Material C',
          description: 'Premium grade raw material',
          category: 'raw_materials',
          quantity: 500,
          unit: 'kg',
          unitCost: 12.75,
          reorderPoint: 100,
          supplier: 'Materials Direct India',
          warehouse: 'Okhla Warehouse - New Delhi',
          status: 'in_stock',
          lastRestocked: '2024-01-18'
        },
        {
          id: 4,
          sku: 'PKG-004',
          name: 'Packaging Box D',
          description: 'Standard shipping box',
          category: 'packaging',
          quantity: 0,
          unit: 'units',
          unitCost: 2.50,
          reorderPoint: 200,
          supplier: 'Pack Solutions India',
          warehouse: 'Warehouse C - Hyderabad',
          status: 'out_of_stock',
          lastRestocked: '2024-01-05'
        },
        {
          id: 5,
          sku: 'FIN-005',
          name: 'Finished Product E',
          description: 'Ready for shipment product',
          category: 'finished_goods',
          quantity: 75,
          unit: 'units',
          unitCost: 150.00,
          reorderPoint: 30,
          supplier: 'Manufacturing Plant Pune',
          warehouse: 'Navi Mumbai Distribution Center',
          status: 'in_stock',
          lastRestocked: '2024-01-20'
        }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filter inventory based on search
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'in_stock':
        return <span className="badge badge-success">In Stock</span>;
      case 'low_stock':
        return <span className="badge badge-warning">Low Stock</span>;
      case 'out_of_stock':
        return <span className="badge badge-danger">Out of Stock</span>;
      default:
        return null;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Export inventory to CSV
  const exportToCSV = () => {
    if (!inventory.length) {
      toast.error('No inventory to export');
      return;
    }
    const headers = [
      'sku','name','description','category','quantity','unit','unitCost','reorderPoint','supplier','warehouse','status','lastRestocked'
    ];
    const rows = inventory.map(it => ([
      it.sku,
      it.name,
      it.description,
      it.category,
      it.quantity,
      it.unit,
      it.unitCost,
      it.reorderPoint,
      it.supplier,
      it.warehouse,
      it.status,
      it.lastRestocked
    ]));
    const csv = [headers.join(','), ...rows.map(r => r.map(v => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
    }).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported inventory to CSV');
  };

  // Import inventory from JSON
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
        toast.error('Invalid format: expected an array of items');
        return;
      }
      const normalized = data.map((it, idx) => {
        const quantity = Number(it.quantity ?? 0);
        const reorderPoint = Number(it.reorderPoint ?? 0);
        const status = quantity === 0 ? 'out_of_stock' : (quantity <= reorderPoint ? 'low_stock' : 'in_stock');
        return {
          id: it.id ?? Date.now() + idx,
          sku: it.sku ?? `SKU-${Date.now()+idx}`,
          name: it.name ?? 'New Item',
          description: it.description ?? '',
          category: it.category ?? 'components',
          quantity,
          unit: it.unit ?? 'units',
          unitCost: Number(it.unitCost ?? 0),
          reorderPoint,
          supplier: it.supplier ?? '',
          warehouse: it.warehouse ?? 'Main Warehouse',
          status,
          lastRestocked: it.lastRestocked ?? new Date().toISOString().slice(0,10)
        };
      });
      setInventory(prev => [...prev, ...normalized]);
      toast.success(`Imported ${normalized.length} items`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to import inventory');
    } finally {
      if (e.target) e.target.value = '';
    }
  };

  const AddEditModal = () => {
    const [formData, setFormData] = useState(selectedItem || {
      sku: '',
      name: '',
      description: '',
      category: 'components',
      quantity: 0,
      unit: 'units',
      unitCost: 0,
      reorderPoint: 0,
      supplier: '',
      warehouse: 'Main Warehouse'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedItem) {
        // Update existing item
        setInventory(inventory.map(item => 
          item.id === selectedItem.id ? { ...formData, id: selectedItem.id } : item
        ));
        toast.success('Item updated successfully');
      } else {
        // Add new item
        const newItem = {
          ...formData,
          id: Date.now(),
          status: formData.quantity === 0 ? 'out_of_stock' : 
                  formData.quantity <= formData.reorderPoint ? 'low_stock' : 'in_stock',
          lastRestocked: new Date().toISOString().split('T')[0]
        };
        setInventory([...inventory, newItem]);
        toast.success('Item added successfully');
      }
      setShowAddModal(false);
      setSelectedItem(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">
            {selectedItem ? 'Edit Inventory Item' : 'Add New Item'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="input-field"
                rows="3"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input-field"
                >
                  <option value="raw_materials">Raw Materials</option>
                  <option value="components">Components</option>
                  <option value="finished_goods">Finished Goods</option>
                  <option value="packaging">Packaging</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
                <select
                  value={formData.warehouse}
                  onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
                  className="input-field"
                >
                  <option value="Main Warehouse">Main Warehouse</option>
                  <option value="Warehouse B">Warehouse B</option>
                  <option value="Warehouse C">Warehouse C</option>
                  <option value="Distribution Center">Distribution Center</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Cost ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.unitCost}
                  onChange={(e) => setFormData({...formData, unitCost: parseFloat(e.target.value)})}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.reorderPoint}
                  onChange={(e) => setFormData({...formData, reorderPoint: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedItem(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {selectedItem ? 'Update Item' : 'Add Item'}
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
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Manage and track your inventory items</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold">{inventory.length}</span>
          </div>
          <p className="text-gray-600">Total Items</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold">
              {inventory.filter(item => item.status === 'in_stock').length}
            </span>
          </div>
          <p className="text-gray-600">In Stock</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold">
              {inventory.filter(item => item.status === 'low_stock').length}
            </span>
          </div>
          <p className="text-gray-600">Low Stock</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold">
              {inventory.filter(item => item.status === 'out_of_stock').length}
            </span>
          </div>
          <p className="text-gray-600">Out of Stock</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              <option value="raw_materials">Raw Materials</option>
              <option value="components">Components</option>
              <option value="finished_goods">Finished Goods</option>
              <option value="packaging">Packaging</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
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

      {/* Inventory Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Warehouse</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium">{item.sku}</td>
                  <td>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </td>
                  <td className="capitalize">{item.category.replace('_', ' ')}</td>
                  <td>
                    <span className={item.quantity <= item.reorderPoint ? 'text-red-600 font-semibold' : ''}>
                      {item.quantity} {item.unit}
                    </span>
                    {item.quantity <= item.reorderPoint && (
                      <p className="text-xs text-red-500">Reorder needed</p>
                    )}
                  </td>
                  <td>${item.unitCost.toFixed(2)}</td>
                  <td className="font-semibold">${(item.quantity * item.unitCost).toFixed(2)}</td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td>{item.warehouse}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowAddModal(true);
                        }}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredInventory.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No inventory items found
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && <AddEditModal />}
    </div>
  );
};

export default Inventory;
