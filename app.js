//Express Setup
const express = require('express');
const path = require('path');

require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Allowing express to use static files from React
if (process.env.NODE_ENV === 'production') {
  // Serve any static file
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React App
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

//Routing
const moleculesRoutes = require('./routes/moleculesRoutes');

//Setting custom headers to avoid CORS errors
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();

});

app.use('/molecule', moleculesRoutes);

app.listen(PORT);

// Exporting the app for use in the testing framework (Mocha/ Chai-HTTP)
module.exports = app;
