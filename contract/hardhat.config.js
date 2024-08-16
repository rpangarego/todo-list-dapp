require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/OReyXqKm2JQMGeGpS2Gx0YhOR_xu76LW",
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    },
  },
};
