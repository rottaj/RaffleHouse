const ethers = require('ethers');
var bodyParser = require('body-parser')
var app = require('express')();
var http = require('http').createServer(app);
const LinkInterface = require('../interfaces/ChainLink_Interface')


const provider:any = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_URL);
const signer = new ethers.Wallet(process.env.SERVER_PHRASE, provider);
const abi = JSON.parse(LinkInterface._abi_two.result);
const ChainLinkContract = new ethers.Contract(LinkInterface.linkAddress, abi, signer); // add this later ?


app.get('/fundCoinFlipGame', async (req, res) => {
    const chainLinkTxn_HighRollers = await ChainLinkContract.transfer(req.body.contractAddress, ethers.utils.parseUnits("1"));
    console.log(chainLinkTxn_HighRollers)
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

