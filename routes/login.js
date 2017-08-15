

var express = require('express');
var router =  express.Router();
var mongojs = require('mongojs');
var cors = require('cors')

var collections = ["users", "tasks"]
var db = mongojs('mongodb://john:1234567@ds161041.mlab.com:61041/fibernet');

router.post('/login',cors(),function(req,res,next){
    var loginDetails=req.body;
       
   db.users.find({userName:loginDetails.username,password:loginDetails.password},function(err,user){//,password:loginDetails.password     {userName:loginDetails.username},
        if(err){
            res.set(200);
            res.send(err);
        }else{
            res.json(user);
        }   
   });
   /*db.tasks.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
   })*/
});

module.exports = router;