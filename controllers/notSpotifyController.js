const express = require('express')
const notspotify = express.Router()
const playlistModel = require('../models/playlist')



//POST ROUTE
notspotify.post('/',(req, res) => {
    playlistModel.create(req.body, (error, createPlaylist) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else {
            res.status(201).json(createPlaylist)
        }
    })

})

//INDEX ROUTE
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

//DELETE ROUTE
notspotify.delete('/:id', (req, res) => {

    playlistModel.findByIdAndDelete(req.params.id, (error, deletedPlaylist) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else if (deletedPlaylist === null) {
            res.status(404).json({ message: 'Playlist id not Found' })
        }
        else {
            res.status(200).json({ message: `Playlist ${deletedPlaylist.name} deleted successfully` ,currentUser:req.session.currentUser})
        }
    })
})

//UPDATE ROUTE
notspotify.put('/:id', (req, res) => {

    playlistModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedPlaylist) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else {
            res.status(200).json({
                message: `${updatedPlaylist.id} Playlist updated successfully`,
                data: updatedPlaylist
            })
        }
    })
})

//SEED ROUTE
notspotify.get('/seed', (req, res) => {
    playlistModel.create([
        {
            name: "Hype",
            songs: [
                {
                    name: "imagine if",
                    artist: "gnash"
                },
                {
                    name: "Just Lose It",
                    artist: "Eminem"
                },
                {
                    name: "B.O.B",
                    artist: "Outkast"
                },
                {
                    name: "Despacito",
                    artist: "Luis Fonsi"
                },
                {
                    name: "Garota Nacional",
                    artist: "Skank"
                }
            ]
        },
    ], (error, data) => {
        if (error) {
            console.log(error)
        }
        res.redirect('/notspotify')
    })
})

//API ROUTE
getSongFromAPI = async (event) => {
    event.preventDefault()
    try {
      console.log(this.state.rootURL + this.state.apiKey + this.state.query + 'Rivers%20and%20Roads')
      const response = await fetch(this.state.rootURL + this.state.apiKey + this.state.query + 'Rivers%20and%20Roads')
      const parseData = await response.json()
      console.log(parseData)
      this.setState({
        querySongs: parseData,
        queryURL: ''
      })
    } catch(err) {
      console.log(err)
    }
  }





module.exports = notspotify
