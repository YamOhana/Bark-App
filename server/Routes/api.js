const express = require('express')
const router = express.Router()
import firebase from 'firebase'

const database = firebase.database();

let userId = firebase.auth().currentUser.uid

router.post('/user', (req, res) => {
    database.ref(userId).set({
        id: userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        smoker: req.body.smoker,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
        adress: req.body.adress,
        gender: req.body.gender,
        hours: [],
        friends: [],
        messeges: [],
        dogs: []
    });
})

//return all users
router.get('/users', (req, res) => {
    return firebase.database()
})

//get map from google API
router.get('/map', (req, res) => {
})
//get all online users
router.get('/profile', (req, res) => {
})
//update profile
router.put('/user-info', (req, res) => {
})
//update dog profile
router.put('/dog-info', (req, res) => {
})
//liking an owner-dog profile, in order to save him in friends list
router.put('/liked-user', (req, res) => {
})
//update friends list, adding friend
router.put('/friends', (req, res) => {
})
//update friends list, deleting friend
router.delete('/dogProfile', (req, res) => {
})
module.exports = router
