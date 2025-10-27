import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide supplier code'],
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please provide supplier name'],
    trim: true
  },
  contactPerson: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: true
    },
    position: String
  },
  companyDetails: {
    registrationNumber: String,
    taxId: String,
    website: String,
    establishedDate: Date
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    }
  },
  categories: [{
    type: String,
    enum: ['raw_materials', 'components', 'finished_goods', 'packaging', 'supplies', 'services', 'other']
  }],
  products: [{
    name: String,
    code: String,
    price: Number,
    leadTime: Number // in days
  }],
  paymentTerms: {
    type: String,
    enum: ['net_30', 'net_60', 'net_90', 'cash_on_delivery', 'prepayment', 'custom'],
    default: 'net_30'
  },
  currency: {
    type: String,
    default: 'USD'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  performanceMetrics: {
    onTimeDeliveryRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 100
    },
    qualityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 100
    },
    responseTime: {
      type: Number, // in hours
      default: 24
    }
  },
  certifications: [{
    name: String,
    issuedBy: String,
    validUntil: Date
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'blacklisted'],
    default: 'active'
  },
  contractDetails: {
    startDate: Date,
    endDate: Date,
    renewalDate: Date,
    terms: String
  },
  bankDetails: {
    bankName: String,
    accountNumber: String,
    routingNumber: String,
    swiftCode: String
  },
  notes: String,
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
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

export default mongoose.model('Supplier', supplierSchema);
