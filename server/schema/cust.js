'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var customerSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	label      : {type: String},
	bens       : {}
	});
	app.db.model('Customer', customerSchema);
};