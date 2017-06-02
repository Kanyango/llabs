'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var bizSchema = new mongoose.Schema({

	dateCreated : {type: Date, default: Date.now()},
	user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	story       : {type: String},
	vision      : {type: String},
	mission     : {type: String},
	values      : {}


	});
	app.db.model('Biz', bizSchema);
};