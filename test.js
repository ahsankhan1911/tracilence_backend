
var path = require('path');
require('dotenv').load({
    path: path.join(__dirname, './.env'),
    silent: true
  });

const jwtHandler = require('./lib/jwt/index')
var emailHandler = require('./lib/email')


emailHandler.sendVerificationEmail("ahsankhan1911@gmail.com", 'Tracilence', "verification code is 123")
// jwtHandler.generateAccessToken({null: "undefined"}).then((result) => {

//   console.log("NEW TOKEN ", result)

// }).catch((err) => {
//   console.error(err)
// })


//  jwtHandler.verifyAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIiwiaWF0IjoxNTUxMTczMzg1LCJleHAiOjE1NjY3MjUzODV9.aUJKTf3GzgaQ35aE5hU4PjPEVz2OqkLzvL6kDNHBa4g').then((result) => {

//   console.log(result)
//  }).catch((err) => {

//   throw new Error(err)
//  })

// jwtHandler.verifyAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yzg2MWI3NDYwNTM0MzE0NzliNWJiNTUiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJpYXQiOjE1NTIyOTQ3MDQsImV4cCI6MTU1MjI5NDcxNH0.T72x9tucO8bUP8d7C6lxOl_AR0U8MJeRnfnUx3mlou8').then((result) => {

//     console.log(result)
//    }).catch((err) => {
//   console.log("CAME HERE")

//   switch(err.message) {

//     case "jwt expired":
//       return console.log("Token is expired")

//     case "invalid token": 
//     return console.log("Your Token is invalid")

//     default:
//       return console.log("Something Went Wrong !")
//   }
//    })