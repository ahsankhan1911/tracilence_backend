'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdminSchema = new Schema({
    username : {type: String, unique: true, required: true},
    password: {type : String, required: true},
    role : {type : String , enum: ['Administrator', 'Moderator'], required:true}
},{
  versionKey:false,
  timestamps:true
});


module.exports = mongoose.model('Admin', AdminSchema);

