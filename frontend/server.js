const https = require('https');
const ethers = require('ethers');
require('dotenv').config();

var provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_URL);
console.log("PROVIDER", provider)
const options = {
  host: 'api-rinkeby.etherscan.io',
  port: 443,
  path: '/api?module=account&action=tokennfttx&address=0xB702DC679dCe8d27c77AC49A63B9A138B674929E&startblock=0&endblock=999999999&sort=asc&apikey=JPARDRW9CAVF9ZKISWVC3YYM6RP93JNQUC',
  method: 'GET'
}

requestData = []
var data = ''
var tokenIds = []
const req = https.request(options, res => {
  res.on('data', d => {
    data += d
  });
  res.on('end', function () {
    data = JSON.parse(data)
    jsonData = data[Object.keys(data)[2]]

    for (key in jsonData) {
      //console.log(key, jsonData[key])
      tokenIds.push(jsonData[key]['tokenID']) 
    }
    console.log(data)
    console.log(tokenIds) // from here remove duplicate values.
  });
});

req.on('error', error => {
  console.log(error)
});

req.end()
