import React from "react";

const TransferSolButton = ({ fromSecretKey, toPublicKey }) => {
  const transferSol = async () => {
    try {
      const response = await fetch("http://localhost:5000/transfer-sol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromSecretKey,
          to: toPublicKey,
        }),
      });
      const data = await response.json();
      console.log("Transaction ID:", data.txId); // Log the transaction ID
    } catch (error) {
      console.error("Error transferring SOL:", error);
    }
  };

  return <button onClick={transferSol}>Transfer SOL to New Wallet</button>;
};

export default TransferSolButton;
