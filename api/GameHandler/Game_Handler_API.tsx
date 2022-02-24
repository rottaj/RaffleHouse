const ethers = require('ethers');
var bodyParser = require('body-parser')
var app = require('express')();
const cors = require('cors');
var http = require('http').createServer(app);
const LinkInterface = require('../interfaces/ChainLink_Interface')
require('dotenv').config();
app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_URL);
const signer = new ethers.Wallet(process.env.SERVER_PHRASE, provider);
const abi = JSON.parse(LinkInterface._abi_two.result);
const ChainLinkContract = new ethers.Contract(LinkInterface.linkAddress, abi, signer); // add this later ?

app.post('/fundGame', async (req, res) => {
    console.log(req.body)
    if (req.body.contractAddress) {
      const chainLinkTxn_FundGame = await ChainLinkContract.transfer(req.body.contractAddress, ethers.utils.parseUnits("0.1"));
      console.log(chainLinkTxn_FundGame)
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;

