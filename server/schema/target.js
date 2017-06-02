'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var targetSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	strat      : {type: mongoose.Schema.Types.ObjectId, ref: 'Strategy'},
	wide       : {type: mongoose.Schema.Types.ObjectId, ref: 'Obj'},
	owner      : {type: String},
	desc       : {type: String},
	kpi        : {type: String},
	measure    : {type: String},
	value      : {type: String},
	start_date : {type: String},
	end_date   : {type: String},
	pery       : {}

	});
	app.db.model('Target', targetSchema);
};