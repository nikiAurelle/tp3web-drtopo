"use strict";
const User = require("../models/user");


module.exports = (req, res, next) => {

   
    let userId;
    let error;
    if(req.body.userId)
    {
        userId = req.body.userId;
        error = new Error("Identifiant de user invalide.");
        error.statusCode = 422;
    }
    else
    {
        userId = req.params.userId;
        error = new Error("L'utilisateur n'existe pas.");
        error.statusCode = 404;
    }

    User.findById(userId)
    .then(user =>{
        if(!user){
            throw error;
        }
        req.user = user;
        next();
    })
    .catch(err => {
        next(err);
    });
     
};
 