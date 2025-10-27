import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Box className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold text-white">ChainFlow</span>
            </div>
            <p className="text-sm mb-4">
              Optimize your supply chain operations with our comprehensive management platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-primary-400 transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary-400 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                  Inventory Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                  Supplier Portal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                  Analytics Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  101 Business Park,<br />
                  Andheri East, Mumbai, MH 400093
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+912212345678" className="hover:text-primary-400 transition-colors text-sm">
                  +91 22 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@chainflow.com" className="hover:text-primary-400 transition-colors text-sm">
                  info@chainflow.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} ChainFlow. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
