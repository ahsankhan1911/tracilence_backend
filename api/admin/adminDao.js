const Admin = require('./adminModel'),
    Exception = require('../../lib/api-model/Exception'),
    randomstring = require('randomstring'),
    bcryptHandler = require('../../lib/bcrypt'),
    jwtHandler  =require('../../lib/jwt'),
    Point = require('../point/pointModel'),
    User = require('../user/userModel');


 function adminLogin (adminData) {
        return Admin.findOne({username: adminData.username}).then( (adminEmail) =>{

            if(adminEmail) {

                if(adminEmail.isActive === false)
                 throw new Exception(1, "The Account is blocked !")


                 let password  =  bcryptHandler.comparePassword(adminData.password, adminEmail.password)
                 if(password) {
                      let payload = {
                            _id: adminEmail._id,
                            username: adminEmail.username,
                            role: adminEmail.role
                      }

                      return jwtHandler.generateAccessToken(payload).then((result) => {

                           return {"username": adminEmail.username, "role": adminEmail.role, "accessToken": result}
                      })
                 }

                 else {
                    throw new Exception(3, "Invalid password")
                 }
            }

            else {
                throw new Exception(2, "Invalid username")
            }

        })
}

function getPoints () {
    return Point.find({}, {_id:1, createdAt:1,pointName:1,pointNumberPlate:1,pointLocation:1,pointTrackedByUsers:1})
}

function getUsers () {
    return User.find({}, {_id:1,name:1,email:1,profilePicture:1,age:1,phone:1})
}

module.exports = {
    adminLogin,
    getPoints,
    getUsers
}