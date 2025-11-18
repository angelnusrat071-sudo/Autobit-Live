const token = localStorage.getItem("adminToken");
const API = "https://autobit.live/api/admin";

if (!token) window.location.href = "index.html";

// Load Dashboard Data
async function loadDashboard() {
    const stats = await fetch(`${API}/stats`, {
        headers: { "Authorization": "Bearer " + token }
    }).then(r => r.json());

    document.getElementById("totalUsers").innerText = stats.totalUsers;
    document.getElementById("totalDeposits").innerText = stats.totalDeposits;
    document.getElementById("totalWithdraws").innerText = stats.totalWithdraws;
    document.getElementById("platformBalance").innerText = stats.platformBalance;
}

// Load Recent Activity
async function loadRecent() {
    const data = await fetch(`${API}/transactions/recent`, {
        headers: { "Authorization": "Bearer " + token }
    }).then(r => r.json());

    let html = "";

    data.forEach(tx => {
        html += `
        <tr>
            <td>${tx.uid}</td>
            <td>${tx.type}</td>
            <td>${tx.coin}</td>
            <td>${tx.amount}</td>
            <td style="color:${tx.status === 'approved' ? 'lime' : tx.status === 'pending' ? 'yellow' : 'red'}">
                ${tx.status}
            </td>
            <td>${new Date(tx.date).toLocaleString()}</td>
        </tr>`;
    });

    document.getElementById("recentRows").innerHTML = html;
}

loadDashboard();
loadRecent();

window.logout = function () {
    localStorage.removeItem("adminToken");
    window.location.href = "index.html";
};
