const token = localStorage.getItem("adminToken");
const API = "https://autobit.live/api/admin";

if (!token) window.location.href = "index.html";

async function loadUsers() {
    let data = await fetch(`${API}/users`, {
        headers: { "Authorization": "Bearer " + token }
    }).then(r => r.json());

    let rowHTML = "";

    data.forEach(u => {
        rowHTML += `
        <tr>
            <td>${u.uid}</td>
            <td><input value="${u.wallet.BTC}" id="btc-${u.uid}"></td>
            <td><input value="${u.wallet.ETH}" id="eth-${u.uid}"></td>
            <td><input value="${u.wallet.BNB}" id="bnb-${u.uid}"></td>
            <td><input value="${u.wallet.SOL}" id="sol-${u.uid}"></td>
            <td><input value="${u.wallet.USDT}" id="usdt-${u.uid}"></td>
            <td><button onclick="saveWallet('${u.uid}')">Save</button></td>
        </tr>
        `;
    });

    document.getElementById("userRows").innerHTML = rowHTML;
}

window.saveWallet = async function(uid) {
    const coins = ["BTC", "ETH", "BNB", "SOL", "USDT"];

    for (let c of coins) {
        let amount = document.getElementById(c.toLowerCase()+"-"+uid).value;

        await fetch(`${API}/wallet/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ uid, coin: c, amount })
        });
    }

    alert("Updated!");
}

loadUsers();

window.logout = function () {
    localStorage.removeItem("adminToken");
    window.location.href = "index.html";
}
