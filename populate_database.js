const { Pool, Client } = require('pg');
const ethers = require('ethers');
const https = require('https');

const { _abi, address } = require('./interfaces/Eyescream_Interface.js');

require('dotenv').config();
const RINKEBY_URL = process.env.RINKEBY_URL;
const pool = new Pool({
  host: '127.0.0.1',
  database: 'tokenlotto',
  port: 5432,
});
var provider = new ethers.providers.JsonRpcProvider(RINKEBY_URL);
const signer = provider.getSigner();
console.log("TESTING", signer);

async function getContract() {
  var contract = new ethers.Contract(address, _abi, signer);
  return contract
}

async function getTokens(contract) {
  const totalAmount = await contract.totalSupply();
  return totalAmount
}

async function getMetaData(contract, totalSupply) {
  for (let i=1; i<=totalSupply-1; i++ ) {
  console.log("TOKEN ID ", i)
  try {
    let metaData = await contract.tokenURI(i);
      console.log(metaData);
      pool.query(`INSERT INTO Eyescream(id, Metadata) VALUES($1, $2)`, [i, metaData], (err, res) => {
        console.log(err, res);
      })
    } catch (error) {
      console.log(error);
    }
  } 
}

//var contract = getContract();
var contract = new ethers.Contract(address, _abi, provider);
console.log(contract);
var totalAmount = getTokens(contract).then(res => {
  console.log(parseInt(res, 16))
  getMetaData(contract, parseInt(res, 16)); 
});
console.log(totalAmount);

/*
pool.query('SELECT * FROM Eyescream', (err, res) => {
  console.log(err, res);
})
*/
