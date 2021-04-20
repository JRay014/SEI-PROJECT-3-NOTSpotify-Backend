const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

//Session NEW Route
router.get('/new',(req,res)=>{
  res.send(400).json({currentUser: req.session.currentUser})
})

//USER LOGIN ROUTE( CREATE SESSION ROUTE)
router.post('/',(req,res)=>{
  User.findOne({username: req.body.username},(err,foundUser)=>{
    if (err) {
      res.send(err)
    }else {
      if (foundUser) {

        if (bcrypt.compareSync(req.body.password,foundUser.password)) {
          //login user and creat session
          req.session.currentUser = foundUser
          res.redirect('/notspotfy')

        }else {
          res.send('<h1>invalid password</h1>')
        }

      }else {
        res.send("<h1>user not found</h1>")
      }
    }
  })
})

//logout route
router.delete('/',(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
})


module.exports = router;
