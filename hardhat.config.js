require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.NEXT_PUBLIC_MORALIS_SPEEDY_NODES_KEY}/polygon/mumbai`,
      accounts: [process.env.NEXT_PUBLIC_MUMBAI_PRIVATE_KEY],
    },
  }
};