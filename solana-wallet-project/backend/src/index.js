const express = require("express");
const cors = require("cors");
const { createAccount, transferSol } = require("./solana");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Solana Wallet Backend");
});

app.post("/create-account", async (req, res) => {
  try {
    const account = await createAccount();
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/transfer-sol", async (req, res) => {
  try {
    const { from, to } = req.body;
    const txId = await transferSol(from, to);
    res.json({ txId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
