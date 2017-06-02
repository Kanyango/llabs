'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var avatarSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	posn       : {type: String},
	username   : {type: String},
	password   : {type: String},
	access     : {type: String}

	});
	app.db.model('Avatar', avatarSchema);
};