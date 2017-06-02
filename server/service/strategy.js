'use strict';
var mongoose = require('mongoose');


var strategy = {

	create : function(req , res , next)
	{
		var fieldsToSet =
		{
			user       : req.payload._id,
			wide       : req.body.wide,
	        desc       : req.body.desc
		}
		req.app.db.models.Strategy.create(fieldsToSet, 
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
		var fieldsToSet = 
		{

			desc      : req.body.desc

		};

		var options = { new : true };

		req.app.db.models.Strategy.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },
	returnd: function(req , res , next)
	{
		var id = req.body._id;
		var fieldsToSet = 
		{
			return_date : req.body.return_date,
			overdue     : req.body.overdue
		};

		var options = { new : true };

		req.app.db.models.Supplier.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
		    	req.app.db.models.Car.update({plate_no: req.body.vehicle} , 
			    {status :'available'}, options,
			function(err , cust){
				if(err)
				{
					console.log('Could not push');
				}
			})
			 res.status(200).json(docs);
			});
	  },
	read : function(req , res , next)
	{
	
		req.app.db.models.Strategy.find({user: req.payload._id},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			}); 
	},
	all : function(req , res , next)
	{
		
		req.app.db.models.Strategy.find({},
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

		req.app.db.models.Strategy.findById(id,
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
	  	console.log(req.params);
	  	req.app.db.models.Strategy.findByIdAndRemove(
	  		mongoose.Types.ObjectId(req.params.id), 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			req.app.db.models.Target.remove({wide : mongoose.Types.ObjectId(req.params.id)}, 
	  		function(err){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			
	  		})
	  	req.app.db.models.Reports.remove({wide : mongoose.Types.ObjectId(req.params.id)}, 
	  		function(err){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			
	  		})
	  			res.status(200).json(info);
	  		});

	  }
	  
}
module.exports = strategy;
