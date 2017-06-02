'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var objSchema = new mongoose.Schema({

	dateCreated : {type: Date, default: Date.now()},
	user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	desc        : {type: String},
	start_date   : {type: String},
	end_date     : {type: String}
	});
	app.db.model('Obj', objSchema);
};