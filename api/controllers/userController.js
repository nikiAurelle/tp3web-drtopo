"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const url_base = process.env.URL + ":" + process.env.PORT;

exports.createUser = async (req, res, next) =>{
    console.log("entre");
    const {username, email, password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username: username,
            email : email,
            password: hashedPassword,
        });

        const result = await user.save();
        res.location('/users/'+ result.id);
        res.status(201).json(result);
    }
    catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
};


exports.getUser = async (req, res, next) => {
    try{
        res.status(200).json(req.user);
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }

};






