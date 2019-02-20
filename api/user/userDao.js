const User = require('./userModel'),
      Exception = require('../../lib/api-model/Exception'),
      randomstring  = require('randomstring');


var checkIfEmailExist = (userData) => {
    let regex = new RegExp(userData.email.replace(userData.email, `^${userData.email}$`), 'i')
    let query = {email : {'$regex':regex}}
    return User.findOne(query).then((result) => {
        if(result) { return true;}
        else  { return false;}
    }).catch((error) => {
        throw error
    })
}

var userLogin = (userData) => {
    //Email Auth
    let regex = new RegExp(userData.email.replace(userData.email, `^${userData.email}$`), 'i')
    return User.findOne({ email: { '$regex': regex } }).then((userOnEmai) => {
        if (userOnEmai) {
            //Password Auth
            let regex2 = new RegExp(userOnEmai.email.replace(userOnEmai.email, `^${userOnEmai.email}$`), 'i')
            return User.findOne({ email: { '$regex': regex2 }, password: userData.password })
                .then((userOnPass) => {
                    if (userOnPass) {
                        if(userOnPass.isActive === false) {
                            throw new Exception(3, "You have been blocked by Admin")
                        }
                        //Adding new accessToken 
                        let regex3 = new RegExp(userOnPass.email.replace(userOnPass.email, `^${userOnPass.email}$`), 'i')

                        let accessToken = randomstring.generate()
                        return User.findOneAndUpdate({ email: { '$regex': regex3 }, password: userData.password }, { '$push': { accessToken: accessToken } }, { new: true })
                            .then((loggedInUser) => {
                                return { user: loggedInUser, accessToken: accessToken }
                            })
                    }
                    else {
                        throw new Exception(2, "Password does not match");
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
  return checkIfEmailExist(userData).then((result) => {
       if(result) {
        throw new Exception(1, "User already exist with this email");
       }
       return User.create(userData);
    })
  
}

var userEditProfile = (userData) => {
    let set = {}
    let update = {'$set': set}
    let options = {select: {_id: 0 ,name:1, email:1,age:1, gender:1,profilePicture:1,phone:1}, new: true}

    if(userData.profilePicture)
      set.profilePicture = userData.profilePicture

    if(userData.name)
      set.name = userData.name

    if(userData.age)
      set.age = userData.age

    if(userData.phone)
      set.phone = userData.phone

    return User.findByIdAndUpdate(userData._id, update,options)

}

var userDetails = (userData) => {
    return User.findById(userData._id, {_id:0 ,name:1, email:1,age:1, gender:1,profilePicture:1,phone:1})
}

var authenticateUserAccesstoken = (userData) => {
    console.log(userData.accessToken)
    let query = {accessToken :  userData.accessToken}
    return User.findOne(query)
}


module.exports = {
    checkIfEmailExist,
    createUser,
    userLogin,
    userEditProfile,
    userDetails,
    authenticateUserAccesstoken,
}