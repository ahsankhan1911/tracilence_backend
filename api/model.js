'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  pageName: {
    type: String,
    unique: true
  },
  pageUrl: {
    type: String,
    unique: true
  },
  pageContent: {
    type: Schema.Types.ObjectId,
    ref: 'Content'
  },
  removable: {
    type: Boolean,
    default: true
  },
  styles: {
    type: Schema.Types.ObjectId,
    ref: 'Style'
  }

});

var ContentSchema = new Schema({

  url: {
    type: Schema.Types.ObjectId,
    ref: 'Url'
  },
  title: {
    type: String,
    default: "Your Page title here"

  },
  description: {
    type: String,
    default: "Your Page description here"
  },
  topContent: {
    type: String,
    default: "<div></div>"
  },
  bottomContent: {
    type: String,
    default: "<div></div>"
  },
});

var StyleSchema = new Schema({
  style: {
    type: String
  },


});

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

var LogKeySchema = new Schema({
  logInKey: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    expires: 86400,
    default: Date.now
  }

})

// var UploadsSchema = new Schema({
//   mediaName: {
//     type: String
//   },
//   mediaPath:  {
//     type: String
//   },

//   mediaType : {
//     type: String
//   },
//   mediaSize : {
//     type: String
//   }
// })

var BlogSchema = new Schema({
  title : {type: String},
  blogImage : {type: String , default: 'Title Image Url Here'},
  blogPath: {type : String },
  description : {type: String , default: 'Description Here'},
  createdAt: {type : Date},
  updatedAt : {type: Date , default : null},
  topContent : {type : String, default: 'Blog Content Here'},
})

var TorrentSchema = new Schema({
  infoHash: {type : String},
  userIp : {type : String, default: null}
})


module.exports = mongoose.model('Content', ContentSchema);
module.exports = mongoose.model('Url', UrlSchema);
module.exports = mongoose.model('Style', StyleSchema);
module.exports = mongoose.model('Admin', AdminSchema);
module.exports = mongoose.model('LogKey', LogKeySchema);
module.exports = mongoose.model('Blog', BlogSchema);
module.exports = mongoose.model('TorrentInfo', TorrentSchema);


// module.exports = mongoose.model('Uploads', UploadsSchema);

