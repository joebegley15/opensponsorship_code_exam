var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://joe:pa$$word@ds241019.mlab.com:41019/jb_sports_db')


//Get All Athletes
router.get('/athletes', function(req,res,next){
	db.athletes.find(function(err,athletes){
		if(err){
			res.send(err);
		}
		res.json(athletes);
	})
})

//Get Single Athlete
router.get('/athletes/:id', function(req,res,next){
	db.athletes.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,athlete){
		if(err){
			res.send(err);
		}
		res.json(athlete);
	})
})

// Register Athlete
router.post('/athlete',function(req,res,next){
	var athlete = req.body;
	if(!athlete.firstName || (athlete.isDone + '')){
		res.status(400);
		res.json({
			"error" : "Incomplete or bad data."
		})
	} else {
		db.athletes.save(athlete,function(err,athlete){
			if (err) {
				res.send(err);
			}
			res.json(athlete);
		})
	}
})

// Delete User

router.delete('/athletes/:id', function(req,res,next){
	db.athletes.remove({_id: mongojs.ObjectId(req.params.id)},function(err,athlete){
		if(err){
			res.send(err);
		}
		res.json(athlete);
	})
})

// Update User

router.put('/athletes/:id', function(req,res,next){
	var task = req.body;
	var info = ['firstName','lastName','dob','nationality','location','association','team','gender','sports','about','interests','charities','social','pets','drinks','married','profPicUrl'];
	var updTask = {};

	for (var i = 0; i < info.length; i++) {
		if (task.info[i]) {
			updTask.info[i] = task.info[i]; 
		}
	}

	if(!updTask){
		res.Status(400);
		res.json({
			'error':'Bad data'
		})
	} else {
		db.athletes.update({_id: mongojs.ObjectId(req.params.id)},function(err,athlete){
			if(err){
				res.send(err);
			}
			res.json(athlete);
		})
	}
})

module.exports = router;