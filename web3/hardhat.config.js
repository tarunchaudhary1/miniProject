/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY =
  "0c009643f6b00f74b452c02ff26cf24f40e08f4695b967866c2f5276b00c9fa7";
const RPC_URL =
  "https://polygon-amoy.g.alchemy.com/v2/3eRv_Ti5lTvq-TnLGYm2hgfAHLEZ9GEs";

module.exports = {
  defaultNetwork: "polygon_amoy",
  networks: {
    hardhat: {},
    polygon_amoy: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
