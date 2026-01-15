# Cryonix

---

## Scope
Cryonix is a lightweight Base Sepolia inspection utility focused on visibility rather than interaction. It surfaces core network signals and contract presence without performing any privileged or state-changing actions.

Built for Base.

---

## Intended Usage
This repository is meant to be used when validating:
- RPC availability and correctness
- Explorer alignment with RPC data
- Wallet balance visibility
- Contract bytecode deployment status

Cryonix fits well into early-stage tooling checks and CI validation pipelines.

---

## Observability Surface
Cryonix extracts and prints:
- chainId confirmation via JSON-RPC
- optional wallet balances through Coinbase Wallet
- latest block height and timestamp
- current gas price
- bytecode presence for predefined addresses
- direct Basescan references for all inspected data

---

## Operational Constraints
- No transactions are broadcast
- No signatures are produced
- No onchain state is modified
- No private keys are required

---

## Execution Model
1) Load Base Sepolia network constants  
2) Perform a minimal RPC probe  
3) Initialize Coinbase Wallet SDK and viem clients  
4) Attempt wallet discovery for balance reads  
5) Read block-level and gas data  
6) Verify runtime bytecode for target addresses  

---

## Network Profile
- network: Base Sepolia  
- chainId (decimal): 84532  
- explorer: https://sepolia.basescan.org  

---

## Files And Layout
- README.md  
- app/Cryonix.mjs  
- package.json  
- contracts/RuntimeIndex.sol  
- contracts/ChainPulse.sol  
- data/targets.json  

---

## Author Contacts
- GitHub: https://github.com/trainee-escapes

- Email: trainee-escapes.07@icloud.com

---

## License
BSD-2 License

---

## Testnet Deployment (Base Sepolia)
the following deployments are used only as validation references.

network: base sepolia  
chainId (decimal): 84532  
explorer: https://sepolia.basescan.org  

RuntimeIndex.sol address:  
0x8E2aB1F9C6e3A2dF0C4B9a1d7eB53F1A4D9C2E10  

deployment and verification:
- https://sepolia.basescan.org/address/0x8E2aB1F9C6e3A2dF0C4B9a1d7eB53F1A4D9C2E10
- https://sepolia.basescan.org/0x8E2aB1F9C6e3A2dF0C4B9a1d7eB53F1A4D9C2E10/0#code  

ChainPulse.sol address:  
0xF3C1bE7A92d4E0C6a9F1B8D2eA4C5B7D9E0F2A31  

deployment and verification:
- https://sepolia.basescan.org/address/0xF3C1bE7A92d4E0C6a9F1B8D2eA4C5B7D9E0F2A31
- https://sepolia.basescan.org/0xF3C1bE7A92d4E0C6a9F1B8D2eA4C5B7D9E0F2A31/0#code  
