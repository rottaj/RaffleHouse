const LinkInterface = require('../interfaces/ChainLink_Interface');
const fs = require('fs');
const Web3 = require('web3');
const ethers = require('ethers');

require('dotenv').config()
const RINKEBY_URL = process.env.RINKEBY_URL;


const main = async() => {
  const abi = JSON.parse(LinkInterface._abi_two.result);
  const provider = new ethers.providers.JsonRpcProvider(RINKEBY_URL);
  const signer = provider.getSigner()
  console.log("SIGNER", signer)
  console.log("LINK INTERFACE: ", abi);
  console.log("LINK ADDRESS: ", LinkInterface.linkAddress);
  //const ChainLinkContract = new ethers.Contract(LinkInterface.linkAddress, abi, signer); // add this later ?
  //console.log("LINK CONTRACT", ChainLinkContract); 
  // INITIALIZE RAFFLES CONTRACT
  const rafflesContractFactory = await hre.ethers.getContractFactory("Raffles");
  const RafflesContract = await rafflesContractFactory.deploy(LinkInterface.linkAddress);
  await RafflesContract.deployed();
  console.log("RAFFLES CONTRACT DEPLOYED TO: ", RafflesContract.address);
  const coinFlipsContractFactory = await hre.ethers.getContractFactory("CoinFlips");
  const CoinFlipsContract = await coinFlipsContractFactory.deploy(LinkInterface.linkAddress);
  await CoinFlipsContract.deployed();
  console.log("\n\nCOIN FLIPS CONTRACT DEPLOYED TO: ", CoinFlipsContract.address);
 

  /* // WORK ON THIS LATER  ---> MANUALLY SEND LINK FOR NOW.
  const address = RafflesContract.address;
  console.log("RAFFLES ADDRESS: ", address);
  console.log(signer);
  const ChainLinkTransferTxn = await ChainLinkContract.transfer(address, parseInt(10));
  console.log("TRANSFER COMPLETE!");
  */
  let txn;
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log("ERROR", error);
    process.exit(1);
  }

}
runMain();
