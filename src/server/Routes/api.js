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


// fire.auth().createUserWithEmailAndPassword("ilai@me.com", "123456")

fire.auth().signInWithEmailAndPassword("admin@me.com", "123456").then((u) => {
    console.log("connected");

}).catch((error) => {
    console.log(error);
});

const database = fire.firestore();

// Create new User
router.post('/user', (req, res) => {
    console.log(req.body);

    database.collection("users").doc(req.body.userId).set({
        id: req.body.userId,
        onwalk: false,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        smoker: req.body.smoker,
        phoneNum: req.body.phoneNum,
        address: req.body.address,
        gender: req.body.gender,
        hours: req.body.hours,
        friends: [],
        messeges: [],
        dogs: [req.body.dog],
        requests: []
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

})

//return all users
router.get('/users', async (req, res) => {
    const snapshot = await database.collection("users").get()
    res.send(snapshot.docs.map(doc => doc.data()))
})


//get all online users
router.get('/user/:id', async (req, res) => {
    database.collection("users").doc(`${req.params.id}`).get().then(function (doc) {

        if (doc.exists) {
            user = doc.data();
            res.status(200).send(user)
        } else {
            res.status(400).send("No User")
        }
    }).catch(function (error) {
        console.log("Error getting document:", error)
    });
})

//add dog to user
router.post('/addDog/:id', (req, res) => {
    database.collection("users").doc(`${req.params.id}`).update({
        dogs: firebase.firestore.FieldValue.arrayUnion(req.body)
    }).then(function (doc) {

        if (doc.exists) {
            user = doc.data();
            res.status(200).send(user)
        } else {
            res.status(400).send("Failed")
        }
    }).catch(function (error) {
        console.log("Error getting document:", error)
    });
})
//update friends list, adding friend
router.put('/addFriend/:currentUserId/:friendId', (req, res) => {
    database.collection("users").doc(`${req.params.currentUserId}`).update({
        friends: firebase.firestore.FieldValue.arrayUnion(req.params.friendId)
    }).then(function () {
        database.collection("users").doc(`${req.params.friendId}`).update({
            friends: firebase.firestore.FieldValue.arrayUnion(req.params.currentUserId)
        }).then(function () {
            res.end()
        })
    }).catch(function (error) {
        console.log("Error getting document:", error)
    });
})
//update request list, friend request
router.put('/requestFriend/:currentUserId/:friendId', (req, res) => {
    database.collection("users").doc(`${req.params.friendId}`).update({
        requests: firebase.firestore.FieldValue.arrayUnion(req.params.currentUserId)
    }).then(function () {
        res.end()
    }).catch(function (error) {
        console.log("Error getting document:", error)
    });
})
//get map from google API
router.get('/map', (req, res) => {
})
//update profile
router.put('/user/:id/:fieldName', (req, res) => {
    database.collection("users").doc(`${req.params.id}`).update({
        [req.params.fieldName]:req.body
    }).then(function (doc) {

        if (doc.exists) {
            user = doc.data();
            res.status(200).send(user)
        } else {
            res.status(400).send("No User")
        }
    }).catch(function (error) {
        console.log("Error getting document:", error)
    });
})
//update dog profile
router.put('/dog-info', (req, res) => {
    //can't update element in array, only remove or add to array
})
//liking an owner-dog profile, in order to save him in friends list
router.put('/liked-user', (req, res) => {
})

//update friends list, deleting friend
router.delete('/deleteFriend/:currentUserId/:friendId', (req, res) => {
    database.collection("users").doc(`${req.params.currentUserId}`).update({
        friends: firebase.firestore.FieldValue.arrayRemove(req.params.friendId)
    }).then(function (doc) {
        
        if (doc.exists) {
            user = doc.data();
            res.status(200).send(user)
        } else {
            res.status(400).send("Failed")
        }
    }).catch(function (error) {
        console.log("Error getting document:", error)
    });
})

// returns all posts
router.get('/posts', async (req, res) => {
    const snapshot = await database.collection("posts")
    .orderBy("time", "desc")
    .get()
    res.send(snapshot.docs.map(doc => doc.data()))
})

// create new post
router.post('/post', (req, res) => {
    console.log(req.body);

    database.collection("posts")
    .add(req.body)
    .then(function () {
        console.log("Document successfully written!");
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });

})

//Go to work
router.put('/walk/:id', (req, res) => {
    console.log(req.body.data)
    database.collection("users").doc(`${req.params.id}`).update({
        onwalk: req.body.data
    }).then(function () {
        console.log(req.params.id)
        req.body.data ? console.log(`go out`) : console.log(`go back`)
        res.end()
    }).catch(function (error) {
        console.log("Error While trying to walk:", error)
    });
})


module.exports = router
