// dashboard/js/dashboard.js
import { auth } from "../../js/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const API_BASE = "https://api.autobit.live"; // ensure this matches your backend domain

function ensureAuthRedirect(user){
  if(!user){
    // not logged in -> go to root
    window.location.href = "../index.html";
  }
}

// common auth check for all dashboard pages
onAuthStateChanged(auth, (user)=>{
  ensureAuthRedirect(user);
});

// logout buttons (multiple)
document.querySelectorAll('[id^="logoutBtn"]').forEach(b=>{
  b.addEventListener('click', async ()=>{
    await signOut(auth);
    window.location.href = "../index.html";
  });
});

// also provide global function
window.logout = async function(){
  await signOut(auth);
  window.location.href = "../index.html";
};

// highlight active sidebar link (simple)
(() => {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar nav a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
})();
