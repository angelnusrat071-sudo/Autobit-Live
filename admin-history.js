const token = localStorage.getItem("adminToken");
const API = "https://autobit.live/api/admin";

if (!token) window.location.href = "index.html";

async function loadHistory() {
    const data = await fetch(`${API}/transactions/all`, {
        headers: { "Authorization": "Bearer " + token }
    }).then(res => res.json());

    let html = "";

    data.forEach(tx => {
        html += `
        <tr>
            <td>${tx.uid}</td>
            <td>${tx.type}</td>
            <td>${tx.coin || '-'}</td>
            <td>${tx.amount}</td>
            <td style="color:${tx.status === 'approved' ? 'lime' : tx.status === 'pending' ? 'yellow' : 'red'}">
                ${tx.status}
            </td>
            <td>${new Date(tx.date).toLocaleString()}</td>
        </tr>`;
    });

    document.getElementById("historyRows").innerHTML = html;
}

loadHistory();

window.logout = function () {
    localStorage.removeItem("adminToken");
    window.location.href = "index.html";
}
