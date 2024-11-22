/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY =
  "2d041360b03fdde44bfc595f200e7fbf1f10ebce40abff4ac66c3a17c92f9ffe";
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
