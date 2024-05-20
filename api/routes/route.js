"use strict";

const isAuth = require('../middleware/isAuth');

const express = require("express");
const areaExist = require('../middleware/areaExist');

const router = express.Router();

const routeController = require("../controllers/routeController");
const routeVerication = require('../middleware/routeVerification');
const isTrueUser = require('../middleware/isTrueUser');
const Route = require('../models/route');
const routeExist = require('../middleware/routeExist');
const routeVerification = require('../middleware/routeVerification');


// /routes/ => POST
router.post("/routes/", isAuth, areaExist, routeVerication, routeController.createRoute);

// /routes/ => GET
router.get("/routes/", routeController.getRoutes);

// /routes/my-routes => GET
router.get("/routes/my-routes", isAuth,  routeController.getUserRoutes);

// /routes/:routeId => GET
router.get("/routes/:routeId", routeExist, routeController.getRoute);

// /routes/:routeId => PUT
router.put("/routes/:routeId", isAuth, routeExist, isTrueUser(Route), routeVerification,  routeController.updateRoute);

// /routes/:routeId => DELETE
router.delete("/routes/:routeId", isAuth, routeController.deleteRoute);

module.exports = router;

