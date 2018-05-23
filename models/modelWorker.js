/**
 * http://usejsdoc.org/
 */
 var crypto=  require("crypto"),
	 algorithm = 'aes-256-ctr';
	  
 

 function encrypt(text,pwkey){
	var  algorithm = 'aes-256-ctr';
  var cipher = crypto.createCipher(algorithm,pwkey);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function randomkey()
{
	
	var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
	
	
}
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var workerSchema = new Schema({
 name: {type:String},
 mobile:{type:String}
  /*
  created:{type:Date,default:Date.now},*/

  
});
/*
userSchema.pre("save",function(next,done){
	this.pkey=randomkey(),
	
	this.password=encrypt(this.password,this.pkey),
	next();
});*/

workerSchema.plugin(mongoosePaginate);
// the schema is useless so far
// we need to create a model using it
 modelWorker = mongoose.model('Worker', workerSchema);
 
// make this available to our users in our Node applications
module.exports = modelWorker;
module.exports.decrypt=function (text,pwkey){
	 algorithm = 'aes-256-ctr';
  var decipher = crypto.createDecipher(algorithm,pwkey);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}
module.exports.encrypt=encrypt;
module.exports.randomkey=randomkey;