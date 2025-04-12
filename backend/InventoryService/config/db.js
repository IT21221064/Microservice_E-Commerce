const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Inventory Service MongoDB Connected...');
  } catch (err) {
    console.error('Inventory Service MongoDB Connection Error:', err);
    process.exit(1);
  }
};

mongoose.connection.on('error', err => {
  console.log('Inventory Service MongoDB connection error:', err);
});

module.exports = connectDB;