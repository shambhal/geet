
/*
 * GET users listing.
 */
 exports.test=function(req,res)
 {json=lang.load('/customer/list');
 console.log(settings);
 sc=settings;
 k='bootstap/b.css';
 m=k.search('/[\.css|\.gif]/');
 
 if(m>-1)
 {
	 
	console.log("found at "+m) ;
	 
 }
	mod= require('../models/modelthumb');
	mod(sc);
	 mod.create('DSC_0084.jpg');
	 res.render('customer/add',json);
 }
 function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
 function randomise(mukhda)
 {
	 
	words= mukhda.split(" ");
	wordss=shuffle(words);
	string='';

	for(i=0;i<wordss.length;i++)
	{
		 string=string+ ' '+wordss[i];
		
		
	}
	return string.slice(1);
 }
function getHints(songid)
 {
	 require("../models/modelHint");
	

	 query= HintModel.find({"songid":songid}).sort({sort_order:1});
	
	query.exec(function(err ,hints) {
		
		 if(!err){
			// song.captions=captions;
			
			// console.log(song);
		console.log(hints);
		return hints;
		 }
		 if(err)
		 {
			 
			 console.log(err);
			 
		 }
	});
	 
 }
function maska(str)
{
	
	stra=str.split("-");
	arr=[];
	for(i=0;i<stra.length;i++)
	{
		//console.log(stra[i].length);
		arr.push(stra[i].length);
		
	}
	return arr;
}
function mask2(str,ana)
{index=0;
arr=ana.split(" ");
fin=[];
	for(i=0;i<str.length;i++)
	{
		 if(str[i]!='-')
		 {
			fin.push(arr[index]) ;
			index++;
		 }	
		else{
			
			fin.push("-");
		}
		
		
	}
	console.log(fin);
	return fin;
}
 exports.getq=function (req,res)
 {
	 songid='5ac7156787373707b8d6cd44';
	 var temp;
	require('../models/Song'); 
		require('../models/modelHint'); 
	var CryptoJS = require("crypto-js/");
	//	require('../models/modelWorker'); 
	Song.find({_id:songid},'_id translation mask anagram').exec(function(err,record){
		
		 if(!err)
		 {
			
			//console.log(record[0]);
			temp=record[0].toObject();
			//temp.maska=maska(record[0].mask);
			//temp.anagram=record[0].anagram.split(" ");
			temp.fimask=mask2(record[0].mask,record[0].anagram);
			//console.log(temp);
			//temp.anagram=randomise(temp.anagram);
			  
			   query1= HintModel.find({"songid":songid},'_id mask reserve level hint sort_order').sort({sort_order:1});
	
	query1.exec(function(errs ,hints) {
		//console.log(hints);
		//console.log(errs);
		 if(!errs)
		 {nh=[];
	 /*
			 for(i=0;i<hints.length;i++)
			 {
				 
				 console.log(hints[i].hint);
				// nh[i]=CryptoJS.AES.encrypt(hints[i].hint,'A12345');
				 var ciphertext = CryptoJS.AES.encrypt(hints[i].hint.toString(),'551207');
				  var ciphertext = CryptoJS.AES.encrypt("lappu",'551207').toString();
				  var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
				 console.log(ciphertext);
				// nh[i]=modelWorker.encrypt(hints[i].hint,'551207');
			 }*/
			 temp.hints=hints;
			// console.log(nh);
			 res.json(temp);
		 }
		 else
		 {
			 
			res.json(temp) ;
			 
		 }
		
	})
			//console.log(temp);
			
			
		//res.render('test/hint',{song:temp});
		 }
		
	});
	 
	 
 }
exports.testo=function(req,res)
{json=lang.load('/customer/list');
//console.log(sc);
//console.log(__dirname(__dirname));
//var p=path.join(__dirname, '/uploads');
//console.log(p);
//console.log(app.get('IMG_FOLDER'));


/* working fine
thumb({
	source:'/wamp64/www/geet/public/images/DSC_0084.jpg',
	width:100,
	destination:'/wamp64/www/geet/public/icache/',
	
});*/
//var path=require('./fs');
s1=sc.DIR_CACHE+'catalog/chumpa/';
console.log(s1);
ff='catalog/chumpa';
a=ff.split("/");
var p=sc.DIR_CACHE;
for(i=0;i<a.length;i++)
{
	folder=a[i];
	console.log(folder);
	 p=p+'/'+folder
	 if(fs.existsSync(p))
	 {
		 
		 console.log("dir_cahe");
		 
	 }
	 else{
		 fs.mkdir(p);
		// 
	 }
	
}
	res.render('customer/add',json);
	
}
exports.edit=function(req,res)
{
	require('../models/modelCustomer');
	json=lang.load('/customer/list');
	mod= require('../models/modelthumb');
	
	var rec={};
	mod(sc);
	var pp;
		 customerModel.find({_id:req.params.userid},function(err,record){
		
		 if(!err)
		 {
			var pw=customerModel.decrypt(record[0].password,record[0].pkey);
			//console.log(pw);record
			
			record[0].password=pw;
			rec=record[0].toObject();
			//pp=rec.toObject();
			/*
			_.map(rec,function(v,k){
					 
					 pp[k]=v;
					 
				 });
			//rec.thumb={};*/
			
			 if(record[0].pic==''|| record[0].pic==undefined)
			 {
				 rec.thumb=sc.HTTP_CACHE+mod.create('no_image.png');
				
				
				 
			 }
			 else{
				 
				 rec.thumb=sc.HTTP_CACHE+mod.create(record[0].pic);
				 
			 }
			res.json(rec);
			 
		 }
		
	});
	
	
	
}
exports.upload=function(req,res)
{ var path = require('path');

json={};
if (!req.files)
    return res.status(400).send('No files were uploaded.');
	
	
	console.log(req.files['uploads']);
	let sample=req.files.uploads;
	
	
	
	
	
	
	
	
	//console.log(sample);
	
	
	sample.mv(path.join(sc.DIR_IMAGE,sample.name), function(err) {
    if (err)
	{
      return res.status(500).send(err);
	  
	}
 else{
	 js={};
	 mod= require('../models/modelthumb');
	mod(sc);
	 thumb=sc.HTTP_CACHE+mod.create(sample.name);
	 js.success=1;
	 js.filename=sample.name;
	 js.thumb=thumb;
    res.json(js);
	
 }
  });
  

/*
  
var path = require('path');
var formidable=require('formidable');
var fs = require('fs');
    var form = new formidable.IncomingForm();
	form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');
  console.log(form.uploadDir);
  form.on('file', function(field, file) {
	  console.log(file);
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });
   form.parse(req);
   //console.log(req);
   console.log(form);*/
}


exports.login=function(req,res)
{
	console.log("in loginv");
	console.log(req.body);
	console.log(req.options);

	validateUser(req.body,req,res);
	

};
function validateUser(params,req,res)
{//acl=require('acl');
console.log(params);
	username=params.username;
	console.log(params.password);
	require('../models/modelCustomer');
	
	customerModel.find({email:username},function(err,result){
		 if(err)
		 {
			 console.log(err);
			
			 
		 }
		 if(result)
		 {
			 console.log(result);
			 record=result[0];
			  if(!record)
			  {
				  
				// res.render('admin/login',{errormsg:'Invalid Username /Password'});
				res.json({ret:0});
			//return 0;  
				  
			  }
			
			pwd= customerModel.decrypt(record.password,record.pkey);
			console.log(pwd);
			console.log(record._id+' is record d');
			if(pwd==params.password)
			{
				
				console.log("right password");
				//req.session.token="gibber";
				//res.redirect("/geet/");
				res.json({ret:1});
				//return 1;
				 
			}
			else{
				
				console.log("invalid password");
				// res.render('admin/login',{errormsg:'Invalid Username /Password'});
				// return -1;
				 res.json({ret:-1});
			}
		 }
		 else{
			 // res.render('admin/login',{errormsg:'Invalid Username /Password'});
			//return 0;
			res.json({ret:0});
			 
		 }
		
		
		
	});
	
}

exports.remove=function(req,res)
{
	require('../models/modelCustomer');
	console.log(req.body);
	arr=userarr=req.body.users;
	
	for(i=0;i<userarr.length;i++)
	{
		
		//userModel.deleteById(user[i]);
		customerModel.findByIdAndRemove(arr[i],function(err ,todo){
			
		});
	}
	res.json({status:1});
	
}
exports.save=function(req,res)
{
	require('../models/modelCustomer');
	
	var form = new formidable.IncomingForm();
	var flds;;
	
form.parse(req, function(err, fields, files) {

 if(err)
 {
	 
	res.status(200).json({errflag:1,errors:err});
	 return;
 }
	flds=fields;
	//console.log(fields);
  // ...


	 if(flds.id)
	 {
		console.log("flds id"+flds.id);
		condition={_id:flds.id};
		vals=flds;
		pkey=customerModel.randomkey();
		
		pw=customerModel.encrypt(flds.password,pkey);
		
		vals=flds;
		vals.pkey=pkey;
		vals.password=pw;
		console.log("vals are");
		console.log(vals);
	customerModel.update(condition,vals,function(err,result)
	{
		if(!err)
		{
			
			res.json({'status':1});
			
		}
		
	});
	
	
	
	return;
	 }

	customer=new customerModel(flds);
	customer.save(function(err1,result){
		if(err1)
			{
			
			
			msg='error Occured'+err.message;
			console.log(err);
			res.status(200).json({errflag:1,errors:[msg]});
			}
		 if(result)
			 {
			 console.log("added");
			 msg='Added Successfully';
			 res.status(200).json({sflag:1,msg:msg});
			 }
		 
	});
	});	
	
}
exports.list=function(req,res)
{
	
	json=lang.load('/customer/list');
	json.breadcrumbs=[];
	require('../models/modelCustomer');
	//require('acl');
	//console.log(getPin());
	
	//getting customer model
	/*
	json['ugs']=[];
	require('../models/modelCustomerg');
	 customergModel.find({},'name ',function(err,record){
		
		 if(!err)
		 {
			console.log(record);
			console.log("above record");
			json.ugs=record;
			 
		 }
		 else{
			 console.log("error occured");
			 console.log(err);
			 
		 }
	 });
	 console.log("json is json");
		 console.log(json);*/
	res.render('customer/customerlist',json);
}
exports.getugs=function(req,res)
{
	ugs=[];
	require('../models/modelCustomerg');
	 customergModel.find({},'name',function(err,record){
		
		 if(!err)
		 {
			console.log(record);
			console.log("above record");
			ugs=record;
			res.json(record); 
		 }
		 else{
			 console.log("error occured");
			 console.log(err);
		 }	 
		 });
	
	//res.json(ugs);
}
exports.retrieve=function (req,res)
{
	
	
	var spage= require('spaginate');
	console.log("in retrieve");
	//console.log(req);
	//url='a.php&k=1&c=7';
	//ur=url.replace(/&{1}/,'?');
	//console.log(ur);
	filter_movie=req.query.filter_movie|| null;
	filter_year=req.query.filter_year || null;
	current_page=req.query.page||1;
	var params={};
	
	 if(filter_movie)
		 params.moviename=filter_movie;
	 if(filter_year)
		 params.movieyear=filter_year;
	var mongoosePaginate = require('mongoose-paginate');
	require('../models/modelCustomer');
	
	
	json=lang.load('/customer/list');
	/*
	json.csarr=['autocomplete/angular-material.min.css'];
	json.jsarr=['/angular/angular-route.min.js',
	'angular/angular-animate.js','angular/angular-aria.min.js','angular/angular-messages.min.js','autocomplete/angular-material.min.js'
	
	
	];*/
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	
	 customerModel.paginate(params,{page:current_page,limit:10,sort:{_id:-1} ,select:'name  _id email'},function (error,cursor)
		{
			
			 if(!error)
			 {
				pageobj=spage.page({totpages:cursor.pages,current_page:current_page,limit:10},req); 
				 
			 }
			 cursor.pagination={};
			 cursor.pagination.pages=pageobj.pages;
			 cursor.pagination.next=pageobj.next,
			 cursor.pagination.prev=pageobj.prev,
			 
			 //console.log(cursor);
			//json.arr=cursor.docs;
			//json.pagination=cursor.pagination;
			console.log(cursor);
			 res.json(cursor);
		});
	
	
	
	
	
}