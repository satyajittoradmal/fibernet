var express = require('express');
var router =  express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://john:1234567@ds161041.mlab.com:61041/fibernet');//('mongodb://akrick:akrick@ds147072.mlab.com:47072/fibernet');

router.get('/tasks',function(req,res,next){
   db.tasks.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
   })
});
router.get('/users',function(req,res,next){
   db.users.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
   })
});

router.get('/tasks/:id',function(req,res,next){
   db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
   })
});

router.post('/tasks',function(req,res,next){
    var task=req.body;
    db.tasks.save(task,function(err,task){
        if(err){
            res.send(err);
        }else{
            res.json(task);
        }   
   });
});

module.exports = router;