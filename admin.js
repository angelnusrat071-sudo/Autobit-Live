// admin/js/admin.js

const token = localStorage.getItem("adminToken");
if(!token) window.location="index.html";

async function loadStats(){
  const res = await fetch("https://api.autobit.live/admin/stats",{
    headers:{ Authorization:"Bearer "+token }
  });

  const s = await res.json();

  document.getElementById("statsArea").innerHTML = `
    <h3>Total Users: ${s.users}</h3>
    <h3>Total Wallet Balance: $${s.totalBalance}</h3>
    <h3>Pending Deposits: ${s.pendingDeposits}</h3>
    <h3>Pending Withdrawals: ${s.pendingWithdraws}</h3>
  `;
}

loadStats();

function logoutAdmin(){
  localStorage.removeItem("adminToken");
  window.location="index.html";
}
