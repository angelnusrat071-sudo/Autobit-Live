// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYR8filgj4UdQ-6FV5DeHzGhA-mQxjBiY",
  authDomain: "autobit-live.firebaseapp.com",
  projectId: "autobit-live",
  storageBucket: "autobit-live.firebasestorage.app",
  messagingSenderId: "691040367677",
  appId: "1:691040367677:web:231f673616283bea75a654",
  measurementId: "G-N7CLMJ0G00"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
