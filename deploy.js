// main script for deploying SimpleStorage.sol
require("dotenv").config();
const fs = require("fs");
const ethers = require("ethers");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.GANACHE_RPC_SERVER_ADDRESS
  );
  const wallet = new ethers.Wallet(
    process.env.GANACHE_ACCT_0_PRIVATE_KEY,
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // a Contract factory is an object you can use to deploy contracts

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
