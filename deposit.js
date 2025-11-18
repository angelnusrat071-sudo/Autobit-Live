// dashboard/js/deposit.js
import { auth } from "../../js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const API = "https://api.autobit.live";

async function submitDepositRequest(user, payload){
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

document.getElementById("depositBtn").addEventListener('click', async ()=>{
  const coin = document.getElementById("coinSelect").value;
  const network = document.getElementById("networkSelect").value;
  const amount = Number(document.getElementById("amountInput").value);
  const txid = document.getElementById("txidInput").value || "";

  if(!amount || amount <= 0){
    alert("Please enter a valid amount");
    return;
  }

  const user = auth.currentUser;
  if(!user){ alert("Not authenticated"); return; }

  const payload = { type: "deposit", coin, amount, network, txid, status: "pending" };

  const json = await submitDepositRequest(user, payload);
  if(json.success || json._id){
    alert("Deposit request submitted. Admin will verify.");
    window.location.href = "transactions.html";
  } else {
    alert(json.error || "Submit failed");
  }
});

onAuthStateChanged(auth, user=>{
  if(!user) window.location.href = "../index.html";
});
