const Admin = require('../../api/admin/adminModel')
const mongoose = require('mongoose')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

const bcrypthandler = require('../bcrypt')


console.log("Starting create Admin Script...")
console.log()
console.log()

console.log("Connecting to MongoDB Database...")
console.log()


mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/tracilenceDB", {useMongoClient: true}).then(( result) => {

      console.log("Connected To:" ,{
          Database: result.name,
          Port : result.port,
          Host: result.host
      })
      return;
}).then(() => {
    console.log()

     readline.question(`Enter Administrator Username: `, (name) => {
        
        console.log(`You entered ${name} !`)
        console.log()

             readline.question(`Now enter Administrator Password: `, (pass) => {
        
            console.log()


             console.log("Creating Administrator...")
            console.log()

           bcrypthandler.encryptPassword(pass, (err, hash ) => {
               if(err)
               throw new Error(err)

               return Admin.create({username: name, password: hash, role: 'Administrator'}).then((result) => {

                console.log("Admin created with username", result.username)
                console.log()
                console.log("Exiting....")
                console.log()
    
                mongoose.disconnect()
                process.exit()
              })
           })
     
           readline.close()

         
          })

      })
      
})
.catch((err) => {

   throw new Error(err)

})








