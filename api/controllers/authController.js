"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const url_base = process.env.URL + ":" + process.env.PORT;

const User = require("../models/user");


exports.logIn = async (req, res, next) => {
    const { email, password } = req.body;
    let loadedUser;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error("Courriel ou mot de passe invalide");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
          // Vérifie si le mot de passe est valide
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error("Courriel ou mot de passe invalide");
        error.statusCode = 401;
        throw error;
      }
          
          // Création d'un jeton JWT
      const token = jwt.sign(
        {
          email: loadedUser.email,
          name: loadedUser.name,
          id: loadedUser.id.toString(),
        },
        process.env.SECRET_JWT,
        { expiresIn: "24h" }
      );
  
      res.status(200).json({ token: token, user: loadedUser });
    } catch (err) {
     if (!err.statusCode) err.statusCode = 500;
     res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
    }
  };
  
