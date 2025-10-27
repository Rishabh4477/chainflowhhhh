import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  Truck, 
  BarChart3, 
  Shield, 
  Globe,
  CheckCircle,
  ArrowRight,
  Database,
  Bell,
  Smartphone,
  Cloud,
  Zap,
  Settings,
  FileText,
  TrendingUp
} from 'lucide-react';

const Features = () => {
  const featureCategories = [
    {
      title: 'Inventory Management',
      icon: Package,
      color: 'primary',
      features: [
        'Real-time inventory tracking across multiple locations',
        'Automatic reorder point calculations',
        'Batch and serial number tracking',
        'Expiry date management',
        'Multi-warehouse support',
        'Barcode and QR code scanning',
        'Stock transfer management',
        'Inventory valuation reports'
      ],
      details: {
        description: 'Take complete control of your inventory with our comprehensive management system.',
        benefits: ['Reduce stockouts by 45%', 'Decrease carrying costs by 30%', 'Improve accuracy to 99.9%']
      }
    },
    {
      title: 'Supplier Management',
      icon: Users,
      color: 'blue',
      features: [
        'Centralized supplier database',
        'Performance tracking and ratings',
        'Automated purchase order generation',
        'Contract management',
        'Supplier portal access',
        'Document management',
        'Communication hub',
        'Vendor scorecards'
      ],
      details: {
        description: 'Build stronger relationships with suppliers through better collaboration and transparency.',
        benefits: ['Reduce procurement costs by 20%', 'Improve supplier performance by 35%', 'Faster order processing']
      }
    },
    {
      title: 'Order Management',
      icon: FileText,
      color: 'green',
      features: [
        'Multi-channel order processing',
        'Order status tracking',
        'Automated order routing',
        'Priority management',
        'Returns and refunds handling',
        'Order approval workflows',
        'Bulk order processing',
        'Custom order statuses'
      ],
      details: {
        description: 'Streamline your entire order lifecycle from placement to delivery.',
        benefits: ['Process orders 50% faster', 'Reduce errors by 80%', '99% order accuracy']
      }
    },
    {
      title: 'Logistics & Shipping',
      icon: Truck,
      color: 'purple',
      features: [
        'Multi-carrier integration',
        'Real-time shipment tracking',
        'Route optimization',
        'Freight cost calculation',
        'Delivery scheduling',
        'Proof of delivery capture',
        'Shipping label generation',
        'International shipping support'
      ],
      details: {
        description: 'Optimize your shipping operations and deliver exceptional customer experiences.',
        benefits: ['Reduce shipping costs by 25%', 'Improve delivery times by 40%', 'Real-time visibility']
      }
    },
    {
      title: 'Analytics & Reporting',
      icon: BarChart3,
      color: 'orange',
      features: [
        'Customizable dashboards',
        'Real-time KPI monitoring',
        'Predictive analytics',
        'Demand forecasting',
        'Financial reports',
        'Performance metrics',
        'Data visualization tools',
        'Scheduled report generation'
      ],
      details: {
        description: 'Make data-driven decisions with powerful analytics and insights.',
        benefits: ['Improve forecasting accuracy by 40%', 'Identify trends instantly', 'ROI tracking']
      }
    },
    {
      title: 'Integration & Security',
      icon: Shield,
      color: 'red',
      features: [
        'REST API access',
        'ERP system integration',
        'Accounting software sync',
        'Bank-level encryption',
        'Role-based access control',
        'Audit trails',
        'Two-factor authentication',
        'GDPR compliance'
      ],
      details: {
        description: 'Secure, scalable, and seamlessly integrated with your existing systems.',
        benefits: ['99.9% uptime SLA', 'SOC 2 certified', 'Seamless integrations']
      }
    }
  ];

  const additionalFeatures = [
    { icon: Bell, title: 'Smart Notifications', description: 'Get alerts for critical events and thresholds' },
    { icon: Smartphone, title: 'Mobile App', description: 'Manage your supply chain on the go' },
    { icon: Cloud, title: 'Cloud-Based', description: 'Access from anywhere, no installation required' },
    { icon: Zap, title: 'Automation', description: 'Automate repetitive tasks and workflows' },
    { icon: Database, title: 'Data Backup', description: 'Automatic backups with instant recovery' },
    { icon: Settings, title: 'Customization', description: 'Tailor the platform to your specific needs' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Modern Supply Chains
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to manage, optimize, and scale your supply chain operations 
            in one comprehensive platform.
          </p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {featureCategories.map((category, index) => {
              const Icon = category.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-6">{category.details.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {category.details.benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-gray-100 px-4 py-2 rounded-full">
                          <span className="text-sm font-medium text-gray-800">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="bg-gray-100 rounded-lg p-8 h-96 flex items-center justify-center">
                      <Icon className="w-32 h-32 text-gray-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              And So Much More
            </h2>
            <p className="text-xl text-gray-600">
              Additional features to enhance your supply chain operations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Connect with your favorite tools and platforms
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['SAP', 'Oracle', 'QuickBooks', 'Shopify', 'Amazon', 'FedEx', 'UPS', 'DHL', 'Stripe', 'PayPal', 'Slack', 'Teams'].map((partner, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-20">
                <span className="text-gray-600 font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Experience the Power of ChainFlow
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            See how our features can transform your supply chain operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start 14-Day Free Trial
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors duration-200"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
