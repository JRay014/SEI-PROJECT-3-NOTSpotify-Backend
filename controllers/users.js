const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

// //User New Route
// router.get('/l',(req,res)=>{
//   User.find().then(users => res.json(users))
//   .catch(err=>res.status(400).json('Error: '+ err))
// })

//USER LOGIN ROUTE( CREATE SESSION ROUTE)
router.post('/login',(req,res)=>{
  User.findOne({username: req.body.username},(err,foundUser)=>{
    if (err) {
      res.send(err)
    }else {
      if (foundUser) {

        if (bcrypt.compareSync(req.body.password,foundUser.password)) {
          //login user and creat session
          req.session.currentUser = foundUser
          res.status(200).json(foundUser)

        }else {
          res.status(404).json({error: 'User not found'})
        }
      }else {
        res.status(400).json({error: err})
      }
    }
  })
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

//logout route
router.delete('/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.status(200).json({ msg: "Logout Successful"})
  })
})
module.exports = router
