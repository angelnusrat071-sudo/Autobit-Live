const tkW = localStorage.getItem("adminToken");
if(!tkW) window.location="index.html";

async function loadWithdraws(){
  const res = await fetch("https://api.autobit.live/admin/withdraws",{
    headers:{ Authorization:"Bearer "+tkW }
  });

  const list = await res.json();

  const tb = document.getElementById("wdTable");
  tb.innerHTML = `<tr>
    <th>User</th><th>Coin</th><th>Amount</th><th>Address</th><th>Action</th>
  </tr>`;

  list.forEach(w=>{
    tb.innerHTML += `
      <tr>
        <td>${w.email}</td>
        <td>${w.coin}</td>
        <td>${w.amount}</td>
        <td>${w.address}</td>
        <td>
          <button class="btn approve" onclick="approveW('${w._id}')">Approve</button>
          <button class="btn reject" onclick="rejectW('${w._id}')">Reject</button>
        </td>
      </tr>
    `;
  });
}

function approveW(id){
  fetch("https://api.autobit.live/admin/approve-withdraw",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+tkW
    },
    body:JSON.stringify({ id })
  }).then(()=>loadWithdraws());
}

function rejectW(id){
  fetch("https://api.autobit.live/admin/reject-withdraw",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+tkW
    },
    body:JSON.stringify({ id })
  }).then(()=>loadWithdraws());
}

loadWithdraws();
