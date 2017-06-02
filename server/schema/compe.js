'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var competitorSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	name       : {type: String},
	strength   : {},
	weakness   : {}
	});
	app.db.model('Competitor', competitorSchema);
};