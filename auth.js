import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.registerUser = function(){
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;

    createUserWithEmailAndPassword(auth,email,pass)
    .then(()=>{
        alert("Account created!");
        window.location.href="dashboard/wallet.html";
    })
    .catch(err=>alert(err.message));
}

window.loginUser = function(){
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPass").value;

    signInWithEmailAndPassword(auth,email,pass)
    .then(()=>{
        window.location.href="dashboard/wallet.html";
    })
    .catch(err=>alert(err.message));
}
