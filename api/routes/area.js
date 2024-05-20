"use strict";

const express = require("express");

const router = express.Router();

const areaController = require("../controllers/areaController");
const isAuth = require('../middleware/isAuth');
const areaVerication = require('../middleware/areaVerification');
const isTrueUser = require('../middleware/isTrueUser');
const Area = require('../models/area');
const areaExist = require('../middleware/areaExist');


// /areas/ => POST
router.post("/areas/", isAuth, areaVerication, areaController.createArea);

// /areas/ => GET
router.get("/areas/", areaController.getAreas);

// /areas/my-areas => GET
router.get("/areas/my-areas",isAuth, areaController.getUserAreas);

// /areas/:areaId => GET
router.get("/areas/:areaId", areaExist, areaController.getArea);

// /areas/:areaId/routes => GET
router.get("/areas/:areaId/routes", areaExist, areaController.getRoutes);


// /areas/:areaId => PUT
router.put("/areas/:areaId", isAuth, isTrueUser(Area),  areaVerication, areaController.updateArea);

// /areas/:areaId => DELETE
router.delete("/areas/:areaId", isAuth, areaController.deleteArea);

module.exports = router;

