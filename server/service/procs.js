'use strict';
var mongoose = require('mongoose');


var procs = {

	create : function(req , res , next)
	{
		
		var fieldsToSet =
		{
			user        : req.payload._id,
			owner       : req.body.owner,
	        header      : req.body.header
		}

		req.app.db.models.Procedure.create(fieldsToSet, 
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
		var id = req.body.id;
		console.log(req.body);

		req.app.db.models.Procedure.update(
			  {_id : mongoose.Types.ObjectId(id)},
			  {$addToSet: {procs : req.body}},
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
		
		req.app.db.models.Procedure.find({user: req.payload._id},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	single_remove : function(req , res , next)
	{
		console.log(req.body);
		var id = mongoose.Types.ObjectId(req.body.id);
		req.app.db.models.Procedure.update({_id : id},
		    {$pull : {procs  :{name: req.body.name}}},
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

	  	req.app.db.models.Procedure.findByIdAndRemove(req.params.id, 
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
module.exports = procs;
