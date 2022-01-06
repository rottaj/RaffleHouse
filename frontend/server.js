const https = require('https');
const options = {
  host: 'api-rinkeby.etherscan.io',
  port: 443,
  path: '/api?module=account&action=tokennfttx&address=0xB702DC679dCe8d27c77AC49A63B9A138B674929E&startblock=0&endblock=999999999&sort=asc&apikey=JPARDRW9CAVF9ZKISWVC3YYM6RP93JNQUC',
  method: 'GET'
}

requestData = []
const req = https.request(options, res => {
  console.log(`Status:  ${res.statusCode}`);
  res.on('data', d => {

    const test = process.stdout.write(d);
    const data = JSON.parse(test);
    console.log(data,);
    requestData.push(data);
  });
});

req.on('error', error => {
  console.log(error)
});

req.end()

console.log(requestData, requestData.length);

for (let i=0; i<=requestData.length; i++) {
  console.log(requestData[i], '\n\n\n');
}
