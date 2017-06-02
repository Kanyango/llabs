'use strict';
var mongoose = require('mongoose');


var org = {

	create : function(req , res , next)
	{

		var fieldsToSet = 
		{
			user       : req.payload._id,
			posn       : req.body.posn
		}
		
		console.log(req.body);

		req.app.db.models.Org.create(fieldsToSet, 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	update : function(req , res , next)
	{
		var id = req.body._id;
		
		var options = { new : true };

		req.app.db.models.Org.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , req.body ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },
	add_r: function(req , res , next)
	  {

	  	console.log(req.body);

	  	req.app.db.models.Org.update(
		  		 {_id : mongoose.Types.ObjectId(req.body.id)},
		  		 {$addToSet : {resp :  req.body.r}}, 
		  		 function(err , info){
		  			if(err)
		  			{
		  				return next(err);
		  			}
		  			res.status(200).json(info);
		  		});
		
			
	  },
	  add_kpis: function(req , res , next)
	  {

	  	console.log(req.body);

	  	req.app.db.models.Org.update(
		  		 {_id : mongoose.Types.ObjectId(req.body.id)},
		  		 {$addToSet : {kpis :  req.body.k}}, 
		  		 function(err , info){
		  			if(err)
		  			{
		  				return next(err);
		  			}
		  			res.status(200).json(info);
		  		});
		
			
	  },
	read : function(req , res , next)
	{
		
		req.app.db.models.Org.find({user: req.payload._id},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	single : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);
		req.app.db.models.Supplier.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	remove : function(req , res , next)
	{
		
		
	  	//var id = mongoose.Types.ObjectId(req.body.del);

	  	req.app.db.models.Org.findByIdAndRemove(req.params.id, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});

	  },
	  rem : function(req , res , next)
		{
			console.log(req.body);

		  	req.app.db.models.Org.update(
		  		 {_id : mongoose.Types.ObjectId(req.body.id)},
		  		 {$pull : {resp : {resp: req.body.resp} }}, 
		  		 function(err , info){
		  			if(err)
		  			{
		  				return next(err);
		  			}
		  			res.status(200).json(info);
		  		});

		  },
	  
	  remk : function(req , res , next)
		{
			console.log(req.body);

		  	req.app.db.models.Org.update(
		  		 {_id : mongoose.Types.ObjectId(req.body.id)},
		  		 {$pull : {kpis : {kpis: req.body.kpis} }}, 
		  		 function(err , info){
		  			if(err)
		  			{
		  				return next(err);
		  			}
		  			res.status(200).json(info);
		  		});

		  }

		  
}
module.exports = org;
