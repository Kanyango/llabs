'use strict';
var mongoose = require('mongoose');


var story = {

	create : function(req , res , next)
	{
		console.log(req.body);

		var fieldsToSet = 
		{
			desc : req.body.desc
		}

		req.app.db.models.Story.create(fieldsToSet,
           function(err ,  docs){

				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	create_v : function(req , res , next)
	{
		console.log(req.body);

		var id = mongoose.Types.ObjectId(req.body._id);

		var fieldsToSet = 
		{
			vision : req.body.vision
		}

		var options = {new : true};

		req.app.db.models.Story.findByIdAndUpdate(id,
			fieldsToSet , options , 
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

		req.app.db.models.Story.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },
	rem_story : function(req , res , next)
	{

		req.app.db.models.Biz.update(
			{_id: mongoose.Types.ObjectId(req.body._id)}
			 , {story: ''} ,
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
		
		req.app.db.models.Story.find({},
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
		
		
	  	var id = mongoose.Types.ObjectId(req.params.id);

	  	var fieldsToSet = { desc : null};

	  	var options     = { new : true }; 

	  	req.app.db.models.Story.findByIdAndUpdate(id,
		  	fieldsToSet, options , 
		  		function(err , info){
		  			if(err)
		  			{
		  				return next(err);
		  			}
		  			res.status(200).json(info);
		  		});

	  }
	  
}
module.exports = story;
