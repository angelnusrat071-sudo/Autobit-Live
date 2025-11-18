const token = localStorage.getItem("adminToken");
const API = "https://autobit.live/api/admin";

if (!token) window.location.href = "index.html";

async function loadDeposits() {
    const data = await fetch(`${API}/deposit/pending`, {
        headers: { "Authorization": "Bearer " + token }
    }).then(r => r.json());

    let html = "";

    data.forEach(tx => {
        html += `
        <tr>
            <td>${tx.uid}</td>
            <td>${tx.coin}</td>
            <td>${tx.amount}</td>
            <td>${new Date(tx.date).toLocaleString()}</td>
            <td>
                <button onclick="approveDeposit('${tx._id}', '${tx.uid}', '${tx.coin}', '${tx.amount}')">
                    Approve
                </button>
            </td>
        </tr>`;
    });

    document.getElementById("depositRows").innerHTML = html;
}

window.approveDeposit = async function(id, uid, coin, amount) {

    // 1) Approve Transaction
    await fetch(`${API}/deposit/approve`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ id })
    });

    // 2) Update User Wallet
    await fetch(`${API}/wallet/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ uid, coin, amount: Number(amount) })
    });

    alert("Deposit Approved!");
    loadDeposits();
};

loadDeposits();

window.logout = function () {
    localStorage.removeItem("adminToken");
    window.location.href = "index.html";
}
