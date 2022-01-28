const _HighRoller_abi = 
 [
   {
      "inputs": [],
      "name": "getGameInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "timeLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "winner",
              "type": "address"
            }
          ],
          "internalType": "struct HighRoller.GameInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_collectionAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenID",
          "type": "uint256"
        }
      ],
      "name": "withDrawNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

module.exports = {
    _HighRoller_abi
}