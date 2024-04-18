/* eslint-disable camelcase */
import { ethers, run, network } from "hardhat";
import { configs } from "@pancakeswap/common/config";
import { tryVerify, verifyContract } from "@pancakeswap/common/verify";
import { writeFileSync } from "fs";

async function main() {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  // Check if the network is supported.
  console.log(`Deploying to ${networkName} network...`);

  // Compile contracts.
  await run("compile");
  console.log("Compiled contracts...");

  const config = configs[networkName as keyof typeof configs];
  if (!config) {
    throw new Error(`No config found for network ${networkName}`);
  }

  const v3PeripheryDeployedContracts = await import(`@pancakeswap/v3-periphery/deployments/${networkName}.json`);
  const positionManager_address = v3PeripheryDeployedContracts.NonfungiblePositionManager;

  let masterChefV3_addr = ''
  if (!masterChefV3_addr) {
    const MasterChefV3 = await ethers.getContractFactory("MasterChefV3");
    const masterChefV3 = await MasterChefV3.deploy(config.cake, positionManager_address, config.WNATIVE);
    await masterChefV3.deployed();
    masterChefV3_addr = masterChefV3.address
  }
  console.log("masterChefV3 deployed to:", masterChefV3_addr);
  await verifyContract(masterChefV3_addr, [config.cake, positionManager_address]);

  // Write the address to a file.
  writeFileSync(
    `./deployments/${networkName}.json`,
    JSON.stringify(
      {
        MasterChefV3: masterChefV3_addr,
      },
      null,
      2
    )
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
