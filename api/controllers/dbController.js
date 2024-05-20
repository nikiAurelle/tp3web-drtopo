"use strict";

const User = require('../models/user');
const Area = require('../models/area');
const Route = require('../models/route');

const user_seeds = require('../seeds/users');
const area_seeds = require('../seeds/areas');
const route_seeds = require('../seeds/routes');

let result = {};

exports.seed = (req, res, next) =>{
    User.deleteMany({})
        .then(() => User.insertMany(user_seeds))
        .then(() => Area.deleteMany({}))
        .then(() => Area.insertMany(area_seeds))
        .then(() => Route.deleteMany({}))
        .then(() => Route.insertMany(route_seeds))
        .then(() => {
            res.send("Base de données réinitialisée avec succès !");
        })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};