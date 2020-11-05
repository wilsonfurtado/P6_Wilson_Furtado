const express = require('express');

const app = express();

// Middleware 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware 
app.use('/api/auth/login', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
      },
    ];
    res.status(200).json(stuff);
  }); 

module.exports = app;