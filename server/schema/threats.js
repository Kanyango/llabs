'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var thratsSchema = new mongoose.Schema({

	dateCreated : {type: Date, default: Date.now()},
	user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	desc        : {type: String},


	});
	app.db.model('Threat', thratsSchema);
};