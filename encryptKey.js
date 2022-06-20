require("dotenv").config();
const ethers = require("ethers");
const fs = require("fs");

async function main() {
  const wallet = new ethers.Wallet(process.env.GANACHE_ACCT_0_PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.GANACHE_ACCT_0_PRIVATE_KEY
  );
  console.log(encryptedJsonKey);
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
