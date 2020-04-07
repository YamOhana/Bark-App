import firebase from 'firebase';

const firebaseConfig = {
    apiKey: '''',
    authDomain: "bark-hackathon.firebaseapp.com",
    databaseURL: "https://bark-hackathon.firebaseio.com",
    projectId: "bark-hackathon",
    storageBucket: "bark-hackathon.appspot.com",
    messagingSenderId: "895115782826",
    appId: ''',
    measurementId: "G-WD5K5VC19E", 
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//for chat
// firebase.firestore().settings({
//     timestampsInSnapshots: true
// })


export default fire