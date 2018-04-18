const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Schema = mongoose.Schema;
const routes = require('./routes.js');
const cors = require('cors');

// Use bluebird Promise Library since mongoose promise is depreceated
mongoose.Promise = require('bluebird');

// connect to mongodb
mongoose.connect(mongoURI);

// configure app to use bodyParser()
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + ''));

app.use(cors());

// REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
app.use('/api', routes);

// Bind and listen for connections on the specified port
app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
  console.log('started at', new Date())
});
