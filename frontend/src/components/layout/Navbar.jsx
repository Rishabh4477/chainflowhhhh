import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, Box, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Box className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">ChainFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                Solutions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a href="#inventory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Inventory Management
                      </a>
                      <a href="#suppliers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Supplier Management
                      </a>
                      <a href="#logistics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Logistics & Shipping
                      </a>
                      <a href="#analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Analytics & Reporting
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary"
              >
                Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 space-y-3">
              {user ? (
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsOpen(false);
                  }}
                  className="btn-primary w-full"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-center py-2 text-gray-700 hover:text-primary-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary block text-center w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
