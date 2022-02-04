// THIS IS THE MAIN WALLET / API FOR HIGH ROLLERS GAME.
// WALLET REQUIRES ETH & LINK TO OPERATE W/ CONTRACTS.
// EDIT PHRASE IN .ENV TO CHANGE WALLET ADDRESS.


const ethers = require('ethers');
const HighRollers_Interface = require("./interfaces/HighRollers_Interface");
const HighRoller_Interface = require("./interfaces/HighRoller_Interface");
const request = require('request');
const cors = require('cors');
var bodyParser = require('body-parser')
var app = require('express')();
var http = require('http').createServer(app);
require('dotenv').config();
app.use(cors());
var jsonParser = bodyParser.json();

// GLOBAL VARIABLES
const RINKEBY_URL = process.env.RINKEBY_URL;
const PHRASE = process.env.SERVER_PHRASE; // Node Server

const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI';

var provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_URL);
const signer = new ethers.Wallet(PHRASE, provider);

/*
const pool = new Pool({
  host: '127.0.0.1',
  database: 'rafflehouse',
  port: 5432,
});
*/
// START OF API ROUTES

http.listen(8080, () => {
  console.log("Listening on port 8080");
})

app.post('/submit-tickets-high-rollers', jsonParser, function (req, res) { // Create submit tickets route.
  console.log("SUBMIT HIGH ROLLERS", req.body);
  submitTickets(req.body.tickets, req.body.playerAddress); //  need to add authentication to prevent frontend smuggling
  
})

// END OF API ROUTES


// START OF HELPER FUNCTIONS
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

// END OF HELPER FUNCTIONS

async function updateGameStatus() {
    const HighRollersContract = new ethers.Contract(HighRollers_Interface.HighRollersAddress, HighRollers_Interface._HighRollers_abi, signer);
    await HighRollersContract.updateStatus();
}

// START MAIN  FUNCTIONS
async function submitTickets(ticketCount, playerAddress) { // Call when user deposits NFT --> Grab value from opensea api --> Push ticket count to Tickets[]
    getContract().then(async function(currentGame) {
      const currentGameContract = new ethers.Contract(currentGame.contractAddress, HighRoller_Interface._HighRoller_abi, signer); // Initialize current game
      const submitTicketTxn = await currentGameContract.deposit(ticketCount, playerAddress);
      submitTicketTxn.wait();
      console.log(`SUBMITTED PLAYER ${playerAddress} TICKETS. \n TXN: `, submitTicketTxn)
      //const processGameTxn = currentGameContract.processGame(); // JUST FOR TESTING (WILL BE INTERVAL)
    })
}


async function withDrawToWinner() { // Call when winner game is over --> Withdraws all ERC721 tokens in current game to winner address.
  getContract().then(async function(currentGame) {
    var url = ETHERSCAN_API_NFT_TXN + currentGame.contractAddress + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
    const currentGameContract = new ethers.Contract(currentGame.contractAddress, HighRoller_Interface._HighRoller_abi, signer); // Initialize current game
    //const gameInfo = await currentGameContract.getGameInfo();
    if (currentGame.winner != "0x0000000000000000000000000000000000000000") {
      var tokens = []; // maybe keep json request length as variable? ( To make this suck even more )
      request(url, async function(error, response, body) {
        let json = JSON.parse(response.body);
        console.log(json.result)
        for (let key in json.result) {
          let index = tokens.findIndex(temp => (temp['tokenID'] === json.result[key]['tokenID']) && (temp['contractAddress'] === json.result[key]['contractAddress']));
          if (index === -1) {
              tokens.push(json.result[key])
          } else {
              tokens.splice(index, 1)
          }
        }
        for (let token in tokens) {
          if (tokens[token]) { // Just for testing now
            console.log("Sending NFT", tokens[token])
            const withDrawNFTTxn = await currentGameContract.withDrawNFT(tokens[token].contractAddress, tokens[token].tokenID)
            withDrawNFTTxn.wait();
          } //catch( err ) { console.log("Err", err )} // Just for now
        }
        updateGameStatus() // THIS WHOLE FUNCTION FUCKING SUCKS.... I SUCK
      })
    }
  })

}

async function processCurrentGame() {
  const HighRollersContract = new ethers.Contract(HighRollers_Interface.HighRollersAddress, HighRollers_Interface._HighRollers_abi, signer);
  await HighRollersContract.getCurrentGame().then(async function(currentGame) {

    const currentGameContract = new ethers.Contract(currentGame.contractAddress, HighRoller_Interface._HighRoller_abi, signer); // Initialize current game
    const gameInfo = await currentGameContract.getGameInfo();
    console.log(currentGame)
    console.log("TESTING GAMEINFO", gameInfo.winner)
    console.log("TESTING CURRENTGAME", currentGame.winner)
    console.log("TESTING STATUS", currentGame.status)
    if (currentGame.winner !== undefined) {
      if (currentGame.winner === "0x0000000000000000000000000000000000000000" || currentGame.status === 1) {
        console.log("PROCESSING GAME")
        const HighRollersProcessTxn = await HighRollersContract.processCurrentGame();
        HighRollersProcessTxn.wait()
      }

      else {
        console.log("WITHDRAWING TOKENS")
        await withDrawToWinner();
      }
    }

  });


}
// END OF MAIN FUNCTIONS

// BUILD INTERVAL FUNCTIONS TO CHECK TIME LIMIT
setInterval(async function() { // Call Every minute
  await processCurrentGame().then(function(txn) {
    console.log("PROCESSING GAME")
  });
//}, 2000)
}, 30000)
//}, 180000)

