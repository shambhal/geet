
/**
 * Module dependencies.
 */

/*
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/geet';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;*/
var express = require('express')
, session=require('express-session')
  , routes = require('./routes')
, paginate = require('express-paginate')
   , admin = require('./routes/admin')
   ,cg=require('./routes/cg')
  
    ,userg=require('./routes/userg')
	,fileupload=require('express-fileupload')
	/*,formidable=require('formidable')*/
     , geet = require('./routes/geet'),
	 passport =require("passport-http"),
	 bstrategy= require('passport-http').BasicStrategy,
	 acl=require('acl'),
	 cors = require('cors'),
	
     hint=require('./routes/hints')
  , user = require('./routes/user')
  , customer = require('./routes/customer')
   , worker = require('./routes/worker')
  , http = require('http')
   , expressValidator = require('express-validator')
  ,mongoose=require('mongoose')
  , path = require('path');

var app = express();
var cnf=require('./config');
//var settings=require('./settings');
//sc=settings.set();
fs=require('fs');
thumb = require('node-thumbnail').thumb;
rts=require('./rts');

app.set('language','english');
lang=require('./lang');
lang.set('english');

app.set('lang',lang);
var env=process.env.NODE_ENV;
 if(env=='production')
 {
	 var temp=require('./config.js');
	 
	 
 }
else{
	
	var temp=require('./config_local.js');
}
settings=temp.set(__dirname);

console.log(process.env.NODE_ENV);

app.set('rts',rts);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());

 formidable = require('formidable');
app.use(fileupload());

//app.use(formidable());

app.use(express.logger('dev'));

app.use(expressValidator());

app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//console.log(conf.host);
var mongoDB = settings.dbhost;
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection
app.set('db',db);
function logger(req,res,next)
{
	
 //console.log(" in acl exports");
	// console.log(req);
	 
	  if(req.session.username)
	  {
		 
		  
		  
	  }
}


var MongoStore = require('connect-mongo')(session);

app.use(session({secret:'moherangdola',resave:false,saveUninitialized:false,
  store: new MongoStore({
 
	mongooseConnection: db
  }),
}));
app.use(paginate.middleware(10, 50));
app.use(app.router);
app.use(allowCrossDomain);
var whitelist = ['http://localhost:8100', 'http://example2.com','http://localhost:8100/'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  console.log(res.header);
  req.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    req.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
   // req.setHeader('Access-Control-Allow-Credentials', true);
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true ,optionsSuccessStatus: 200} // reflect (enable) the requested origin in the CORS response
  }else{
	  console.log(false);
    corsOptions = { origin: true } // disable CORS for this request
	 corsOptions = { origin: true} // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


//app.all('/geet/*',acl.middleware);
//app.all('/hints/*',acl.middleware);
/*
 imgfolder=path.join(__dirname+'/public/images/');

app.set('IMG_FOLDER',imgfolder);
*/
//app.use(acl.middleware);
app.set(paginate,paginate);
app.get('/', routes.index);
//app.get('/install/',install.index);
app.get('/users', user.list);
app.get('/geet',geet.home);
app.get('/geet/list',geet.list);
app.get('/geet/autocompletem/:mname',geet.autocompletem);
app.delete('/geet/delete/:songid',geet.delete);
app.get('/geet/get/:songid',geet.getSong);
app.post('/geet/remove',geet.remove);
//app.get('/geet/lista',geet.lista);
app.get('/geet/retrieve',geet.retrieve);
app.put('/geet/save',geet.save);
app.put('/hints/save',hint.save);
app.put('/hints/update',hint.update);
app.get('/geet/add',geet.add);

app.get('/geet/edit/:songid',geet.edit);
app.put('/geet/update',geet.update);
app.get('/hints/:songId',hint.index);
app.get('/hint/getData/:hintid',hint.getData);
app.delete('/hint/delete/:hintid',hint.delete);
/*app.get('/hint/list/:songid',hint.hlist);*/
app.get('/hints/retrieve/:songid',hint.retrieve);
app.get('/admin/login', admin.login);
app.post('/admin/loginv',admin.loginv);
//app.get('/admin/*', admin.index);
/*app.get("/userg/add",userg.add);*/
app.get("/userg/list",userg.list);
app.get("/user/list",user.list);
app.post("/userg/remove",userg.remove);
app.post("/user/remove",user.remove);
app.get("/userg/get/:groupid",userg.edit);

app.get("/permissiond/",routes.permissiond);

app.get("/user/get/:userid",user.edit);
app.get("/userg/retrieve",userg.retrieve);
app.get("/user/retrieve",user.retrieve);
app.get("/user/getUGs/",user.getugs);
app.put('/userg/save',userg.save);
app.put('/user/save',user.save);

app.put('/cg/save',cg.save);
app.get("/cg/list",cg.list);
app.post("/cg/remove",cg.remove);
app.get("/cg/retrieve",cg.retrieve);
app.get("/cg/get/:groupid",cg.edit);
app.get("/logout",routes.logout);
app.get("/customer/list",customer.list);
app.post("/customer/remove",customer.remove);
app.get("/customer/get/:userid",customer.edit);
app.get("/customer/retrieve",customer.retrieve);
app.get("/worker/list",worker.retrieve);
app.get("/customer/getUGs/",customer.getugs);
app.put("/customer/save",customer.save);
app.post("/worker/signup",worker.signup);
app.get("/demo/",geet.dummy);
//app.get("/teams/",geet.teams);
//app.get("/judges/",geet.judges);
//app.post("/customer/login",customer.login);
//9824941798
app.options("/customer/login",cors(corsOptionsDelegate), function (req, res, next) {
	//console.log(req.accountInfo);
 // res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
});
app.options("/customer/getq",cors(corsOptionsDelegate), function (req, res, next) {
	//console.log(req.accountInfo);
  //res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
 //res.json(next());
return customer.getq();
});

 app.options("/worker/signup",cors(corsOptionsDelegate), function (req, res, next) {
	//console.log(req.accountInfo);
  //res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
 //res.json(next());
return worker.signup();
});
 app.options("/worker/list",cors(corsOptionsDelegate), function (req, res, next) {
	//console.log(req.accountInfo);
  //res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
 //res.json(next());
return worker.retrieve();
});
   
 /*  
   
   function countch(string)
   {
	   //2309-2324
	   //2325-2361
	   //2392-2399
	   var c=0;
	   for(i=0;i<string.length;i++)
	   {
		   
		   charc=string.charCodeAt(i);
		   console.log(charc);
		   charc1=charc*1;
		    if(charc1>=2309 && charc1<=2361 )
				c++;
			 if(charc1>=2392 && charc1<=2399 )
				 c++;
			 if(charc==2400 || charc==2401)
				 c++;
		   
	   }
	   return c;
	   
   }
//var str="काल";
//var str="कांग्रेस";
var str="कीर्ति";
var str="कौस्तुभ";
console.log(countch(str));*/
function allowCrossDomain(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  var origin = req.headers.origin;
  if (_.contains(app.get('allowed_origins'), origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}
app.post("/customer/login",customer.login);
app.get('/customer/getq',customer.getq);
app.get("/customer/test",customer.test);
app.post("/customer/upload",customer.upload);
http.createServer(app).listen(app.get('port'), function(){
 // console.log('Express server listening on port ' + app.get('port'));
});
