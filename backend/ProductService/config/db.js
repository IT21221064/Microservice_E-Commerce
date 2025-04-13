const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Product Service MongoDB Connected...');
  } catch (err) {
    console.error('Product Service MongoDB Connection Error:', err);
    process.exit(1);
  }
};

mongoose.connection.on('error', err => {
  console.log('Product Service MongoDB connection error:', err);
});

module.exports = connectDB;