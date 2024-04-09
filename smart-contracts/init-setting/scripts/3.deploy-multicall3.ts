import { ethers, network } from 'hardhat'

async function main() {
  console.log(`Deploying multicall contract to ${network.name}`)
  const MultiCall3Factory = await ethers.getContractFactory("Multicall3");
  const multicall3Contract = await MultiCall3Factory.deploy();

  // console.log(`${JSON.stringify(multicallContract)}`)
  console.log(`Multicall3 Contract : ${multicall3Contract.target}`)
}

main()