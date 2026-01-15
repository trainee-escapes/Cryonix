import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import axios from "axios";
import fs from "node:fs";
import { createPublicClient, createWalletClient, custom, formatEther, http, isAddress } from "viem";
import { baseSepolia } from "viem/chains";

const NET = {
  name: "Base Sepolia",
  chainId: 84532,
  rpc: "https://sepolia.base.org",
  explorer: "https://sepolia.basescan.org",
};

const addrLink = (a) => `${NET.explorer}/address/${a}`;
const codeLink = (a) => `${NET.explorer}/address/${a}#code`;
const blockLink = (b) => `${NET.explorer}/block/${b}`;
const short = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`;

function loadTargets() {
  try {
    const raw = fs.readFileSync("data/targets.json", "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.targets) ? parsed.targets : [];
  } catch {
    return [];
  }
}

async function rpcPing() {
  const payload = { jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] };
  const res = await axios.post(NET.rpc, payload, { timeout: 8000 });
  return res?.data?.result ?? null;
}

export async function run() {
  console.log("Built for Base");
  console.log(`network: ${NET.name}`);
  console.log(`chainId: ${NET.chainId}`);
  console.log(`explorer: ${NET.explorer}`);
  console.log("");

  console.log("rpc check:");
  try {
    console.log(`- eth_chainId: ${await rpcPing()}`);
  } catch {
    console.log("- rpc unreachable");
  }
  console.log("");

  const sdk = new CoinbaseWalletSDK({ appName: "Cryonix", darkMode: false });
  const provider = sdk.makeWeb3Provider(NET.rpc, NET.chainId);

  const walletClient = createWalletClient({
    chain: baseSepolia,
    transport: custom(provider),
  });

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(NET.rpc),
  });

  let addresses = [];
  try {
    addresses = await walletClient.getAddresses();
  } catch {}

  if (addresses.length) {
    console.log("balances:");
    for (const a of addresses) {
      const bal = await publicClient.getBalance({ address: a });
      console.log(`- ${short(a)}: ${formatEther(bal)} ETH`);
      console.log(`  ${addrLink(a)}`);
    }
    console.log("");
  }

  const latest = await publicClient.getBlockNumber();
  const block = await publicClient.getBlock({ blockNumber: latest });
  const gas = await publicClient.getGasPrice();

  console.log("chain snapshot:");
  console.log(`- block: ${latest.toString()}`);
  console.log(`  ${blockLink(latest.toString())}`);
  console.log(`- timestamp: ${new Date(Number(block.timestamp) * 1000).toISOString()}`);
  console.log(`- gas price gwei: ${(Number(gas) / 1e9).toFixed(3)}`);
  console.log("");

  console.log("bytecode scan:");
  for (const t of loadTargets()) {
    if (!isAddress(t)) continue;
    const code = await publicClient.getBytecode({ address: t });
    console.log(`- ${short(t)}: ${code && code !== "0x" ? "present" : "empty"}`);
    console.log(`  ${codeLink(t)}`);
  }
}

run().catch(console.error);
