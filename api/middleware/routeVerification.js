"use strict";

const Route = require('../models/route');

module.exports = async (req, res, next) =>{

    const lisTypes = [
        { value: 'SPORT', text: 'Sport' },
        { value: 'TRAD', text: 'Trad' },
        { value: 'TOPROPE', text: 'Top rope' }
      ];

      const listDifficultes = [
        { value: 5.08, text: '5.8' },
        { value: 5.09, text: '5.9' },
        { value: 5.101, text: '5.10a' },
        { value: 5.102, text: '5.10b' },
        { value: 5.103, text: '5.10c' },
        { value: 5.104, text: '5.10d' },
        { value: 5.111, text: '5.11a' },
        { value: 5.112, text: '5.11b' },
        { value: 5.113, text: '5.11c' },
        { value: 5.114, text: '5.11d' },
        { value: 5.121, text: '5.12a' },
        { value: 5.122, text: '5.12b' },
        { value: 5.123, text: '5.12c' },
        { value: 5.124, text: '5.12d' },
        { value: 5.131, text: '5.13a' },
        { value: 5.132, text: '5.13b' },
        { value: 5.133, text: '5.13c' },
        { value: 5.134, text: '5.13d' },
        { value: 5.141, text: '5.14a' },
        { value: 5.142, text: '5.14b' },
        { value: 5.143, text: '5.14c' },
        { value: 5.144, text: '5.14d' },
        { value: 5.151, text: '5.15a' },
        { value: 5.152, text: '5.15b' },
        { value: 5.153, text: '5.15c' },
        { value: 5.154, text: '5.15d' }
      ];

    try{
        const route = req.body;
        const id = req.params.routeId;
        if(route.name.trim() === ""){
            const err = new Error('Le champ name est requis.');
            err.statusCode = 422;
            throw err;
        }
        let existingRoute = ""
        if(!id)  
            existingRoute = await Route.findOne({name: route.name});
        else
            existingRoute = await Route.findById(id);
        if(existingRoute && route.id != existingRoute._id.toString()){
            const err = new Error('Une route existe déjà avec ce nom.');
            err.statusCode = 409;
            throw err;
        }

        if(!route.type){
            const err = new Error('Le champ type est requis.');
            err.statusCode = 422;
            throw err;
        }

        if (!route.grade || !route.grade.text || !route.grade.value) {
            const err = new Error('Les champs text et value de la grade sont requis.');
            err.statusCode = 422;
            throw err;
        }
        const gradeExists = listDifficultes.some(d => d.value === route.grade.value && d.text === route.grade.text);
        if (!gradeExists) {
            const err = new Error('La grade est invalide.');
            err.statusCode = 422;
            throw err;
        }

        const typeExists = lisTypes.some(t => t.value === route.type);
        if (!typeExists) {
            const err = new Error('Le type de route est invalide.');
            err.statusCode = 422;
            throw err;
        }

        if (!route.grade || !route.grade.text || !route.grade.value) {
            const err = new Error('Les champs text et value de la grade sont requis.');
            err.statusCode = 422;
            throw err;
        }

        if(route.description.trim() === ""){
            const err = new Error('Le champ description est requis.');
            err.statusCode = 422;
            throw err;
        }

        if(!route.area){
            const err = new Error('Le champ area est requis.');
            err.statusCode = 422;
            throw err;
        }

        // if(!route.user){
        //     const err = new Error('Le champ user est requis.');
        //     err.statusCode = 422;
        //     throw err;
        // }
        req.route = existingRoute
        next();
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};