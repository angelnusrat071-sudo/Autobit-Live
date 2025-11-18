import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYR8filgj4UdQ-6FV5DeHzGhA-mQxjBiY",
  authDomain: "autobit-live.firebaseapp.com",
  projectId: "autobit-live"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.adminLogin = async function() {
    let email = document.getElementById("email").value;
    let pass  = document.getElementById("password").value;

    try {
        const user = await signInWithEmailAndPassword(auth, email, pass);
        const token = await user.user.getIdToken();

        // Save token
        localStorage.setItem("adminToken", token);

        window.location.href = "dashboard.html";

    } catch (err) {
        document.getElementById("msg").innerText = "Login Failed";
    }
}
