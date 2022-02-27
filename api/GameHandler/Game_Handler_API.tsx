const ethers = require('ethers');
var bodyParser = require('body-parser')
var app = require('express')();
const cors = require('cors');
var http = require('http').createServer(app);
const LinkInterface = require('./ChainLink_Interface');
const CoinFipInterface = require('./CoinFlip_Interface');
const FirebaseProject = require('./firebase-config');
const firestore = require('firebase/firestore');

require('dotenv').config();
app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_URL);
const signer = new ethers.Wallet(process.env.SERVER_PHRASE, provider);
const abi = JSON.parse(LinkInterface._abi_two.result);
const ChainLinkContract = new ethers.Contract(LinkInterface.linkAddress, abi, signer); // add this later ?
const coinflipsCollectionRef = firestore.collection(FirebaseProject.db, "coinflips");    

app.post('/fundGame', async (req, res) => {
    console.log("Request Body", req.body)
    if (req.body.contractAddress) {
      const chainLinkTxn_FundGame = await ChainLinkContract.transfer(req.body.contractAddress, ethers.utils.parseUnits("0.1"));
      console.log(chainLinkTxn_FundGame)
    }
})


async function listenForWinner() { // Currently only updates winner --> Need to update User + Site winnings.
  const gamesQuery = firestore.query(coinflipsCollectionRef, firestore.where("winner", "==", "0"));
  const querySnapshot = await firestore.getDocs(gamesQuery);
  querySnapshot.forEach(async (doc) => {
    console.log(doc.id, " => ", doc.data());
    const coinFlipGameInstance = new ethers.Contract(doc.data().contractAddress, CoinFipInterface._CoinFlip_abi, provider)
    const gameInfo = await coinFlipGameInstance.getGameInfo();
    if (gameInfo.winner != "0x0000000000000000000000000000000000000000") {
      const coinFlipGameRef = firestore.doc(FirebaseProject.db, "coinflips", doc.data().contractAddress);
      await firestore.updateDoc(coinFlipGameRef, {
        winner: gameInfo.winner
      }).then(async () => {
        const winnerRef = firestore.doc(FirebaseProject.db, "users", gameInfo.winner.toLowerCase());
        await firestore.updateDoc(winnerRef, {
          totalWinnings: firestore.increment((parseFloat(gameInfo.buyInPrice) * 2).toFixed(2))
        });
    })
    }
  });
}


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

listenForWinner();
module.exports = app;


