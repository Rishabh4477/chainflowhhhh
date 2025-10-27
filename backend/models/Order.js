import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  type: {
    type: String,
    enum: ['purchase', 'sales', 'transfer'],
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: function() {
      return this.type === 'purchase';
    }
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    company: String
  },
  items: [{
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
      required: true
    },
    sku: String,
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    }
  }],
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    shipping: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'refunded', 'overdue'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['credit_card', 'bank_transfer', 'cash', 'check', 'other']
    },
    terms: String,
    dueDate: Date,
    paidDate: Date,
    transactionId: String
  },
  shipping: {
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    carrier: String,
    trackingNumber: String,
    method: {
      type: String,
      enum: ['standard', 'express', 'overnight', 'freight', 'pickup']
    },
    estimatedDelivery: Date,
    actualDelivery: Date,
    shippedDate: Date
  },
  dates: {
    orderDate: {
      type: Date,
      default: Date.now,
      required: true
    },
    requiredDate: Date,
    promisedDate: Date,
    completedDate: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  documents: [{
    type: {
      type: String,
      enum: ['invoice', 'purchase_order', 'receipt', 'packing_list', 'other']
    },
    url: String,
    uploadedAt: Date
  }],
  notes: String,
  internalNotes: String,
  tags: [String],
  approvals: [{
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date,
    role: String,
    comments: String
  }],
  history: [{
    action: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
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

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const prefix = this.type === 'purchase' ? 'PO' : this.type === 'sales' ? 'SO' : 'TO';
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `${prefix}-${String(count + 1).padStart(6, '0')}`;
  }
  
  // Calculate totals
  if (this.items && this.items.length > 0) {
    this.pricing.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    this.pricing.total = this.pricing.subtotal + this.pricing.tax + this.pricing.shipping - this.pricing.discount;
  }
  
  // Add to history
  if (this.isNew) {
    this.history.push({
      action: 'created',
      description: 'Order created',
      user: this.createdBy
    });
  }
  
  next();
});

export default mongoose.model('Order', orderSchema);
