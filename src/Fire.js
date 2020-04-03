import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDWpOziiBhAmxB-mylJys5a4WZsOeJzwLY",
    authDomain: "bark-hackathon.firebaseapp.com",
    databaseURL: "https://bark-hackathon.firebaseio.com",
    projectId: "bark-hackathon",
    storageBucket: "bark-hackathon.appspot.com",
    messagingSenderId: "895115782826",
    appId: "1:895115782826:web:adb0624854db0cd762fed3",
    measurementId: "G-WD5K5VC19E", 
    messagingSenderId: '895115782826'
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//for chat
firebase.firestore().settings({
    timestampsInSnapshots: true
})


export default fire