# Demo Cross-Chain Token Transfer

This repository demonstrates how to deploy and interact with smart contracts for transferring ERC-20 tokens across different blockchains using the Wormhole Protocol. Additionally, it provides a utility to verify whether a token is attested on the target chain before attempting a cross-chain transfer. This ensures that the token can be transferred smoothly across chains using the Wormhole Bridge.

## Prerequisites

Before using this project, make sure you have the following:

 - [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [Forge](https://book.getfoundry.sh/getting-started/installation) (for compiling and testing smart contracts)
 - A funded wallet with TestNet tokens for deployment and transfers

 ## Getting Started

 **1. Clone the repository and navigate to the project directory:**

 ```bash
   git clone https://github.com/martin0995/cross-chain-token-transfers
   cd cross-chain-token-transfers
 ```

**2. Install the project dependencies:**

```bash
  npm install
```

**3. Set up environment variables:**

Create a `.env` file in the root directory and add your `private key`:

```bash
  PRIVATE_KEY=INSERT_PRIVATE_KEY
```

> **_NOTE:_** This private key should be funded with TestNet tokens on the chains you want to use.

**4. Configure the chains:**

Edit the `config.js` file to include the chain IDs, contract addresses, and RPC URLs for the chains you want to use.

**5. Compile the smart contracts:**

```bash
  forge compile
```

## Deployment

To deploy the smart contracts:

```bash
  npm run deploy
```

 - You will be prompted to select the **`source`** and **`target`** chains for deployment
 - The deployed contract addresses will be saved and updated in `deploy-config/contracts.json`

## Verify Token Attestation

Before initiating a cross-chain token transfer, it's recommended to check if the desired token is attested on the target chain. This ensures that the token can be successfully transferred.

**1. Run the token attestation check script:**
  
  ```bash
    npm run verify
  ```

**2. Follow the prompts to input:**

- The RPC URL of the target chain
- The Token Bridge contract address on the target chain
- The token contract address on the source chain
- The source chain ID

The script will inform you if the token has been attested on the target chain, providing the wrapped token address if it exists.

## Token Transfer

To initiate a token transfer across chains:

```bash
  npm run transfer
```

 - You will be prompted to select the **`source`** and **`target`** chains for the transfer
 - Provide the token address, recipient address on the target chain, and the amount to transfer

## Recommended Test Setup: Transfer USDC

To test the cross-chain transfer, I recommend using the **USDC token**, as it’s widely supported across different TestNets.

 - USDC Token Address on Avalanche Fuji: `0x5425890298aed601595a70ab815c96711a31bc65`
 - USDC Token Address on Celo Alfajores: `0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B`

You can obtain USDC on TestNets via the official USDC faucet:

 - [USDC Testnet Faucet](https://faucet.circle.com/)

 Once you have USDC, use the addresses above to transfer between TestNets.

## Contracts Overview

The project includes two main contracts:

 - **`CrossChainSender`** - handles sending tokens from the source chain
 - **`CrossChainReceiver`** - handles receiving tokens on the target chain

## Project Structure

 - **`src/`** - contains the Solidity smart contracts
 - **`script/`** - contains TypeScript scripts for deployment and token transfers
 - **`deploy-config/`** - configuration files for the chains and deployed contracts
 - **`out/`** - contains the compiled contract ABIs and bytecode

## Notes

 - Ensure your wallet has enough TestNet tokens to cover gas fees on both the source and target chains.
 - Once the transaction is completed, you can check its status using the [Wormhole Explorer](https://wormholescan.io/). Just enter the transaction hash to see detailed information.
 - If the token isn’t visible in your wallet on the target chain, the Wormhole Explorer provides a button to automatically add it to MetaMask on the _target chain_, allowing you to view the updated balance immediately.

<div align="center">
 <img src="https://github.com/user-attachments/assets/e2ae584a-1a41-4f20-9703-0fe7de230e3f" alt="metamask" width="800"/>
</div>
