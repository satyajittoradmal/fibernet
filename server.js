var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

var index =  require('./routes/index');
var tasks =  require('./routes/tasks');
var login =  require('./routes/login');

var port = 3000;

var app = express();

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//here is the magic
app.use(function(req,res,next){
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST');
        res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
});

//url mapping
app.use('/',index);
app.use('/login',login);
app.use('/api',tasks);

app.listen(port,function(){
    console.log('Server started at '+port);
});
//lol
