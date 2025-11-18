const tks = localStorage.getItem("adminToken");
if(!tks) window.location="index.html";

async function loadDeposits(){
  const res = await fetch("https://api.autobit.live/admin/deposits",{
    headers:{ Authorization:"Bearer "+tks }
  });

  const list = await res.json();

  const tb = document.getElementById("depTable");
  tb.innerHTML = `<tr>
    <th>User</th><th>Coin</th><th>Amount</th><th>TxID</th><th>Action</th>
  </tr>`;

  list.forEach(d=>{
    tb.innerHTML += `
      <tr>
        <td>${d.email}</td>
        <td>${d.coin}</td>
        <td>${d.amount}</td>
        <td>${d.txid || "-"}</td>
        <td>
          <button class="btn approve" onclick="approve('${d._id}')">Approve</button>
          <button class="btn reject" onclick="rejectTx('${d._id}')">Reject</button>
        </td>
      </tr>
    `;
  });
}

function approve(id){
  fetch("https://api.autobit.live/admin/approve",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+tks
    },
    body:JSON.stringify({ id })
  }).then(()=>loadDeposits());
}

function rejectTx(id){
  fetch("https://api.autobit.live/admin/reject",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+tks
    },
    body:JSON.stringify({ id })
  }).then(()=>loadDeposits());
}

loadDeposits();
