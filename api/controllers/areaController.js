"use strict";

const { json } = require("body-parser");
const area = require("../models/area");
const Area = require("../models/area");
const Route = require("../models/route");
const dotenv = require("dotenv");

dotenv.config();

const url_base = process.env.URL + ":" + process.env.PORT;

exports.createArea = async (req, res, next) => {

    const area = req.body; 
 
    try{ 
        const newArea = new Area({
            name : area.name,
            description : area.description,
            gettingThere : area.gettingThere,
            lon : area.lon,
            lat : area.lat,
            routes : area.routes,
            user: req.user.id
        });
        const result = await newArea.save();
        res.location('/areas/'+ result.id);
        res.status(201).json({message: "Area crée avec succès !"});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
				
};


exports.getAreas = async (req, res, next) => {
	
    try{
        const areas = await Area.find().populate('routes');
        res.status(200).json(areas);
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
   
};

exports.getUserAreas = async (req, res, next) => {
	
    try { 
        const areas = await Area.find({user: req.user.id}); 
        return res.status(200).json(areas);
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

exports.getArea = async (req, res, next) => {
	const areaId = req.params.areaId;
    console.log("areaId", areaId);
    try{
        const area = await Area.findOne({_id: areaId}).populate('routes');
        if(!area){
            const error = new Error("Le lieu n'existe pas.");
            error.statusCode = 404;
            throw error;
        }
        console.log(area);
        res.status(200).json(area);
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateArea = async (req, res, next) =>{

    const {name, description, gettingThere, lon, lat, routes} = req.body;
    try{
        let area = req.area;
        area.name = name;
        area.description = description;
        area.gettingThere = gettingThere;
        area.lon = lon;
        area.lat = lat;
        area.routes = routes;
        area.user = req.user.id;

        const result = await area.save(); 
        res.status(200).json(result);
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteArea = async (req, res, next) =>{
    const areaId = req.params.areaId;

    try{
        const result = await Area.findById(areaId); 
        if(!result){
            res.status(204).end(); 
          }
          else if(result.user.toString() !== req.user.id){
              const err = new Error("Vous n'avez pas les autorisations requises pour effectuer cette action.");
              err.statusCode = 403;
              throw err;
          }
        const routesWithArea = await Route.find({area: areaId});
        if(routesWithArea.length == 0){
            try{
                await Area.findByIdAndDelete(areaId);
                return res.status(204).json({message: "Area supprimé avec succcès."}).send();
            }
            catch (err) {
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({ message: err.message }).send();
            }
        }
        else{
            return res.status(409).json({message: "Impossible de supprimer ce lieu car des routes y sont associées."}).send();
        }
    }
    catch (err) {
        let statusCode = err.statusCode || 500;
        return res.status(statusCode).json({ message: err.message }).send();
    }


};



exports.getRoutes = async (req, res, next) => {
	const areaId = req.params.id;
    try{
        const routes = await Route.find({area: areaId});
        if(routes){
            return res.status(200).json(routes);
        }
    }
    catch(err){
        let statusCode = err.statusCode || 500;
        return res.status(statusCode).json({ message: err.message } ).send();
    }
};


