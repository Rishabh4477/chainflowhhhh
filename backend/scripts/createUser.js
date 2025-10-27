import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createInitialUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: 'admin@chainflow.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name: 'Aarav Sharma',
      email: 'admin@chainflow.com',
      password: 'Admin123',
      company: 'ChainFlow Industries',
      role: 'admin',
      department: 'Management',
      phone: '+1 (555) 123-4567'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@chainflow.com');
    console.log('🔑 Password: Admin123');
    console.log('');
    
    // Create manager user
    const managerUser = await User.create({
      name: 'Neha Verma',
      email: 'manager@chainflow.com',
      password: 'Manager123',
      company: 'ChainFlow Industries',
      role: 'manager',
      department: 'Operations',
      phone: '+1 (555) 234-5678'
    });

    console.log('✅ Manager user created successfully!');
    console.log('📧 Email: manager@chainflow.com');
    console.log('🔑 Password: Manager123');
    console.log('');

    console.log('🎉 You can now log in with these credentials!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createInitialUsers();
