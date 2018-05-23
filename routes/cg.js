
/*
 * GET users listing.
 */

exports.edit=function(req,res)
{
	
	json=lang.load('/customerg/list');
	console.log(req.params.groupid);
	
	require('../models/modelcustomerg');
		 customergModel.find({_id:req.params.groupid},function(err,record){
		
		 if(!err)
		 {
			
			res.json(record[0]);
			 
		 }
		
	});
	
	
	
}
exports.remove=function(req,res)
{
	
	
	arr=userarr=req.body.usergs;
	require('../models/modelcustomerg');
	for(i=0;i<userarr.length;i++)
	{
		
		//customergModel.deleteById(customerg[i]);
		customergModel.findByIdAndRemove(arr[i],function(err ,todo){
			
		});
	}
	res.json({status:1});
	
}
exports.save=function(req,res)
{
	require('../models/modelcustomerg');
	
	
	
	 if(req.body.id)
	 {
		condition={_id:req.body.id};
	customergModel.update(condition,req.body,function(err,result)
	{
		if(!err)
		{
			
			res.json({'status':1});
			
		}
		
	});
	
	
	
	return;
	 }
	
	customerg=new customergModel(req.body);
	customerg.save(function(err,result){
		if(err)
			{
			
			
			msg='error Occured'+err.message;
			res.status(200).json({errflag:1,errors:[msg]});
			}
		 if(result)
			 {
			 console.log("added");
			 msg='Added Successfully';
			 res.status(200).json({sflag:1,msg:msg});
			 }
		 
	});
	
}
exports.list=function(req,res)
{
	
	json=lang.load('/customerg/list');
	//var rights=[{route:'geet/add'},{route:'geet/list'}];
	//rigths=rts;
	//rights=app.get("rights");
	
	bread=[];
	var jsarr=['javascript/common/common.js'];
	bread.push({'href':'/geet/','text':'home'})
	json.arights=[];
	json.mrights=[];
	json.rights=rts.get();
	json.breadcrumbs=bread;
	json.jsarr=jsarr;
	res.render('customerg/customerglist',json);
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
	require('../models/modelcustomerg');
	
	
	json=lang.load('/customerg/list');
	/*
	json.csarr=['autocomplete/angular-material.min.css'];
	json.jsarr=['/angular/angular-route.min.js',
	'angular/angular-animate.js','angular/angular-aria.min.js','angular/angular-messages.min.js','autocomplete/angular-material.min.js'
	
	
	];*/
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	
	 customergModel.paginate(params,{page:current_page,limit:10,sort:{_id:-1} ,select:'name  _id'},function (error,cursor)
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