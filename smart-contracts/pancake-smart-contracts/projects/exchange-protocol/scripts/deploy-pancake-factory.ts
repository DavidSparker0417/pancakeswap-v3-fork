import { ethers, network, run } from "hardhat";

const main = async () => {
  // Compile contracts
  await run("compile");
  console.log("Compiled contracts.");

  const networkName = network.name;

  // Sanity checks
  if (networkName === "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  } else if (networkName === "testnet") {
    if (!process.env.KEY_TESTNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", networkName);

  // Deploy PancakeFactory
  console.log("Deploying PancakeFactory..");

  const PancakeFactory = await ethers.getContractFactory("PancakeFactory");

  const pancackeFactory = await PancakeFactory.deploy(
    "0x24ef62f5060D6BcAB0f0732B515137C508499126"
  );

  await pancackeFactory.deployed();

  console.log("PancackeFactory deployed to:", pancackeFactory.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
