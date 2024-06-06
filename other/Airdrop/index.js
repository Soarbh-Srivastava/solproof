// Import Solana web3 functionalities
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import promptSync from "prompt-sync";
const prompt = promptSync();

// Create a new keypair
const newPair = Keypair.generate();

// Extract the public and private key from the keypair
const publicKey = newPair.publicKey.toString();
const privateKey = newPair.secretKey;

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public Key of the generated keypair:", publicKey);

// Prompt the user to input a wallet address
const walletAddress = prompt("Please enter your wallet address: ");
let userPublicKey;

try {
  userPublicKey = new PublicKey(walletAddress);
  if (!PublicKey.isOnCurve(userPublicKey.toBytes())) {
    throw new Error("The provided public key is not on the ed25519 curve.");
  }
} catch (err) {
  console.error("Invalid wallet address:", err.message);
  process.exit(1);
}

console.log("Wallet Address:", walletAddress);

// Get the wallet balance from the user-provided wallet address
const getWalletBalance = async () => {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connection object is:", connection);

    // Make a wallet (keypair) from privateKey and get its balance
    const myWallet = await Keypair.fromSecretKey(privateKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(newPair.publicKey)
    );
    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

// Airdrop SOL to the user-provided wallet address
const airDropSol = async () => {
  try {
    console.log("Airdropping some SOL to the wallet!");
    const fromAirDropSignature = await connection.requestAirdrop(
      userPublicKey,
      0.0001 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log("Error: ", err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

mainFunction();
