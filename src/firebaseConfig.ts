import * as firebase from 'firebase'

const config =  {
  apiKey: "AIzaSyCOg-2m8WDC1ypizDKJj4CeBl_0Y_ezAJU",
  authDomain: "sunnytacos-2b8c9.firebaseapp.com",
  databaseURL: "https://sunnytacos-2b8c9.firebaseio.com",
  projectId: "sunnytacos-2b8c9",
  storageBucket: "sunnytacos-2b8c9.appspot.com",
  messagingSenderId: "120440021214",
  appId: "1:120440021214:web:821b3fdb9157f460cbe24f",
  measurementId: "G-0Q95ZHK1T6"
}

firebase.initializeApp(config)

firebase.analytics()

const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };