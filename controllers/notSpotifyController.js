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

// UPDATE ROUTE
notspotify.put('/:id', (req, res) => {

    playlistModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedPlaylist) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else {
            res.status(200).json({
                message: `Holiday ${updatedPlaylist.id} updated successfully`,
                data: updatedPlaylist
            })
        }
    })
})

//SEED ROUTE
notspotify.get('/seed',(req,res)=>{
  playlistModel.create([
    {
      name: "Hype",
      songs:["imagine if","Just Lose It","B.O.B","Despacito","Garota Nacional"]
    },
    {
      name: "Moody",
      songs:["Poison & Wine","Heartbreak Warfare","Not Over You","Melhor Eu Ir"]
    },
    {
      name: "Sounds of the Earth",
      songs:["wind","rain","sandstorm","morning dew","crackling fire"]
    },
  ], (error,data)=>{
    if (error){
      console.log(error)
    }
    res.redirect('/notspotify')
  })
})





module.exports = notspotify
