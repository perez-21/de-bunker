const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy SimpleToken
  const SimpleToken = await ethers.getContractFactory("SimpleToken");
  const simpleToken = await SimpleToken.deploy();
  
  await simpleToken.waitForDeployment();
  const tokenAddress = await simpleToken.getAddress();

  console.log("SimpleToken deployed to:", tokenAddress);

  // Verify contract (optional)
  console.log("Verifying contract...");
  await run("verify:verify", {
    address: tokenAddress,
    constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

