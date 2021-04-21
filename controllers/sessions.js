const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

//Session NEW Route
router.get('/new',(req,res)=>{
  res.send(400).json({currentUser: req.session.currentUser})
})




module.exports = router;
