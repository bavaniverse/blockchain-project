const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const Factory = await ethers.getContractFactory("MemberDeposit");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("MemberDeposit deployed to:", address);

  fs.writeFileSync(
    "deployments.json",
    JSON.stringify({ MemberDeposit: address }, null, 2)
  );
  console.log("Address saved to deployments.json");
}

main().catch((e) => { console.error(e); process.exitCode = 1; });