import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Package, 
  Users, 
  BarChart3, 
  Truck, 
  Shield, 
  Globe,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Real-time tracking and optimization of your entire inventory across multiple locations.'
    },
    {
      icon: Users,
      title: 'Supplier Portal',
      description: 'Streamline communication and collaboration with your suppliers in one unified platform.'
    },
    {
      icon: Truck,
      title: 'Logistics Integration',
      description: 'Seamlessly integrate with major shipping carriers for end-to-end visibility.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Data-driven insights to optimize your supply chain performance and reduce costs.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security measures to protect your sensitive data.'
    },
    {
      icon: Globe,
      title: 'Global Scalability',
      description: 'Built to scale with your business from local operations to global enterprise.'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '500+', label: 'Active Companies' },
    { value: '50M+', label: 'Orders Processed' },
    { value: '24/7', label: 'Support Available' }
  ];

  const testimonials = [
    {
      content: "ChainFlow transformed our supply chain operations. We've reduced costs by 30% and improved delivery times by 40%.",
      author: 'Priya Singh',
      role: 'COO, TechCorp India Pvt Ltd',
      rating: 5
    },
    {
      content: "The real-time visibility and analytics have been game-changing for our inventory management.",
      author: 'Arjun Mehta',
      role: 'Supply Chain Director, Bharat Retail Ltd',
      rating: 5
    },
    {
      content: "Outstanding platform with exceptional support. Implementation was smooth and the ROI was immediate.",
      author: 'Neha Verma',
      role: 'VP Operations, FastShip Logistics India',
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Optimize Your Supply Chain.
              <br />
              <span className="text-primary-600">Simplify Your Operations.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              ChainFlow is the all-in-one supply chain management platform that helps businesses 
              streamline operations, reduce costs, and deliver excellence at every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-3">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/features" className="btn-outline inline-flex items-center justify-center text-lg px-8 py-3">
                Request Demo
              </Link>
            </div>
          </div>
          
          {/* Hero Image/Graphic */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-lg shadow-2xl p-8">
              <img 
                src="/api/placeholder/1200/600" 
                alt="ChainFlow Dashboard" 
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-primary-100 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to handle the complexity of modern supply chains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose ChainFlow?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Reduce Operational Costs</h3>
                    <p className="text-gray-600">Cut expenses by up to 35% through intelligent optimization</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Improve Delivery Times</h3>
                    <p className="text-gray-600">Achieve 99% on-time delivery with smart routing</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-Time Visibility</h3>
                    <p className="text-gray-600">Track every order, shipment, and inventory item instantly</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Scale With Confidence</h3>
                    <p className="text-gray-600">Grow from startup to enterprise without switching platforms</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">35%</div>
                  <div className="text-sm text-gray-600">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">50%</div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
                <div className="text-center">
                  <DollarSign className="w-12 h-12 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">3x</div>
                  <div className="text-sm text-gray-600">ROI Average</div>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about ChainFlow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of companies already using ChainFlow to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
