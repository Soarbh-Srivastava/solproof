const solanaWeb3 = require("@solana/web3.js");
const { connection, airdropAmount } = require("./config");

async function createAccount() {
  const keypair = solanaWeb3.Keypair.generate();
  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    airdropAmount * solanaWeb3.LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdropSignature);
  return {
    publicKey: keypair.publicKey.toString(),
    secretKey: keypair.secretKey,
  };
}

async function transferSol(fromSecretKey, toPublicKeyString) {
  const fromKeypair = solanaWeb3.Keypair.fromSecretKey(
    Uint8Array.from(fromSecretKey)
  );
  const toPublicKey = new solanaWeb3.PublicKey(toPublicKeyString);

  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPublicKey,
      lamports: solanaWeb3.LAMPORTS_PER_SOL, // 1 SOL
    })
  );

  const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromKeypair]
  );
  return signature;
}

module.exports = {
  createAccount,
  transferSol,
};
