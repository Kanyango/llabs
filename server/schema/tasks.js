'use strict';

var mongoose = require('mongoose');
var moment   = require('moment');

module.exports = function(app , mongoose)
{
	

	var taskSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	title      : {type: String},
	acc        : {type: String},
	action     : {type: String},
	dead       : {type: String},
	done       : {type: String},
	comp_date  : {type: String},
	start_date : {type: String}
	});

	

	app.db.model('Task', taskSchema);
};