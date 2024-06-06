import React from "react";

const ConnectWalletButton = ({ onConnect }) => {
  const connectWallet = async () => {
    // Simulate connecting to Phantom wallet and getting the public key
    const publicKey = "SimulatedPublicKey1234567890";
    onConnect(publicKey);
  };

  return <button onClick={connectWallet}>Connect to Phantom Wallet</button>;
};

export default ConnectWalletButton;
