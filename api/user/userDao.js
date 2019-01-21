const User = require('./userModel'),
      Exception = require('../../lib/api-model/Exception'),
      randomstring  = require('randomstring');


var checkIfEmailExist = (userData) => {
    let query = {email : {'$regex':userData.email, '$options':'-i'}}
    return User.findOne(query).then((result) => {
        if(result) { return true;}
        else  { return false;}
    }).catch((error) => {
        throw error
    })
}

var userLogin = (userData) => {
    //Email Auth
   return User.findOne({email : {'$regex':userData.email, '$options':'-i'}}).then((userOnEmai) => {
       if(userOnEmai) {
           //Password Auth
           return User.findOne({email : {'$regex':userOnEmai.email, '$options':'-i'},password: userData.password})
           .then((userOnPass) => {
               if(userOnPass) {
                   //Adding new accessToken 
                   let accessToken = randomstring.generate()
                   return User.findOneAndUpdate({email : {'$regex':userOnEmai.email, '$options':'-i'},password: userData.password}, {'$push':{ accessToken: accessToken  }}, {new: true})
                             .then((loggedInUser) => {
                                 return {user: loggedInUser, accessToken: accessToken}
                             })
               }
               else {
                throw new Exception(1, "Password does not match");
               }
           })
       }
       else {
       throw new Exception(1, "No user found on this email");
       }

   }).catch((error) => {
       throw error;
   })
}

var createUser = (userData) => {
  return User.create(userData);
}

var authenticateUserAccesstoken = (userData) => {
    console.log(userData.accessToken)
    let query = {accessToken :  userData.accessToken}
    return User.findOne(query)
}


module.exports = {
    createUser,
    checkIfEmailExist,
    authenticateUserAccesstoken,
    userLogin
}