import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { NetworkUserConfig } from "hardhat/types";
import * as dotenv from 'dotenv';
dotenv.config();

const pulseTestnet: NetworkUserConfig = {
  url: 'https://rpc.v4.testnet.pulsechain.com',
  chainId: 943,
  accounts: [process.env.PRIVATE_KEY!],
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
          viaIR: true
        },
      },
    ],
  },
  networks: {
    hardhat: {},
    ...{pulseTestnet}
  }
};

export default config;
