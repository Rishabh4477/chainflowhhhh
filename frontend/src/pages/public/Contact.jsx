import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
  Globe,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const offices = [
    {
      location: 'Mumbai',
      address: '101 Business Park, Andheri East, Mumbai, MH 400093',
      phone: '+91 22 1234 5678',
      email: 'contact.mumbai@chainflow.com',
      hours: '9:00 AM - 6:00 PM IST'
    },
    {
      location: 'Bengaluru',
      address: '22/3 Industrial Area, Peenya, Bengaluru, KA 560058',
      phone: '+91 80 2345 6789',
      email: 'contact.blr@chainflow.com',
      hours: '9:00 AM - 6:00 PM IST'
    },
    {
      location: 'New Delhi',
      address: '55 Trade Centre, Connaught Place, New Delhi, DL 110001',
      phone: '+91 11 3456 7890',
      email: 'contact.delhi@chainflow.com',
      hours: '9:00 AM - 6:00 PM IST'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success('Message sent successfully!');
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      type: 'general'
    });
    setSubmitted(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about ChainFlow? We're here to help you optimize your supply chain operations.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sales Inquiries</h3>
              <p className="text-gray-600 mb-4">
                Interested in ChainFlow for your business? Our sales team is ready to help.
              </p>
              <a href="mailto:sales@chainflow.com" className="text-primary-600 hover:text-primary-700 font-medium">
                sales@chainflow.com
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
              <p className="text-gray-600 mb-4">
                Need help? Our support team is available 24/7 to assist you.
              </p>
              <a href="tel:+919876543210" className="text-primary-600 hover:text-primary-700 font-medium">
                +91 98765 43210
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">General Inquiries</h3>
              <p className="text-gray-600 mb-4">
                For general questions and partnership opportunities.
              </p>
              <a href="mailto:info@chainflow.com" className="text-primary-600 hover:text-primary-700 font-medium">
                info@chainflow.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Aarav Sharma"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="aarav@company.in"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Bharat Industries"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales</option>
                      <option value="support">Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="demo">Request Demo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 bg-green-50 rounded-lg">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="btn-outline"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
            
            {/* Map / Office Locations */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Offices</h2>
              
              <div className="bg-gray-200 rounded-lg h-64 mb-8">
                {/* Placeholder for map */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <Globe className="w-16 h-16" />
                </div>
              </div>
              
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">{office.location}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span>{office.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start your free trial today or schedule a personalized demo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Free Trial
            </a>
            <a 
              href="#" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
