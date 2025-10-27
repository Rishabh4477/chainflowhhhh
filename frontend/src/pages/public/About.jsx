import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Target, Eye, Users, Globe, Zap, ArrowRight } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Customer Focus',
      description: 'We put our customers at the center of everything we do, ensuring their success is our success.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously pushing boundaries to deliver cutting-edge supply chain solutions.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Building strong partnerships with our clients to achieve shared goals.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in every aspect of our platform.'
    }
  ];

  const team = [
    {
      name: 'Rahul Mehta',
      role: 'CEO & Co-Founder',
      image: '/api/placeholder/150/150',
      bio: '15+ years in supply chain management'
    },
    {
      name: 'Priya Iyer',
      role: 'CTO & Co-Founder',
      image: '/api/placeholder/150/150',
      bio: 'Former tech lead at major logistics companies'
    },
    {
      name: 'Arjun Patel',
      role: 'Head of Product',
      image: '/api/placeholder/150/150',
      bio: 'Expert in enterprise software solutions'
    },
    {
      name: 'Neha Gupta',
      role: 'VP of Sales',
      image: '/api/placeholder/150/150',
      bio: '10+ years in B2B SaaS sales'
    }
  ];

  const milestones = [
    { year: '2019', event: 'ChainFlow founded with a vision to revolutionize supply chain management' },
    { year: '2020', event: 'Launched MVP and onboarded first 10 enterprise clients' },
    { year: '2021', event: 'Raised $15M Series A funding and expanded to 100+ customers' },
    { year: '2022', event: 'Introduced AI-powered analytics and predictive forecasting' },
    { year: '2023', event: 'Reached 500+ global customers and $50M ARR' },
    { year: '2024', event: 'Expanding internationally with offices in Europe and Asia' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About ChainFlow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to transform supply chain management through innovative 
              technology and exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card bg-primary-50">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg">
                To empower businesses of all sizes with intelligent supply chain management 
                solutions that drive efficiency, reduce costs, and enable sustainable growth 
                in an increasingly complex global marketplace.
              </p>
            </div>
            <div className="card bg-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg">
                To be the world's most trusted supply chain platform, setting the standard 
                for innovation, reliability, and customer success while contributing to a 
                more sustainable and efficient global supply network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Story Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From startup to industry leader
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-20 bg-gray-300 mx-auto mt-2"></div>
                  )}
                </div>
                <div className="flex-grow pt-2">
                  <p className="text-gray-700">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the people driving ChainFlow forward
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-300"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 font-medium">{member.role}</p>
                <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-10 h-10 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Sustainability & Innovation
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                At ChainFlow, we believe that efficient supply chains are sustainable supply chains. 
                Our platform helps companies reduce waste, optimize routes, and minimize their 
                environmental footprint.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-700">30% average reduction in carbon emissions through route optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-700">25% decrease in inventory waste with predictive analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-700">Supporting circular economy initiatives through better resource management</span>
                </li>
              </ul>
              <Link to="/features" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2">
                Learn more about our sustainability features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">25%</div>
                <p className="text-gray-700 font-medium">Average Carbon Reduction</p>
                <p className="text-sm text-gray-500 mt-2">Achieved by our customers in 2023</p>
              </div>
              <hr className="my-6" />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">1M+</div>
                  <p className="text-sm text-gray-600">Tons CO2 Saved</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500K</div>
                  <p className="text-sm text-gray-600">Trees Equivalent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Us in Transforming Supply Chains
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Be part of the future of supply chain management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get Started Today
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
