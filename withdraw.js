// dashboard/js/withdraw.js
import { auth } from "../../js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const API = "https://api.autobit.live";

async function submitWithdraw(user, payload){
  const token = await user.getIdToken();
  const res = await fetch(`${API}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Authorization":"Bearer "+token
    },
    body: JSON.stringify(payload)
  });
  return res.json();
}

document.getElementById("withdrawBtn").addEventListener('click', async ()=>{
  const coin = document.getElementById("withdrawCoin").value;
  const amount = Number(document.getElementById("withdrawAmount").value);
  const address = document.getElementById("withdrawAddress").value.trim();

  if(!amount || amount <= 0 || !address){
    alert("Please enter amount and recipient address");
    return;
  }

  const user = auth.currentUser;
  if(!user){ alert("Not authenticated"); return; }

  const payload = { type: "withdraw", coin, amount, address, status: "pending" };

  const json = await submitWithdraw(user, payload);
  if(json.success || json._id){
    alert("Withdraw request submitted. Admin will verify.");
    window.location.href = "transactions.html";
  } else {
    alert(json.error || "Submit failed");
  }
});

onAuthStateChanged(auth, user=>{
  if(!user) window.location.href = "../index.html";
});
