'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var rptSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	obj        : {type: mongoose.Schema.Types.ObjectId, ref: 'Target'},
	strategy   : {type: mongoose.Schema.Types.ObjectId, ref: 'Strategy'},
	wide       : {type: mongoose.Schema.Types.ObjectId, ref: 'Wide'},
	start_date : {type: String},
	end_date   : {type: String},
	progress   : {type: String},
	rate       : {type: String}

	});
	app.db.model('Reports', rptSchema);
};