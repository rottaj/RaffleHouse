const LinkInterface = require('../interfaces/ChainLink_Interface');
const HighRoller_Interface = require('../interfaces/HighRoller_Interface')
const ethers = require('ethers');

require('dotenv').config()
const RINKEBY_URL = process.env.RINKEBY_URL;
const PHRASE = process.env.SERVER_PHRASE;

const main = async() => {
  const abi = JSON.parse(LinkInterface._abi_two.result);
  const provider = new ethers.providers.JsonRpcProvider(RINKEBY_URL);
  const signer = new ethers.Wallet(PHRASE, provider);

  const ChainLinkContract = new ethers.Contract(LinkInterface.linkAddress, abi, signer); // add this later ?

  console.log("SIGNER", signer)
  console.log("LINK INTERFACE: ", abi);
  console.log("LINK ADDRESS: ", LinkInterface.linkAddress);
  //console.log("LINK CONTRACT", ChainLinkContract); 
  // INITIALIZE RAFFLES CONTRACT
/*
  const HighRollerFactory = new ethers.ContractFactory(
    HighRoller_Interface._HighRoller_abi,
    HighRoller_Interface._HighRoller_bytecode,
    signer
  ); 
  */
  // DEPLOY CONTRACT
  const HighRollerFactory = await hre.ethers.getContractFactory("HighRoller");
  const contract = await HighRollerFactory.deploy(); 
  await contract.deployed()
  console.log("\n\nHIGH ROLLERS CONTRACT DEPLOYED TO: ", contract.address);

  // SEND ETH AND LINK TO HIGHROLLERS CONTRACT
  const ether_tx_HighRollers = { 
    from: signer.address,
    to: contract.address,
    value: ethers.utils.parseEther ( "0.02" ) ,
    gasLimit: ethers.utils.hexlify( 2100000 ) , // 100000 
    gasPrice: 8000000000 ,
  };

  console.log("SIGNER ADDRESS", signer.address);
  console.log("HIGH ROLLER ADDRESS", contract.address);
  const ethTxn = await signer.sendTransaction ( ether_tx_HighRollers ).then( ( transaction ) => {  
    console.log("SENT ETHER TO HIGHROLLER")
  });

  const chainLinkTxn_CoinFlips = await ChainLinkContract.transfer(contract.address, ethers.utils.parseUnits("0.1"));
  console.log("\n SENT LINK TO HIGHROLLER")

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
