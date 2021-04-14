const express = require('express')
const app = express()
const PORT = 3003
const mongoose = require('mongoose');
const cors = require('cors')

app.use(express.json());

// Setup Cors middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))

// SETUP mongoose
mongoose.connect('mongodb://localhost:27017/notspotfy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// set up listeners to monitor your DB connection
const db = mongoose.connection;
db.once('open', () => console.log('DB connected...'));
db.on('error', (error) => console.log(error.message));
db.on('disconnected', () => console.log('Mongoose disconnected...'));

//controllers

app.use('/notspotify', require('./controllers/notSpotifyController'))


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})