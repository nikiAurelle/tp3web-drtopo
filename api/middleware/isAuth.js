"use strict";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

	// Vérifie si l'en-tête Authorization est présent
  if (!authHeader) {
    return res.status(401).json({ error: 'Non authentifié.' });
  }

	// Récupère le jeton JWT
  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
	// Vérifie le jeton et récupére les données associées
    decodedToken = jwt.verify(token, process.env.SECRET_JWT);
		// Ajoute les données associées à l'objet de requête pour utilisation ultérieure
    req.user = decodedToken;
    
    next();
  } catch (err) {
    err.statusCode = 401;
    return next(err);
  }
};
