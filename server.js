const express = require('express')
const app = express()
const session = require('express-session')
require('dotenv').config()

const mongoose = require('mongoose');
const cors = require('cors')

app.use(express.json());

//Port
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

// Setup Cors middleware
const whitelist = ['http://localhost:3000', 'https://project-3-notspotify-frontend.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
      console.log('this is the origin.............', origin) 
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
app.use(cors(corsOptions))

// SETUP mongoose
mongoose.connect(`${process.env.MONGODBURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// set up listeners to monitor your DB connection
const db = mongoose.connection;
db.once('open', () => console.log('Mongoose connected...'));
db.on('error', (error) => console.log(error.message));
db.on('disconnected', () => console.log('Mongoose disconnected...'));



//sessions
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.status(403).json({msg:"Please Log In"})
  }
}


//controllers
app.use('/notspotify', require('./controllers/notSpotifyController'))
app.use('/users', require('./controllers/users'))
app.use('/sessions',require('./controllers/sessions'))