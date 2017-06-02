'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var capsSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	desc       : {type: String}
	
	});
	app.db.model('Capability', capsSchema);
};