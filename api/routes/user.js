"use strict";

const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const isAuth = require('../middleware/isAuth');
const userExist = require('../middleware/userExist');
const userverification = require('../middleware/userverification');

// /users/ => POST
router.post("/users", userverification, userController.createUser);

// /users/:utilisateurId => GET (utilisateur authentifié)
router.get("/users/:userId", isAuth, userExist, userController.getUser);


module.exports = router;
