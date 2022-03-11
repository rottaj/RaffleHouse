// THIS IS THE MAIN WALLET / API FOR HIGH ROLLERS GAME.
// WALLET REQUIRES ETH & LINK TO OPERATE W/ CONTRACTS.
// EDIT PHRASE IN .ENV TO CHANGE WALLET ADDRESS.

const ethers = require('ethers');
const HighRoller_Interface = require("./HighRoller_Interface");
const LinkInterface = require("./ChainLink_Interface");
const request = require('request');
const cors = require('cors');
const FirebaseProject = require('./firebase-config');
const firestore = require('firebase/firestore');
var bodyParser = require('body-parser')
var app = require('express')();
var http = require('http').createServer(app);
require('dotenv').config();
app.use(cors());
app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

      //const playersSnap = await firestore.getDoc(currentGameRef, "players");

// GLOBAL VARIABLES
const RINKEBY_URL = process.env.RINKEBY_URL;
const PHRASE = process.env.SERVER_PHRASE; // Node Server

const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI';

var provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_URL);
const signer = new ethers.Wallet(PHRASE, provider);
const highRollersCollectionRef = firestore.collection(FirebaseProject.db, "highrollers");    

http.listen(8080, () => {
  console.log("Listening on port 8080");
})

app.post('/submit-tickets-high-rollers', function (req, res) { // Create submit tickets route.
  console.log("SUBMIT HIGH ROLLERS", req.body.token, req.body.playerAddress);
  submitTickets(req.body.token, req.body.playerAddress); //  need to add authentication to prevent frontend smuggling
  
})

async function getCurrentGame() { // GET CURRENT GAME CONTRACT { GAME INFO }
  //const HighRollersContract = new ethers.Contract(HighRollers_Interface.HighRollersAddress, HighRollers_Interface._HighRollers_abi, provider);
  //const currentHighRollerGame = await HighRollersContract.getCurrentGame();
  const gamesQuery = firestore.query(highRollersCollectionRef, firestore.where("winner", "==", "0")); // using winner for now... will add times later.
  const querySnapshot = await firestore.getDocs(gamesQuery);
  console.log("QUERYSNAPSHOT", querySnapshot.docs)
  const currentHighRollerGame = querySnapshot.docs[0].data();
  return currentHighRollerGame
}

async function submitTickets(token, playerAddress) { // Call when user deposits NFT --> Grab value from opensea api --> Push ticket count to Tickets[]
    getCurrentGame().then(async function(currentGame) {
      const currentGameContract = new ethers.Contract(currentGame.contractAddress, HighRoller_Interface._HighRoller_abi, signer); // Initialize current game
      const submitTicketTxn = await currentGameContract.deposit(parseInt(String(parseFloat(token.tokenPrice) *100)), playerAddress, token.image);
      submitTicketTxn.wait();
      console.log(`SUBMITTED PLAYER ${playerAddress} TICKETS`)

      const currentGameRef = firestore.doc(highRollersCollectionRef, currentGame.contractAddress);
      await firestore.updateDoc(currentGameRef, {
        gameTokens: firestore.arrayUnion(token)
      });

      await firestore.updateDoc(currentGameRef, {
        [`players.${playerAddress}`]: {
          tokens: firestore.increment(1),
          totalDeposited: firestore.increment(token.tokenPrice)
        }
      })
      //const processGameTxn = currentGameContract.processGame(); // JUST FOR TESTING (WILL BE INTERVAL)
    })
}



async function withDrawToWinner() { // Call when winner game is over --> Withdraws all ERC721 tokens in current game to winner address.
  getCurrentGame().then(async function(currentGame) {
    var url = ETHERSCAN_API_NFT_TXN + currentGame.contractAddress + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
    const currentGameContract = new ethers.Contract(currentGame.contractAddress, HighRoller_Interface._HighRoller_abi, signer); // Initialize current game
    const gameInfo = await currentGameContract.getGameInfo();
    if (gameInfo.winner != "0x0000000000000000000000000000000000000000") {
      console.log("FOOOBAR")
      //var tokens = currentGame.gameTokens; 
      var tokens = [];
      ///*
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
        //*/
        for (let token in tokens) {
          if (tokens[token]) { // Just for testing now
            console.log("Sending NFT", tokens[token])
            const withDrawNFTTxn = await currentGameContract.withDrawNFT(tokens[token].contractAddress, tokens[token].tokenID)
            withDrawNFTTxn.wait();
          } //catch( err ) { console.log("Err", err )} // Just for now
        }
      })
    }
  })

}

async function processCurrentGame() {
  getCurrentGame().then(async function(currentGame) {
    console.log("CURRENT GAME ADDRESS", currentGame.contractAddress)
    const currentGameContract = new ethers.Contract(currentGame.contractAddress, HighRoller_Interface._HighRoller_abi, signer); // Initialize current game
    const gameInfo = await currentGameContract.getGameInfo();
    //console.log(currentGame)
    console.log("TESTING GAMEINFO", gameInfo.winner)
    console.log("TESTING CURRENTGAME", currentGame.winner)
    console.log("TESTING STATUS", currentGame.status)

  
   console.log(gameInfo)
    if (gameInfo.winner === "0x0000000000000000000000000000000000000000" || currentGame.status === 1) {
      console.log("PROCESSING GAME", currentGame.contractAddress)
      const ProcessCurrentGameTxn = await currentGameContract.processGame();
      ProcessCurrentGameTxn.wait();
    }
    else { // If a winner has been picked through VRF
      console.log("WITHDRAWING TOKENS")
      await withDrawToWinner().then(async () => {;
      const currentGameRef = firestore.doc(FirebaseProject.db, "highrollers", currentGame.contractAddress);
        // Update winner address in firestore

        await deployNewGame().then(async () => {
          await firestore.updateDoc(currentGameRef, {
            winner: gameInfo.winner
          });
        });
      })
    }

  });


}

async function deployNewGame() {
  const HighRollerFactory = new ethers.ContractFactory(
    HighRoller_Interface._HighRoller_abi,
    HighRoller_Interface._HighRoller_bytecode,
    signer
  ); 
  // DEPLOY CONTRACT
  const contract = await HighRollerFactory.deploy(); 
  await contract.deployed()
  console.log("\n\nHIGH ROLLERS CONTRACT DEPLOYED TO: ", contract.address);

  // SEND ETH AND LINK TO HIGHROLLERS CONTRACT
  const ether_tx_HighRollers = { 
    from: signer.address,
    to: contract.address,
    value: ethers.utils.parseEther ( "0.2" ) ,
    gasLimit: ethers.utils.hexlify( 2100000 ) , // 100000 
    gasPrice: 8000000000 ,
  };


  console.log("SIGNER ADDRESS", signer.address);
  console.log("HIGH ROLLER ADDRESS", contract.address);
  const ethTxn = await signer.sendTransaction ( ether_tx_HighRollers ).then( ( transaction ) => {  
    console.log("SENT ETHER TO HIGHROLLERS")
  });
  await firestore.setDoc(firestore.doc(FirebaseProject.db, "highrollers", contract.address), {
    contractAddress: contract.address,
    gameTokens: [],
    players: {},
    winner: "0"
  });
}

// END OF MAIN FUNCTIONS

// BUILD INTERVAL FUNCTIONS TO CHECK TIME LIMIT
setInterval(async function() { // Call Every minute
  await processCurrentGame().then(function(txn) {
    console.log("PROCESSING GAME")
  });
//}, 2000)
}, 10000)
//}, 60000)
//}, 180000)
