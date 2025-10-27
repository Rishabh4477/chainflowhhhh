import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await forgotPassword(email);
    
    if (result.success) {
      setSubmitted(true);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Box className="w-12 h-12 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
            <p className="mt-2 text-sm text-gray-600">
              {submitted 
                ? "Check your email for reset instructions"
                : "No worries, we'll send you reset instructions"
              }
            </p>
          </div>

          {!submitted ? (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-10"
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
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
                      Send Reset Link
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Back to login */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-500"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600">
                  We've sent a password reset link to
                </p>
                <p className="font-medium text-gray-900 mt-1">{email}</p>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="text-primary-600 hover:text-primary-500"
                >
                  try again
                </button>
              </p>

              <Link
                to="/login"
                className="btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
