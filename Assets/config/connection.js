const mongoose = require('mongoose');


const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-API';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

module.exports = db;
