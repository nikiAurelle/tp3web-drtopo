"use strict";

const Area = require('../models/area');

module.exports = (req, res, next) =>{
    let areaId;
    let error;
    if(req.body.area) {
        areaId = req.body.area;
        error = new Error("Identifiant de area invalide.");
        error.statusCode = 422;
    }
    else
    {
        areaId = req.params.areaId;
        error = new Error("L'area n'existe pas.");
        error.statusCode = 404;
    }
   
    Area.findById(areaId)
    .then(area =>{
        if(!area){ 

            throw error;
        }
        req.area = area;
        next();
    })
    .catch(err => {
        next(err);
    });
};