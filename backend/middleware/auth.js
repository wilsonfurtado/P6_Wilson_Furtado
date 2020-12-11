require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get only the part corresponding to the token in the headers
    const token = req.headers.authorization.split(" ")[1];
    // const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("ID utilisateur non valable !");
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error || "La requête n'est pas authentifiée !" });
  }
};