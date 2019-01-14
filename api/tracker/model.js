'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var AdminSchema = new Schema({
  username: {
    type: String,
    default: 'admin'
  },
  password: {
    type: String,
    default: 'admin'
  },

});




module.exports = mongoose.model('Admin', AdminSchema);


// module.exports = mongoose.model('Uploads', UploadsSchema);

