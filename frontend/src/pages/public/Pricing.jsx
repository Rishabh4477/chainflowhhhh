import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Info, Star } from 'lucide-react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses getting started',
      monthlyPrice: 99,
      yearlyPrice: 89,
      popular: false,
      features: [
        { name: 'Up to 10 users', included: true },
        { name: '1,000 SKUs', included: true },
        { name: '5,000 orders/month', included: true },
        { name: 'Basic inventory management', included: true },
        { name: 'Supplier management', included: true },
        { name: 'Standard reports', included: true },
        { name: 'Email support', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'API access', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Dedicated account manager', included: false }
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses',
      monthlyPrice: 299,
      yearlyPrice: 269,
      popular: true,
      features: [
        { name: 'Up to 50 users', included: true },
        { name: '10,000 SKUs', included: true },
        { name: '25,000 orders/month', included: true },
        { name: 'Advanced inventory management', included: true },
        { name: 'Supplier portal', included: true },
        { name: 'Custom reports & dashboards', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'API access', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom integrations', included: false },
        { name: 'Dedicated account manager', included: false }
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      popular: false,
      features: [
        { name: 'Unlimited users', included: true },
        { name: 'Unlimited SKUs', included: true },
        { name: 'Unlimited orders', included: true },
        { name: 'Full platform features', included: true },
        { name: 'White-label supplier portal', included: true },
        { name: 'Custom reports & AI insights', included: true },
        { name: '24/7 phone & priority support', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Full API access', included: true },
        { name: 'Advanced analytics & AI', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Dedicated account manager', included: true }
      ],
      cta: 'Contact Sales'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees for any of our plans. You can start using ChainFlow immediately after signing up.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, ACH transfers, and wire transfers for Enterprise customers.'
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time with no cancellation fees.'
    },
    {
      question: 'Do you offer discounts for nonprofits?',
      answer: 'Yes, we offer special pricing for qualified nonprofit organizations. Contact our sales team for details.'
    }
  ];

  const addOns = [
    { name: 'Additional Users', price: '$10/user/month' },
    { name: 'Extra Storage', price: '$50/TB/month' },
    { name: 'Premium Support', price: '$199/month' },
    { name: 'Custom Training', price: '$500/session' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                billingPeriod === 'monthly' 
                  ? 'bg-white text-gray-900 shadow' 
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                billingPeriod === 'yearly' 
                  ? 'bg-white text-gray-900 shadow' 
                  : 'text-gray-600'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Save 10%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-lg ${
                  plan.popular 
                    ? 'ring-2 ring-primary-600 shadow-xl scale-105' 
                    : 'border border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    {typeof plan.monthlyPrice === 'number' ? (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">
                          ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <span className="text-gray-600">/month</span>
                        {billingPeriod === 'yearly' && (
                          <div className="text-sm text-green-600 mt-1">
                            Billed ${plan.yearlyPrice * 12} annually
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">{plan.monthlyPrice}</span>
                        <div className="text-gray-600">Contact us for pricing</div>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  
                  <div className="mt-8 space-y-4">
                    <div className="text-sm font-semibold text-gray-900">Features included:</div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Flexible Add-ons
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your plan with these optional features
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-primary-600 font-medium">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            30-Day Money-Back Guarantee
          </h2>
          <p className="text-gray-600 mb-6">
            We're confident you'll love ChainFlow. If you're not completely satisfied within 
            the first 30 days, we'll give you a full refund. No questions asked.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of businesses already using ChainFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
