import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const { RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

console.log("Using contract at:", CONTRACT_ADDRESS);

// Provider + wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ABI du contrat
const contractABI = [
    "function givePoints(address to, uint256 amount, string memory reason) public",
    "function transferPoints(address to, uint256 amount) public",
    "function usePoints(uint256 amount, string memory reason) public",
    "function getBalance(address user) public view returns (uint256)",
    "function rewardActivity(address[] memory participants, uint256 pointsEach, string memory activityName) public"
];

// Contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

// --- SERVICE EXPORTÉ ---
export const blockchain = {

    async givePoints(toAddress, amount, reason) {
        const tx = await contract.givePoints(toAddress, amount, reason);
        await tx.wait();
        console.log(`Points donnés à ${toAddress}`);
    },

    async transferPoints(toAddress, amount) {
        const tx = await contract.transferPoints(toAddress, amount);
        await tx.wait();
        console.log(`Transfert effectué`);
    },

    async usePoints(amount, reason) {
        const tx = await contract.usePoints(amount, reason);
        await tx.wait();
        console.log(`Points brûlés`);
    },

    async getBalance(address) {
        const balance = await contract.getBalance(address);
        return balance;
    }
};
