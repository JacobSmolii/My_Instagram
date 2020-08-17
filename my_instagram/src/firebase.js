import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyByTV2G9LxvLrJcQyI033VvXPyUsKsre_Q",
  authDomain: "my-instagram-b4a57.firebaseapp.com",
  databaseURL: "https://my-instagram-b4a57.firebaseio.com",
  projectId: "my-instagram-b4a57",
  storageBucket: "my-instagram-b4a57.appspot.com",
  messagingSenderId: "651005477460",
  appId: "1:651005477460:web:ca221afed5d398f44023c1",
  measurementId: "G-5GV6KGR08C"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

