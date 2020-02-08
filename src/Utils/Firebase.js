import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyCi1Poja1IYFNpkTSpeyubJLT8ZvgfY8c0",
  authDomain: "dspot-65c89.firebaseapp.com",
  databaseURL: "https://dspot-65c89.firebaseio.com",
  projectId: "dspot-65c89",
  storageBucket: "dspot-65c89.appspot.com",
  messagingSenderId: "445443567887",
  appId: "1:445443567887:web:a8787524f36fd97eef0e7a",
  measurementId: "G-0MGJTNB98E"});   

export default firebase;
export const auth = firebase.auth();
export const database = firebase.database(); 