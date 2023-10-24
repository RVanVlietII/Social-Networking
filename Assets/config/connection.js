// const mongoose = require('mongoose');
const { connect, connection } = require('mongoose');


// const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-API';

connect('mongodb://127.0.0.1:27017/social-network-API');
// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;

module.exports = connection;
