const https = require('https');
const request = require('request');
const ethers = require('ethers');
const HighRollers_Interface = require("./interfaces/HighRollers_Interface");
const HighRoller_Interface = require("./interfaces/HighRoller_Interface");
require('dotenv').config();


const RINKEBY_URL = process.env.RINKEBY_URL;
const PHRASE = process.env.PHRASE;

const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI';


/*
const pool = new Pool({
  host: '127.0.0.1',
  database: 'rafflehouse',
  port: 5432,
});
*/


var provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_URL);
const signer = new ethers.Wallet(PHRASE, provider);
console.log("PROVIDER", provider)

async function fetchNFTs(address) { // GET CURRENT NFT'S IN CONTRACT
  var url = ETHERSCAN_API_NFT_TXN + address + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
  var tokens = {}
  request(url, function(error, response, body) {
    let json = JSON.parse(response.body);
    tokens = json.result;
    return tokens;
  })
}

async function getContract() { // GET CURRENT GAME CONTRACT { GAME INFO }
  const HighRollersContract = new ethers.Contract(HighRollers_Interface.HighRollersAddress, HighRollers_Interface._HighRollers_abi, provider);
  const currentHighRollerGame = await HighRollersContract.getCurrentGame();
  return currentHighRollerGame
}

// MAIN  FUNCTIONS



async function withDrawToWinner() { // Call when winner game is over --> Withdraws all ERC721 tokens in current game to winner address.
  getContract().then(function(currentGame) {
    console.log(currentGame)
    console.log(currentGame.contractAddress)
    var url = ETHERSCAN_API_NFT_TXN + currentGame.contractAddress + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
    console.log("TESTING", currentGame.contractAddress)
    const currentGameContract = new ethers.Contract(currentGame.contractAddress, HighRoller_Interface._HighRoller_abi, signer); // Initialize current game
    request(url, async function(error, response, body) {
      let json = JSON.parse(response.body);
      console.log(json.result)
      for (let key in json.result) {
        console.log(key, json.result[key])
        await currentGameContract.withDrawNFT(json.result[key].contractAddress, json.result[key].tokenID)
      }
    })
  });
}

withDrawToWinner();


