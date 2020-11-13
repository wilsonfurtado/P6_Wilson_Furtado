require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupère uniquement la partie correspondant au token dans les headers
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const { userId } = decodedToken;

    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("ID utilisateur non valable !");
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error || "La requête n'est pas authentifiée !" });
  }
};