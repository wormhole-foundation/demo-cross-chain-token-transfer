import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import readlineSync from 'readline-sync';

dotenv.config();

async function main() {
  // Prompt user for the target chain details
  const rpcUrl = readlineSync.question('Enter the TARGET chain RPC URL: ');
  const tokenBridgeAddress = readlineSync.question('Enter the Token Bridge contract address on the TARGET chain: ');

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  // Load the Token Bridge ABI
  const tokenBridgeAbi = [
    'function wrappedAsset(uint16 tokenChainId, bytes32 tokenAddress) view returns (address)',
  ];

  // Create the Token Bridge contract instance
  const tokenBridge = new ethers.Contract(tokenBridgeAddress, tokenBridgeAbi, wallet);

  // Ask for the token address and source chain ID to check
  const tokenAddress = readlineSync.question('Enter the token contract address on the SOURCE chain: ');
  const sourceChainId = readlineSync.questionInt('Enter the SOURCE chain ID: ');

  // Convert the 20-byte token address to a 32-byte address padded with leading zeros
  const paddedTokenAddress = ethers.zeroPadValue(ethers.getAddress(tokenAddress), 32);

  // Check if the token is attested on the target chain
  const wrappedTokenAddress = await tokenBridge.wrappedAsset(sourceChainId, paddedTokenAddress);

  if (wrappedTokenAddress === ethers.ZeroAddress) {
    console.log('The token has NOT been attested on the target chain.');
  } else {
    console.log(`The token is attested on the target chain. Wrapped token address: ${wrappedTokenAddress}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
