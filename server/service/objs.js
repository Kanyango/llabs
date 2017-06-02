'use strict';
var mongoose = require('mongoose');


var objs = {

	create : function(req , res , next)
	{
		var fieldsToSet = 
		{
			user        : req.payload._id,
			desc        : req.body.desc,
			start_date  : req.body.start_date,
			end_date    : req.body.end_date
		}
		req.app.db.models.Obj.create(fieldsToSet,
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
			name      : req.body.name,
			email     : req.body.email,
			phone     : req.body.phone,
			website   : req.body.website,
			address   : req.body.address,
			city      : req.body.city,
			street    : req.body.street,


		};

		var options = { new : true };

		req.app.db.models.Supplier.findByIdAndUpdate(
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
		
		req.app.db.models.Obj.find({user: req.payload._id},
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
		req.app.db.models.Obj.findById(id,
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

	  	req.app.db.models.Obj.findByIdAndRemove(req.params.id, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  	req.app.db.models.Strategy.remove({wide : mongoose.Types.ObjectId(req.params.id)}, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  		})
	  	req.app.db.models.Target.remove({wide : mongoose.Types.ObjectId(req.params.id)}, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			
	  		})
	  	req.app.db.models.Reports.remove({wide : mongoose.Types.ObjectId(req.params.id)}, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			
	  		})
	  			res.status(200).json(info);

	  		});

	  }
	  
}
module.exports = objs;
