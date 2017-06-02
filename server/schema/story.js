'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var storySchema = new mongoose.Schema({

	dateCreated : {type: Date, default: Date.now()},
	user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	desc        : {type: String},
	vision      : {type: String},
	mission     : {type: String},
	values      : {}

	});
	app.db.model('Story', storySchema);
};