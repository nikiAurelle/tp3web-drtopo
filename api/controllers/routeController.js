"use strict";

const Route = require("../models/route");
const Area = require('../models/area');
const dotenv = require("dotenv");
const route = require("../models/route");
const mongoose = require('mongoose');

dotenv.config();
const url_base = process.env.URL + ":" + process.env.PORT;

exports.createRoute = async (req, res, next) => {
    const {name, type, grade, description, approach, descent, area} = req.body;
    
    try{
        const routes = Route({
            name : name,
            type : type,
            grade : grade,
            description : description,
            approach : approach,
            descent : descent,
            area : area,
            user : req.user.id,
        });
        const route = await routes.save();
       
        const routesLinks = {
          ...route.toJSON(),
            links:[
              {rel: 'self', method: 'POST', href: `${url_base}/routes/`},
              // {rel: 'get', method: 'GET', href: `${url_base}/routes/`},
              // {rel: 'get', method: 'GET', href: `${url_base}/routes/my-routes`},
              {rel: 'get', method: 'GET', href: `${url_base}/routes/${route._id}`},
              {rel: 'put', method: 'PUT', href: `${url_base}/routes/${route._id}`},
              {rel: 'delete', method: 'DELETE', href: `${url_base}/routes/${route._id}`},

            ]
        }
        res.status(201).json({routesLinks, message: "La route a été crée avec succès !"});
    }
    catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }			
};

exports.getRoutes = async (req, res, next) => {
	try{
    const {type, difficulte1, difficulte2, lieu} = req.query;
    const filter = {};

    if (type) {
      filter.type = type;
    }
    
    if (difficulte1 || difficulte2) {
      filter['grade.value'] = {};
      if (difficulte1) {
        filter['grade.value'].$gte = Number(difficulte1);
      }
      if (difficulte2) {
        filter['grade.value'].$lte = Number(difficulte2);
      }
    }
    console.log(Number(difficulte1), Number(difficulte2))
    if (lieu && mongoose.Types.ObjectId.isValid(lieu)) {
      filter.area = lieu;
    }

    const routes = await Route.find(filter).populate('area').sort({ 'grade.value': 1, name: 1 });;
    console.log(routes)
    const routesLinks = routes.map(route =>{
      return {
        ...route.toJSON(),
        links: [
              {rel: 'self', method: 'GET', href: `${url_base}/routes/`}, 
              {rel: 'get', method: 'GET', href: `${url_base}/routes/${route._id}`},
              {rel: 'put', method: 'PUT', href: `${url_base}/routes/${route._id}`},
              {rel: 'delete', method: 'DELETE', href: `${url_base}/routes/${route._id}`},
        ]
      }
    })
    res.status(200).json(routesLinks);
  }
  catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
  }
  next(err);
  }
};

exports.getUserRoutes = async (req, res, next) => {
	try{
    const routes = await Route.find({user: req.user.id}).populate('area');
    const routesLinks = routes.map(route =>{
      return {
        ...route.toJSON(),
        links: [
              // {rel: 'self', method: 'GET', href: `${url_base}/routes/${route._id}`},
              // {rel: 'get', method: 'GET', href: `${url_base}/routes/`},
              {rel: 'self', method: 'GET', href: `${url_base}/routes/my-routes`},
              {rel: 'get', method: 'GET', href: `${url_base}/routes/${route._id}`},
              {rel: 'put', method: 'PUT', href: `${url_base}/routes/${route._id}`},
              {rel: 'delete', method: 'DELETE', href: `${url_base}/routes/${route._id}`},

        ]
      }
    })
    return res.status(200).json(routesLinks);
  }
  catch(err){
    if(!err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
  }
};

exports.getRoute = async (req, res, next) => {
  try{

    const route = req.route
    const routesLinks = {
      ...route.toJSON(),
        links: [
              {rel: 'self', method: 'GET', href: `${url_base}/routes/${route._id}`},
              // {rel: 'get', method: 'GET', href: `${url_base}/routes/`},
              // {rel: 'get', method: 'GET', href: `${url_base}/routes/my-routes`},
              {rel: 'get', method: 'GET', href: `${url_base}/routes/${route._id}`},
              {rel: 'put', method: 'PUT', href: `${url_base}/routes/${route._id}`},
              {rel: 'delete', method: 'DELETE', href: `${url_base}/routes/${route._id}`},

        ]
    }

    res.status(200).json(routesLinks);
  }
  catch(err){
    if(!err.statusCode){
        err.statusCode = 500;
    }
    next(err);
}
};

exports.updateRoute = async (req, res, next) =>{
  const {name, type, grade, description, approach, descent, area} = req.body;
  try{
    let route = req.route;
    route.name = name;
    route.type = type;
    route.grade = grade;
    route.description = description;
    route.approach = approach;
    route.descent = descent;
    route.area = area;
    route.user = req.user.id;

    const result = await route.save();
    const routesLinks = {
      links: [
        {rel: 'self', method: 'PUT', href: `${url_base}/routes/${result._id}`},
        {rel: 'put', method: 'PUT', href: `${url_base}/routes/${result._id}`},
        {rel: 'get', method: 'GET', href: `${url_base}/routes/${result._id}`},
        {rel: 'delete', method: 'DELETE', href: `${url_base}/routes/${result._id}`},

    ]
    }
    res.status(200).json(routesLinks);

  }
  catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
  }
  next(err);
  }
   
};

exports.deleteRoute = async (req, res, next) =>{

  const routeId = req.params.routeId;
  try{
    const result = await Route.findById(routeId); 
    if(!result){
      res.status(204).end(); 
    }
    else if(result.user.toString() !== req.user.id){
        const err = new Error("Vous n'avez pas les autorisations requises pour effectuer cette action.");
        err.statusCode = 403;
        throw err;
    }
    const route = await Route.findByIdAndDelete(routeId);
    res.status(204).end();     
  }
  catch (err) {
    let statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};




