// admin/js/login.js

async function loginAdmin(){
  const username = document.getElementById("adminUser").value;
  const password = document.getElementById("adminPass").value;

  const res = await fetch("https://api.autobit.live/admin/login",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ username, password })
  });

  const data = await res.json();

  if(data.token){
    localStorage.setItem("adminToken", data.token);
    window.location = "dashboard.html";
  } else {
    alert(data.error || "Login failed");
  }
}
