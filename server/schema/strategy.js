'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var strategySchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	wide       : {type: mongoose.Schema.Types.ObjectId, ref: 'Wide'},
	desc       : {type: String}

	});
	app.db.model('Strategy', strategySchema);
};