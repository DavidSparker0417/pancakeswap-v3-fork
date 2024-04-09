import * as fs from "fs"
import { ethers, network } from 'hardhat'

async function main() {
  console.log(`Deploying multicall contract to ${network.name}`)
  const MultiCallFactory = await ethers.getContractFactory("PancakeInterfaceMulticallV2");
  const multicallContract = await MultiCallFactory.deploy();

  // console.log(`${JSON.stringify(multicallContract)}`)
  console.log(`Multicall Contract : ${multicallContract.target}`)
}

main()