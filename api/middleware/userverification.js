"use strict";

const User = require('../models/user');

module.exports = async (req, res, next) =>{
    
    let user = req.body;
    const regex = /.+@.+\..+/;
    try{
        if(!user.username || user.username.length < 3 || user.username.length > 50){
            const err = new Error('Le champ username est requis et doit être compris entre 3 et 50.');
            err.statusCode = 422;
            throw err;
        }

        let existingUser = await User.findOne({name : user.username});
        if(existingUser){
            const err = new Error('Un user existe déjà avec ce nom.');
            err.statusCode = 409;
            throw err;
        }

        if(!user.email || user.email.trim() === "" || user.email.length > 50){
            const err = new Error('Le champ email est requis et doit être inférieur à 50.');
            err.statusCode = 422;
            throw err;
        }

        
        if (!regex.test(user.email)) {
            const err = new Error('Adresse courriel invalide.');
            err.statusCode = 422;
            throw err;
        }

        existingUser = await User.findOne({email : user.email});
        if(existingUser){
            const err = new Error('Un user existe déjà avec cet email.');
            err.statusCode = 409;
            throw err;
        }

        if(!user.password || user.password.trim() === "" || user.password.length < 6){
            const err = new Error('Le champ password est requis et doit être supérieur ou égal à 6.');
            err.statusCode = 422;
            throw err;
        }

        next();
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};