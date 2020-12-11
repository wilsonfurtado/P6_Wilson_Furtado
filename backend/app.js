require("dotenv").config();
// Import the express library
const express = require('express');

const helmet = require("helmet");
// Instantiate the app
// const app = express();
// 
const bodyParser = require("body-parser");
// Handler mangoDB
const mongoose = require('mongoose');

const path = require("path");
// Route User
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Connection MangoDB DataBase
mongoose.connect('mongodb+srv://wilsonWFU:edd1sson3@clusterp6.vrf2v.mongodb.net/ClusterP6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use(helmet()); // https://www.npmjs.com/package/helmet#how-it-works

// Headers CORS - response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); // Transform the request body into a JSON object

app.use("/images", express.static(path.join(__dirname, "images")));

// Routing
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);


module.exports = app;
