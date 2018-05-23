var tlang='';
module.exports.load=function(fname){
	p=__dirname+'/lang/'+tlang+'/'+fname;
	//console.log(p);
	f=require(p);
	//console.log("returning f");
	//console.log(f);
	return f;
	 };
module.exports.set=function(language)
{
	tlang=language;

}

