const Admin = require('./adminModel'),
    Exception = require('../../lib/api-model/Exception'),
    randomstring = require('randomstring'),
    bcryptHandler = require('../../lib/bcrypt'),
    jwtHandler  =require('../../lib/jwt')


 function adminLogin (adminData) {
        return Admin.findOne({username: adminData.username}).then(async (adminEmail) =>{

            if(adminEmail) {

                if(adminEmail.isActive === false)
                 throw new Exception(1, "The Account is blocked !")



                 let password  = await bcryptHandler.comparePassword(adminData.password, adminEmail.password)

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




module.exports = {
    adminLogin,
  
}