"use strict";

const Area = require('../models/area');
const Route = require('../models/route')



module.exports = (model) =>{
    return async (req, res, next) =>{
        let id = "";
        if(model == Area)
            id = req.params.areaId;
        else if(model == Route)
            id = req.params.routeId;
        try {
            const result = await model.findById(id); 
            if(result.user.toString() !== req.user.id){
                const err = new Error("Vous n'avez pas les autorisations requises pour effectuer cette action.");
                err.statusCode = 403;
                throw err;
            }
            if(model == Area)
                req.area = result;
            else if(model == Route)
                req.route = result;
            next();
          } catch (err) {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }                          
    };
};