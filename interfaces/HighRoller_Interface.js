const _HighRoller_abi = 
[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      }
    ],
    "name": "WinnerPicked",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tickets",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_accountAddress",
        "type": "address"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGameInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
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
    "inputs": [],
    "name": "processGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "randomness",
        "type": "uint256"
      }
    ],
    "name": "rawFulfillRandomness",
    "outputs": [],
    "stateMutability": "nonpayable",
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
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]
module.exports = {
    _HighRoller_abi
}