// Import the express library
const express = require('express');
// Instantiate the app
const app = express();
// 
const bodyParser = require("body-parser");
// Handler mangoDB
const mongoose = require('mongoose');

// Route User
const userRoutes = require("./routes/user");

// Connection MangoDB DataBase
mongoose.connect('mongodb+srv://wilsonWFU:edd1sson3@clusterp6.vrf2v.mongodb.net/ClusterP6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Headers CORS - response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); // Transform the request body into a JSON object

// Routing
app.use("/api/auth", userRoutes);


module.exports = app;
