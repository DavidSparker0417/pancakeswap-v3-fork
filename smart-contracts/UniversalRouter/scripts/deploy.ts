import * as dotenv from 'dotenv';
dotenv.config();
import { ethers, network } from 'hardhat'
import { RouterParametersStruct } from '../typechain-types/contracts/UniversalRouter';

const routerParam: RouterParametersStruct = {
  permit2: "0xD67363259f04BB7Ab0A804BD1FF52f559F35Db31",
  weth9: "0x70499adEBB11Efd915E3b69E700c331778628707",
  seaportV1_5: "0x0000000000000000000000000000000000000000",
  seaportV1_4: "0x0000000000000000000000000000000000000000",
  openseaConduit: "0x0000000000000000000000000000000000000000",
  x2y2: "0x0000000000000000000000000000000000000000",
  looksRareV2: "0x0000000000000000000000000000000000000000",
  routerRewardsDistributor: "0x0000000000000000000000000000000000000000",
  looksRareRewardsDistributor: "0x0000000000000000000000000000000000000000",
  looksRareToken: "0x0000000000000000000000000000000000000000",
  v2Factory: "0x41adc52ad43E4B05D442EC5A8240991958a003e2",
  v3Factory: "0x3c5B361C9cAC76C7b1bCaaEd036fbF67B90B6BF1",
  v3Deployer: "0x6391CFBF229cC6e1Ac657deEcc6C0381B4380110",
  v2InitCodeHash: "0x1a0b41a049b1487cb82e0d5b68774e23e55b72d08a9b108bc598a5fdf423c464",
  v3InitCodeHash: "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
  stableFactory: "0x5e85B7e1a2133E42Ce4660A23F02cc176B21e394",
  stableInfo: "0x61E860130f66a479a9C1B337E6f0a3ECeC2ef1f2",
  pancakeNFTMarket: "0x0000000000000000000000000000000000000000"
}

async function main() {
  const networkName = network.name
  console.log(`Deploying UniversalRouter to ${networkName} ...`)
  const UniswapRouterFactory = await ethers.getContractFactory("UniversalRouter")
  const uniswapRouter = await UniswapRouterFactory.deploy(routerParam);
  console.log("UniversalRouter deployed to: ", await uniswapRouter.getAddress())
}

main()