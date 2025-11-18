// dashboard/js/wallet.js
import { auth } from "../../js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const API = "https://api.autobit.live"; // backend api base

const COIN_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  BNB: "binancecoin",
  SOL: "solana",
  USDT: "tether"
};

function formatUSD(n){
  return Number(n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
}

async function fetchPrices(ids){
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`;
  const res = await fetch(url);
  return res.json();
}

async function renderWallet(user){
  // get idToken for backend calls
  const token = await user.getIdToken();

  // fetch balances from backend
  const balRes = await fetch(`${API}/wallet/balance`,{
    headers:{ Authorization: "Bearer "+token }
  });
  const balances = await balRes.json();

  // build coin list for coingecko
  const ids = [];
  Object.keys(balances).forEach(k=>{
    if(COIN_IDS[k]) ids.push(COIN_IDS[k]);
  });

  const prices = await fetchPrices(ids);

  // compute totals
  let totalUSD = 0;

  // render coins area
  const coinsArea = document.getElementById("coinsArea");
  const tbody = document.getElementById("portfolioBody");
  coinsArea.innerHTML="";
  tbody.innerHTML="";

  for(const coin of Object.keys(balances)){
    const amount = Number(balances[coin] || 0);
    const id = COIN_IDS[coin];
    const price = id && prices[id] ? prices[id].usd : 0;
    const value = amount * price;
    totalUSD += value;

    // card
    coinsArea.innerHTML += `
      <div class="coin">
        <div class="sym">${coin}</div>
        <div class="price">$${formatUSD(price)}</div>
        <div class="small">${amount} ${coin}</div>
      </div>
    `;

    // table row
    tbody.innerHTML += `
      <tr>
        <td>${coin}</td>
        <td>$${formatUSD(price)}</td>
        <td>${amount}</td>
        <td>$${formatUSD(value)}</td>
      </tr>
    `;
  }

  document.getElementById("totalBalance").innerText = "$"+formatUSD(totalUSD);
}

onAuthStateChanged(auth, user=>{
  if(!user) return;
  renderWallet(user);
});

document.getElementById("refreshBtn")?.addEventListener('click', async ()=>{
  const user = auth.currentUser;
  if(user) renderWallet(user);
});
