import React from "react";

const CreateAccountButton = ({ onCreate }) => {
  const createAccount = async () => {
    try {
      const response = await fetch("http://localhost:5000/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      onCreate(data);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return <button onClick={createAccount}>Create a new Solana account</button>;
};

export default CreateAccountButton;
