import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config({ path: require('find-config')('.env') })

const pulseTestnet: NetworkUserConfig = {
  url: 'https://rpc.v4.testnet.pulsechain.com',
  chainId: 943,
  accounts: [process.env.KEY_PULSE_TESTNET!],
}

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ...(process.env.KEY_PULSE_TESTNET && {pulseTestnet}),
  },
};

export default config;
