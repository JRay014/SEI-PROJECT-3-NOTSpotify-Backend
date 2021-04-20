const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

//User New Route
router.get('/',(req,res)=>{
  User.find().then(users => res.json(users))
  .catch(err=>res.status(400).json('Error: '+ err))
})

//User Register Route
router.post('/register',(req,res)=>{
  req.body.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
  User.create(req.body,(err,createdUser)=>{
    if(err){
      console.log(err)
    }else {
      res.status(200).json('User created')
    }
  })
})
module.exports = router
