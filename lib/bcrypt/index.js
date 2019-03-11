var bcrypt = require('bcrypt');

exports.encryptPassword = function(password, callback) {
   bcrypt.genSaltSync(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hashSync(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};

exports.comparePassword = function(plainPass, hashword, callback) {
 return  bcrypt.compareSync(plainPass, hashword, function(err, isPasswordMatch) {   
         if(err) {
           throw err
         }
         return isPasswordMatch;
   });
};