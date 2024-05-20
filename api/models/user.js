"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			minlength: 3,
			maxLength: 50
			
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Adresse courriel invalide"],
			maxLength: 50,
			validate: { 
				validator: async function (value) {
					const existingUser = await mongoose.models.User.findOne({ email: value });
					return !existingUser;
				},
				message: 'Ce email est déjà utilisé.'
			}
			
		},
		password: {
			type: String,
			required: true,
			minlength: 6
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
