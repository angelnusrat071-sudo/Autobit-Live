const token2 = localStorage.getItem("adminToken");
if(!token2) window.location="index.html";

async function loadUsers(){
  const res = await fetch("https://api.autobit.live/admin/users",{
    headers:{ Authorization:"Bearer "+token2 }
  });

  const users = await res.json();

  const t = document.getElementById("usersTable");
  t.innerHTML = `
    <tr><th>Email</th><th>Balance</th><th>Edit</th></tr>
  `;

  users.forEach(u=>{
    t.innerHTML += `
      <tr>
        <td>${u.email}</td>
        <td>$${u.balance}</td>
        <td>
          <button class="btn edit" onclick="editBal('${u.uid}', ${u.balance})">
            Edit
          </button>
        </td>
      </tr>
    `;
  });
}

function editBal(uid, bal){
  const newBal = prompt("New Balance:", bal);
  if(!newBal) return;

  fetch("https://api.autobit.live/admin/edit-balance",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+token2
    },
    body:JSON.stringify({ uid, balance:Number(newBal) })
  }).then(()=>loadUsers());
}

loadUsers();
