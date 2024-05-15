Solana Web3.js Functionality

This script demonstrates basic functionalities using Solana's web3.js library to interact with the Solana blockchain.

Getting Started

1. Install Dependencies:
   npm install @solana/web3.js prompt-sync

2. Run the Script:
   node <script_name>.js

Usage

The script performs the following actions:

1. Generates a new keypair (public and private key).
2. Prompts the user to input a wallet address.
3. Validates the provided wallet address.
4. Connects to the Solana Devnet.
5. Retrieves the balance of the generated keypair.
6. Airdrops a small amount of SOL to the provided wallet address.
7. Retrieves the balance of the provided wallet address after the airdrop.

Note: Make sure to replace <script_name>.js with the actual filename of your script.

Prerequisites

- Node.js and npm installed on your machine.
- Basic understanding of Solana and blockchain concepts.

Dependencies

- @solana/web3.js: Solana's JavaScript API.
- prompt-sync: Synchronous prompt for user input.

License

This project is licensed under the MIT License - see the LICENSE file for details.
