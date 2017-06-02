'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var orgSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	posn       : {type: String},
	resp       : [],
	kpis       : [],
	procs      : [{header: String, procs: [{ desc: String }]}]
	
	});
	app.db.model('Org', orgSchema);
};