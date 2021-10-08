const { task, types } = require("hardhat/config");
const { getContract } = require("@nomiclabs/hardhat-ethers");


task("mint", "Mint an NFT")
  .addParam("tokenUri", "Your ERC721 Token URI", undefined, types.string)
  .setAction(async (tokenUri, hre) => {
    return getContract("Token", hre)
      .then((contract) => {
        return contract.mintNFT(env("ETH_PUBLIC_KEY"), tokenUri, {
          gasLimit: 500_000,
        });
      })
      .then((tr) => {
        process.stdout.write(`TX hash: ${tr.hash}`);
      });
  });