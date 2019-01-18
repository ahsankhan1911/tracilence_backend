'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var GeoSchema = new Schema({
//   _id:false,
//   type:{type:String, default:'Point'},
//   coordinates:{type:[Number], index:'2dsphere'}
// });

var UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePicture: { type: String },
  gender: { type: String },
  age: { type: Number },
  name: { type: String },
  // location : GeoSchema

},{
  versionKey:false,
  timestamps:true
});


module.exports = mongoose.model('User', UserSchema);

