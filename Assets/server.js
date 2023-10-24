const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// const db = require('./config/connection');
// const routes = require('./routes');
const router = require('./routes/api');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server for ${activity} running on port ${PORT}!`);
//   });
// });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-API', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected to ${PORT}`));