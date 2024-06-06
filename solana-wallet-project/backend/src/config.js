const solanaWeb3 = require("@solana/web3.js");

const connection = new solanaWeb3.Connection(
  solanaWeb3.clusterApiUrl("devnet"),
  "confirmed"
);
const airdropAmount = 2; // 2 SOL

module.exports = {
  connection,
  airdropAmount,
};
