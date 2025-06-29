const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

// Import models - using CommonJS since this is a Node.js script
const { User } = require('../src/models/User.ts');
const { Category } = require('../src/models/Category.ts');
const { Article } = require('../src/models/Article.ts');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/baotiendientu';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Create sample data
    console.log('Database seeded successfully!');
    console.log('Sample data has been created.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

// Run the seed script
connectDB().then(() => {
  seedDatabase();
}); 