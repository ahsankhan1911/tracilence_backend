'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeoSchema = new Schema({
  _id:false,
  type:{type:String, default:'Point'},
  coordinates:{type:[Number], index:'2dsphere'}
});

var PointSchema = new Schema({
  pointName: { type: String, required: true },
  pointNumberPlate: { type: String, required: true },
  pointLocation : GeoSchema,
  pointTrackedByUsers :[{
    _id:false,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dateOfTrack:{type:Number},
}]
  
},{
  versionKey:false,
  timestamps:true
});


module.exports = mongoose.model('Point', PointSchema);

