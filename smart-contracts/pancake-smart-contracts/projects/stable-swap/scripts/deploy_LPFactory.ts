import { ethers, run, network } from "hardhat";
import { sleep } from "sleep-ts"

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  PancakeStableSwapLPFactory: require('../artifacts/contracts/PancakeStableSwapLPFactory.sol/PancakeStableSwapLPFactory.json')
}
const verify = async (address:string, parameter:any[] = []) => {
  console.log(`Veryfing ${address} ...`)
  await run('verify:verify', {
    address: address,
    constructorArguments: parameter
  })
  console.log("Success!")
}

async function main() {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  const [owner] = await ethers.getSigners()
  // Check if the network is supported.
  console.log(`Deploying to ${networkName} network...`);

  // Compile contracts.
  await run("compile");
  console.log("Compiled contracts...");

  let pancakeStableSwapLPFactory_address = ''
  let PancakeStableSwapLPFactory
  if (!pancakeStableSwapLPFactory_address) {
    PancakeStableSwapLPFactory = await ethers.getContractFactory("PancakeStableSwapLPFactory");
    const pancakeStableSwapLPFactory = await PancakeStableSwapLPFactory.deploy();
    await pancakeStableSwapLPFactory.deployed();
    pancakeStableSwapLPFactory_address = pancakeStableSwapLPFactory.address
  } else {
    PancakeStableSwapLPFactory = new ethers.Contract(pancakeStableSwapLPFactory_address, artifacts.PancakeStableSwapLPFactory.abi, owner)
  }

  console.log("pancakeStableSwapLPFactory deployed to:", pancakeStableSwapLPFactory_address);
  await sleep(10000)
  await verify(pancakeStableSwapLPFactory_address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
