// dashboard/js/transactions.js
import { auth } from "../../js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const API = "https://api.autobit.live";

async function loadTransactions(user){
  const token = await user.getIdToken();
  const res = await fetch(`${API}/transactions`, {
    headers: { "Authorization":"Bearer "+token }
  });
  const data = await res.json();

  const body = document.getElementById("txBody");
  body.innerHTML = "";

  if(!data || data.length === 0){
    body.innerHTML = `<tr><td colspan="5" class="center small">No transactions yet</td></tr>`;
    return;
  }

  data.forEach(tx=>{
    body.innerHTML += `
      <tr>
        <td>${tx.type}</td>
        <td>${tx.coin || '-'}</td>
        <td>${tx.amount || '-'}</td>
        <td style="color:${tx.status==='approved'?'#7CFC00': tx.status==='pending'?'#FFD700':'#FF6B6B'}">${tx.status}</td>
        <td>${new Date(tx.date || tx.createdAt || tx.time).toLocaleString()}</td>
      </tr>
    `;
  });
}

onAuthStateChanged(auth, user=>{
  if(!user) return;
  loadTransactions(user);
});

document.getElementById("refreshTx")?.addEventListener('click', async ()=>{
  const user = auth.currentUser;
  if(user) loadTransactions(user);
});
