"use strict";

const Route = require('../models/route');

module.exports = (req, res, next) => {

    let routeId;
    let error;
    if(req.body.routes)
    {
        routeId = req.body.routes;
        error = new Error("Identifiant de route invalide.");
        error.statusCode = 422;
    }
    else
    {
        routeId = req.params.routeId;
        error = new Error("Route non trouvée.");
        error.statusCode = 404;
    }

    Route.findById(routeId).populate([
        { path: 'area' },
        { path: 'user' }
      ])
    .then(route =>{
        if(!route){
            throw error;
        }
        req.route = route;
        next();
    })
    .catch(err => {
        next(err);
    });
     
};
 