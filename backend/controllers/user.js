require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passwordValidator = require("../middleware/password-validator");

// Create a new user
exports.signup = (req, res) => {
        if (passwordValidator.validate(req.body.password)) { 
        
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash,
          });
          user.save()
            .then(() => res.status(201).json({ message: "Un nouvel utilisateur a été créé avec succès !" }))
            .catch(() => res.status(400).json({ message: "Votre email est déja utilisé pour un autre compte utilisateur" }));
        })
        .catch(error => res.status(500).json({ error }));

    } else {
      // If the password is not validated
      res.status(400).json({ message: "Votre mot de passe doit compter entre 10 et 30 caractères et au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial." });
    }
  };

  // Connect a user
  exports.login = (req, res) => {

    User.findOne({ email: req.body.email })
      .then(user => {
        console.log('user : ', user);
        debugger;
        if (!user) {
          return res.status(401).json({ message: "L'utilisateur n'a pas été trouvé !" });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ message: "Le mot de passe est incorrect !" });
            }
            res.status(200).json({

              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: "24h" },
              ),
              
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };