const express = require('express')

const notspotify = express.Router()
const playlistModel = require('../models/playlist')


//post route
notspotify.post('/', (req, res) => {
    playlistModel.create(req.body, (error, createPlaylist) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else {
            res.status(201).json(createPlaylist)
        }
    })

})

//Index route

notspotify.get('/', (req, res) => {

    playlistModel.find({}, (error, foundPlaylists) => {
        if (error) {
            res.status(400).json(error)
        }
        else {
            res.status(200).json(foundPlaylists)
        }
    })
})

//Delete route
notspotify.delete('/:id', (req, res) => {

    playlistModel.findByIdAndDelete(req.params.id, (error, deletedPlaylist) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else if (deletedPlaylist === null) {
            res.status(404).json({ message: 'Playlist id not Found' })
        }
        else {
            res.status(200).json({ message: `Playlist ${deletedPlaylist.name} deleted successfully` })
        }
    })
})



module.exports = notspotify