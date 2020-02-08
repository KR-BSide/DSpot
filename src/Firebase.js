import * as firebase from 'firebase';

let database;
let config = {
    apiKey: "AIzaSyCi1Poja1IYFNpkTSpeyubJLT8ZvgfY8c0",
    authDomain: "dspot-65c89.firebaseapp.com",
    databaseURL: "https://dspot-65c89.firebaseio.com",
    projectId: "dspot-65c89",
    storageBucket: "dspot-65c89.appspot.com",
    messagingSenderId: "445443567887",
    appId: "1:445443567887:web:a8787524f36fd97eef0e7a",
    measurementId: "G-0MGJTNB98E"}


export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
        database = firebase.database();  
        const auth = firebase.auth();      
  //익명로그인
  auth.signInAnonymously().catch(function(error) {
      console.log(error.code);
      console.log(error.mesagge);
  });

  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      // ...
      console.log(user);
      
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });

}