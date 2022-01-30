const LinkInterface = require('../interfaces/ChainLink_Interface');
const fs = require('fs');
const Web3 = require('web3');
const ethers = require('ethers');
const { parseEther } = require('ethers/lib/utils');

require('dotenv').config()
const RINKEBY_URL = process.env.RINKEBY_URL;
const PHRASE = process.env.PHRASE;

const main = async() => {
  const abi = JSON.parse(LinkInterface._abi_two.result);
  const provider = new ethers.providers.JsonRpcProvider(RINKEBY_URL);
  const signer = new ethers.Wallet(PHRASE, provider);

  const ChainLinkContract = new ethers.Contract(LinkInterface.linkAddress, abi, signer); // add this later ?

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


  const highRollersContractFactory = await hre.ethers.getContractFactory("HighRollers");
  const HighRollersContract = await highRollersContractFactory.deploy(LinkInterface.linkAddress);
  await HighRollersContract.deployed();
  console.log("\n\nHIGH ROLLERS CONTRACT DEPLOYED TO: ", HighRollersContract.address);

  // SEND ETH AND LINK TO HIGHROLLERS CONTRACT
  const ether_tx = { 
    from: signer.address,
    to: HighRollersContract.address,
    value: ethers.utils.parseEther ( "0.2" ) ,
    gasLimit: ethers.utils.hexlify( 2100000 ) , // 100000 
    gasPrice: 8000000000 ,
  };


  console.log("SIGNER ADDRESS", signer.address);
  console.log("HIGH ROLLER ADDRESS", HighRollersContract.address);
  const ethTxn = await signer.sendTransaction ( ether_tx ).then( ( transaction ) => {  
    console.log("SENT ETHER TO HIGHROLLERS")
  });

  ChainLinkContract.transfer(HighRollersContract.address, ethers.utils.parseUnits("0.2"));


  // SEND ETH & LINK TO FIRST GAME

  const startingGame = await HighRollersContract.getCurrentGame();
  const ether_tx_two = { 
    from: signer.address,
    to: startingGame.contractAddress,
    value: ethers.utils.parseEther ( "0.1" ) ,
    gasLimit: ethers.utils.hexlify( 2100000 ) , // 100000 
    gasPrice: 8000000000 ,
  };


   const ethTxnTwo = await signer.sendTransaction ( ether_tx_two ).then( ( transaction ) => {  
    console.log("SENT ETHER TO STARTING GAME", startingGame.contractAddress)
  });

  ChainLinkContract.transfer(startingGame.contractAddress, ethers.utils.parseUnits("0.1"));
  console.log("HIGH ROLLERS DEPLOYMENT FINISHED")
 



  const messagesContractFactory = await hre.ethers.getContractFactory("Messages");
  const MessagesContract = await messagesContractFactory.deploy();
  await MessagesContract.deployed();
  console.log("\n\nMESSAGES CONTRACT DEPLOYED TO: ", MessagesContract.address);



 


 

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
