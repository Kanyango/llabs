'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var policySchema = new mongoose.Schema({

	dateCreated : {type: Date, default: Date.now()},
	user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	header      : {type: String},
	pols        : {}

	});
	app.db.model('Policy', policySchema);
};