const mongoose = require('mongoose')
const { Schema, model } = mongoose

const playlistSchema = new Schema({
    name: { type: String, required: true },
    songs: { type: Array }
})

module.exports = model('Playlist', playlistSchema)