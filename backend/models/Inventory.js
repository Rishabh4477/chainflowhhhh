import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  sku: {
    type: String,
    required: [true, 'Please provide SKU'],
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['raw_materials', 'components', 'finished_goods', 'packaging', 'supplies', 'other']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: 0,
    default: 0
  },
  unit: {
    type: String,
    required: true,
    default: 'units'
  },
  reorderPoint: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  },
  reorderQuantity: {
    type: Number,
    min: 0,
    default: 50
  },
  unitCost: {
    type: Number,
    required: [true, 'Please provide unit cost'],
    min: 0
  },
  totalValue: {
    type: Number,
    default: 0
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  warehouse: {
    location: {
      type: String,
      default: 'Main Warehouse'
    },
    zone: String,
    bin: String
  },
  status: {
    type: String,
    enum: ['in_stock', 'low_stock', 'out_of_stock', 'discontinued'],
    default: 'in_stock'
  },
  lastRestocked: {
    type: Date,
    default: Date.now
  },
  expiryDate: Date,
  batchNumber: String,
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Calculate total value before saving
inventorySchema.pre('save', function(next) {
  this.totalValue = this.quantity * this.unitCost;
  
  // Update status based on quantity
  if (this.quantity === 0) {
    this.status = 'out_of_stock';
  } else if (this.quantity <= this.reorderPoint) {
    this.status = 'low_stock';
  } else {
    this.status = 'in_stock';
  }
  
  next();
});

export default mongoose.model('Inventory', inventorySchema);
