'use strict';
var mongoose = require('mongoose');


var inno = {

	create : function(req , res , next)
	{
		var fieldsToSet = 
		{
			user        : req.payload._id,
			action      : req.body.action,
			kpi         : req.body.kpi,
			acc         : req.body.acc,
			target      : req.body.target,
			measure     : req.body.measure,
			start_period: req.body.start_period,
			end_period  : req.body.end_period
		}
		req.app.db.models.Innovation.create(fieldsToSet , 
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
		var id = mongoose.Types.ObjectId(req.body._id);

		var fieldsToSet = 
		{
			action      : req.body.action,
			kpi         : req.body.kpi,
			acc         : req.body.acc,
			target      : req.body.target,
			measure     : req.body.measure,
			start_period: req.body.start_period,
			end_period  : req.body.end_period
		};

		var options = { new : true };

		req.app.db.models.Innovation.findByIdAndUpdate(id , 
			 fieldsToSet,options,
		     function(err , docs){
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
		
		req.app.db.models.Innovation.find({},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	benefit :  function(req , res , next)
	{
		console.log(req.body);
		req.app.db.models.Product.update({_id : mongoose.Types.ObjectId(req.body.id)},
			{$addToSet: {benefit: req.body.rows}}, 
			function(err , info){
				if(err)
				{
					console.log('Could not push');
				}

				res.status(200).json(info);
			})	 
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
	eval : function(req , res , next)
	{
		var id = req.body.id;
		var fieldsToSet = 
		{
			evaluate : req.body.evaluate
			
		};

		var options = { new : true };

		req.app.db.models.Innovation.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },
	remove : function(req , res , next)
	{

	  	req.app.db.models.Innovation.findByIdAndRemove(req.params.id, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});

	  },
	  single_remove : function(req , res , next)
		{
            console.log(req.body);

		  	req.app.db.models.Customer.update(
		  		{_id: mongoose.Types.ObjectId(req.body.id)}, 
		  		{$pull: { bens :  {ben: req.body.ben, rate : req.body.rate}  }},
		  		function(err , info){
		  			if(err)
		  			{
		  				return next(err);
		  			}
		  			res.status(200).json(info);
		  		});

		  }
	  
}
module.exports = inno;
