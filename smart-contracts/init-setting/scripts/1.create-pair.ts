import * as fs from "fs"
import { ethers, network } from 'hardhat'

async function main() {
  let net = network.name
  const deployments = JSON.parse(await fs.readFileSync(`../pancake-v3-contracts/deployments/${net}.json`))
  const factoryAddr = deployments.v2Factory
  const abi = JSON.parse(await fs.readFileSync(`../pancake-smart-contracts/projects/exchange-protocol/artifacts/contracts/PancakeFactory.sol/PancakeFactory.json`))
  const PancakeFactory = await ethers.getContractAt(abi.abi, factoryAddr);
  const sig = await PancakeFactory.createPair("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x12Ab8B560FAFe099e1CCc836cbbc2286EDe7905f") // PLS - USDC
  console.log(sig?.hash)
}

main()