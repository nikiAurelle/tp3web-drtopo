"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const areaSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			minLength: 1,
		},
		description: {
			type: String,
			required: true,
		},
		gettingThere: {
			type: String,
			required: true,
		},
        lon: {
			type: Number,
			min: [-180, "La valeur minimal pour la longitude est de -180"],
			max: [180, "La valeur maximal pour la longitude est de 180"],
			required: true,
		},
        lat: {
			type: Number,
			required: true,
			min: [-90, "La valeur minimal pour la latitude est de -90"],
			max: [90, "La valeur maximal pour la latitude est de 90"],
		},
        routes:[
            {
              type: Schema.Types.ObjectId,
              ref: 'Route'
            }
          ],
        user : {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Area", areaSchema);
