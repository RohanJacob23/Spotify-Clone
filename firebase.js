import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCceIp****Jp3zbobYqcV_EefHQ0U23J_o",
  authDomain: "todos-31072.firebaseapp.com",
  projectId: "todos-31072",
  storageBucket: "todos-31072.appspot.com",
  messagingSenderId: "494703082670",
  appId: "1:494703082670:web:711****7f533807ebe813f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export Firebase so it can be used elsewhere
const FireBase = firebase.initializeApp(firebaseConfig);
export default FireBase;
