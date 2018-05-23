/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
//Schema.plugin(mongoosePaginate);
// create a schema
var userSchema = new Schema({
  mukhda: String,
 movieyear:{type:Number,required:true},
  moviename: {type:String, required:true},
  translation:{type:String, required:true},
  level:{type:Number},
  anagram: {type:String},
  mask:{type:String},
  reserve:{type:String}
  /*
  created:{type:Date,default:Date.now},*/

  
});
userSchema.plugin(mongoosePaginate);
// the schema is useless so far
// we need to create a model using it
 Song = mongoose.model('Song', userSchema);

// make this available to our users in our Node applications
module.exports = Song;