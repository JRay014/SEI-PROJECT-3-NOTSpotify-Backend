const mongoose = require ('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema ({
  firstName: {type:String, require:true},
  username: {type:String, require:true, unique:true},
  password: String
})

const User = model('User',userSchema)

module.exports = User
