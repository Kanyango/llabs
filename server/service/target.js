'use strict';
var mongoose = require('mongoose');


var target = {

	create : function(req , res , next)
	{
		var fieldsToSet = 
		{
			user       : req.payload._id,
			strat      : req.body.strat,
			wide       : req.body.obj,
			owner      : req.body.owner,
			desc       : req.body.desc,
			kpi        : req.body.kpi,
			measure    : req.body.measure,
			value      : req.body.value,
			start_date : req.body.start_date,
			end_date   : req.body.end_date
		}
		
		req.app.db.models.Target.create(fieldsToSet, 
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
		console.log(req.body);

		var id = req.body._id;
		var fieldsToSet = 
		{
			desc      : req.body.desc,
			owner      : req.body.owner,
			kpi       : req.body.kpi,
			measure   : req.body.measure,
			start_date: req.body.start_date,
			end_date   : req.body.end_date,
			value      : req.body.value
		};

		var options = { new : true };

		req.app.db.models.Target.findByIdAndUpdate(
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
		
		req.app.db.models.Target.find({user: req.payload._id},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	pery_del : function(req , res , next)
	{	
		console.log(req.body);
		var id = req.body.id;

		 req.app.db.models.Target.update(
		 	  {_id: mongoose.Types.ObjectId(id)},
	                  {$pull : {pery: req.body}},
	                  function(err, info)
	                  {
	                  	if(err)
					    	{
					    		return next(err);
					    	}
					    res.status(200).json(info);
	                  });

	},
	multiple : function(req , res , next)
	{
		
		req.app.db.models.Target.find({wide: mongoose.Types.ObjectId(req.params.id)},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	strats : function(req , res , next)
	{
		
		req.app.db.models.Target.find({strat : mongoose.Types.ObjectId(req.params.id)},
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
		req.app.db.models.Target.findById(id,
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

	  	req.app.db.models.Target.findByIdAndRemove(req.params.id, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});
	  	req.app.db.models.Reports.remove({obj : mongoose.Types.ObjectId(req.params.id)}, 
	  		function(err){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			
	  		})

	  },
	  pery : function(req , res , next)
		{
		    var id = mongoose.Types.ObjectId(req.body.id);

		  	req.app.db.models.Target.update({_id : id},
		  	  {$addToSet: {pery: req.body}}, 
		  		function(err , info){
		  			if(err)
		  			{
		  				return next(err);
		  			}
		  			res.status(200).json(info);
		  			
		  		});

		  }
	  
}
module.exports = target;
