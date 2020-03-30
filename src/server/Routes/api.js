const express = require('express')
const router = express.Router()
const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDWpOziiBhAmxB-mylJys5a4WZsOeJzwLY",
    authDomain: "bark-hackathon.firebaseapp.com",
    databaseURL: "https://bark-hackathon.firebaseio.com",
    projectId: "bark-hackathon",
    storageBucket: "bark-hackathon.appspot.com",
    messagingSenderId: "895115782826",
    appId: "1:895115782826:web:adb0624854db0cd762fed3",
    measurementId: "G-WD5K5VC19E"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

       
fire.auth().signInWithEmailAndPassword("admin@me.com", "123456").then((u) => {
    console.log("connected");
    
}).catch((error) => {
    console.log(error);
});

const database = fire.firestore();

// let userId = fire.auth().currentUser.uid

router.post('/user', (req, res) => {
    console.log(req.body);
    
    database.collection("users").doc(req.body.userId).set({
        id: req.body.userId,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        smoker: req.body.smoker,
        phoneNum: req.body.phoneNum,
        address: req.body.address,
        gender: req.body.gender,
        hours: [],
        friends: [],
        messeges: [],
        dogs:[req.body.dog],
        requests:[]
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

})

//return all users
router.get('/users', async (req, res) => {
    const snapshot = await database.collection("users").get()
    res.send(snapshot.docs.map(doc => doc.data()))
    // database.collection("users").get().then(function(querySnapshot) {
    //     // querySnapshot.forEach(function(doc) {
    //     //     // doc.data() is never undefined for query doc snapshots
    //     //     console.log(doc.id, " => ", doc.data());
    //     // });
    //     console.log(querySnapshot);
        
    //     // res.send(querySnapshot)
    // });

})

//get map from google API
router.get('/map', (req, res) => {
})
//get all online users
router.get('/user/:id', async (req, res) => {
    database.collection("users").doc(`${req.params.id}`).get().then(function(doc) {

        if (doc.exists){
            user = doc.data();
            res.status(200).send(user)
          } else {
            res.status(400).send("No User")
          }}).catch(function(error) {
            console.log("Error getting document:", error)
          });
      
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
