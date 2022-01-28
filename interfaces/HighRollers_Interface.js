const HighRollersAddress = "0xaF108963649b90c38aAB6C3f9C598e92F1Bc45bE"

const _HighRollers_abi = 
[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_chainLinkContractAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "addCurrentGameToPastGames",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_contractAddress",
          "type": "address"
        }
      ],
      "name": "createNewHighRollerGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentHighRollerGame",
      "outputs": [
        {
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "timeLimit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentGame",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "contractAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timeLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            }
          ],
          "internalType": "struct HighRollers.HighRollerGame",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "pastGames",
      "outputs": [
        {
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "timeLimit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "processCurrentGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
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
  HighRollersAddress,
  _HighRollers_abi
}