'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var procedureSchema = new mongoose.Schema({

	dateCreated : {type: Date, default: Date.now()},
	user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	owner       : {type: mongoose.Schema.Types.ObjectId, ref: 'Org'},
	header      : {type: String},
	procs       : {}
	
	});
	app.db.model('Procedure', procedureSchema);
};