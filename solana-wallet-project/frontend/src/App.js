import React, { useState } from "react";
import CreateAccountButton from "./CreateAccountButton";
import TransferSolButton from "./TransferSolButton";
import ConnectWalletButton from "./ConnectWalletButton";

const App = () => {
  const [fromSecretKey, setFromSecretKey] = useState([]);
  const [toPublicKey, setToPublicKey] = useState("");

  const handleCreateAccount = (account) => {
    setFromSecretKey(account.secretKey);
    console.log("Created Account:", account);
  };

  const handleConnectWallet = (publicKey) => {
    setToPublicKey(publicKey);
    console.log("Connected Wallet PublicKey:", publicKey);
  };

  return (
    <div>
      <h1>Solana Wallet</h1>
      <CreateAccountButton onCreate={handleCreateAccount} />
      <ConnectWalletButton onConnect={handleConnectWallet} />
      <TransferSolButton
        fromSecretKey={fromSecretKey}
        toPublicKey={toPublicKey}
      />
    </div>
  );
};

export default App;
