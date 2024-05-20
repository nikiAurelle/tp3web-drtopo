"use strict";

const Area = require('../models/area');


module.exports = async (req, res, next) =>{
    let area = req.body; 
    const id = req.params.areaId;
    try{
        if(area.name.trim() === ""){
            const err = new Error('Le champ name est requis.');
            err.statusCode = 422;
            throw err;
        }

        let existingArea = ""
        if(!id)
            existingArea = await Area.findOne({name : area.name});
        else
            existingArea = await Area.findById(id);
        if(existingArea && area.id != existingArea._id.toString()){
            const err = new Error('Un area existe déjà avec ce nom.');
            err.statusCode = 409;
            throw err;
        }

        if(area.description.trim() === ""){
            const err = new Error('Le champ description est requis.');
            err.statusCode = 422;
            throw err;
        }
    
        if(area.gettingThere.trim() === ""){
            const err = new Error('Le champ gettingThere est requis.');
            err.statusCode = 422;
            throw err;
        }
    
        if(area.lon === "" || area.lon < -180 || area.lon > 180){
            const err = new Error('Le champ lon est requis et doit être compris entre -180 et 180.');
            err.statusCode = 422;
            throw err;
        } 
    
        if(area.lat === "" || area.lat < -90 || area.lat > 90){
            const err = new Error('Le champ lat est requis et doit être compris entre -180 et 180.');
            err.statusCode = 422;
            throw err;
        }
       req.area = existingArea
        next(); 
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

    

};