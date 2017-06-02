'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var innoSchema = new mongoose.Schema({

	dateCreated : {type: Date, default: Date.now()},
	user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	action      : {type: String},
	kpi         : {type: String},
	acc         : {type: String},
	target      : {type: String},
	measure     : {type: String},
	start_period: {type: String},
	end_period  : {type: String},
	evaluate    : {type: String}

	});
	app.db.model('Innovation', innoSchema);
};