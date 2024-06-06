import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const transferSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const from = Keypair.generate();

    const senderBefore = await connection.getBalance(
      new PublicKey(from.publicKey)
    );
    console.log(`Wallet balance: ${senderBefore / LAMPORTS_PER_SOL} SOL`);

    const to = Keypair.generate();
    const receiverBefore = await connection.getBalance(
      new PublicKey(to.publicKey)
    );
    console.log(`Wallet balance: ${receiverBefore / LAMPORTS_PER_SOL} SOL`);

    console.log("Sending some SOL to sender address");
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(from.publicKey),
      1 * LAMPORTS_PER_SOL
    );

    let latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: fromAirDropSignature,
    });

    console.log("Airdrop complete to Sender Account");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to.publicKey,
        lamports: LAMPORTS_PER_SOL / 200,
      })
    );
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);
    console.log("Signature is", signature);

    const senderAfter = await connection.getBalance(
      new PublicKey(from.publicKey)
    );
    console.log(`Wallet balance: ${senderAfter / LAMPORTS_PER_SOL} SOL`);
    const receiverAfter = await connection.getBalance(
      new PublicKey(to.publicKey)
    );
    console.log(`Wallet balance: ${receiverAfter / LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
    console.log(err);
  }
};

transferSol();
