'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var weakSchema = new mongoose.Schema({

	dateCreated : {type: Date, default: Date.now()},
	user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	desc        : {},


	});
	app.db.model('Weak', weakSchema);
};