const token = localStorage.getItem("adminToken");
const API = "https://autobit.live/api/admin";

if (!token) window.location.href = "index.html";

async function loadWithdraws() {
    const data = await fetch(`${API}/withdraw/pending`, {
        headers: { "Authorization": "Bearer " + token }
    }).then(r => r.json());

    let html = "";

    data.forEach(tx => {
        html += `
        <tr>
            <td>${tx.uid}</td>
            <td>${tx.coin}</td>
            <td>${tx.amount}</td>
            <td>${tx.wallet}</td>
            <td>${new Date(tx.date).toLocaleString()}</td>
            <td>
                <button onclick="approveWithdraw('${tx._id}', '${tx.uid}', '${tx.coin}', '${tx.amount}')">
                    Approve
                </button>
            </td>
        </tr>`;
    });

    document.getElementById("withdrawRows").innerHTML = html;
}

window.approveWithdraw = async function(id, uid, coin, amount) {

    // 1) Approve Withdraw
    await fetch(`${API}/withdraw/approve`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ id })
    });

    // 2) Deduct Wallet Balance
    await fetch(`${API}/wallet/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ uid, coin, amount: Number(amount) * -1 })
    });

    alert("Withdraw Approved!");
    loadWithdraws();
};

loadWithdraws();

window.logout = function () {
    localStorage.removeItem("adminToken");
    window.location.href = "index.html";
}
