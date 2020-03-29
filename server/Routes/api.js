const express = require('express')
const router = express.Router()


//get map from google API
router.get('/map', (req, res) =>{



})


//get all online users
router.get('/onlineUser', (req, res) =>{


})

//update profile
router.put('/user-info', (req, res)=>{


})

//update dog profile
router.put('/dog-info', (req, res) =>{

})

//liking an owner-dog profile, in order to save him in friends list
router.put('/liked-user', (req, res) =>{


})

//update friends list, adding friend
router.put('/friends', (req, res) =>{


})


//update friends list, deleting friend
router.delete('/dogProfile', (req, res) =>{


})


module.exports = router
