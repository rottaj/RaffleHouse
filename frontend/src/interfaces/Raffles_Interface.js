export const RafflesAddress = "0x6A115Af943FA33312f7596a8c58222Ac8ABFF9F8" 
export const _abi_raffles =  
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_collectionAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_collectionName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_tokenID",
        "type": "uint256"
      }
    ],
    "name": "addRaffle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getRaffleByIndex",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creatorAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "collectionAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "collectionName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "tokenID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minTime",
            "type": "uint256"
          }
        ],
        "internalType": "struct Raffles.Raffle",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRaffles",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
    "name": "raffles",
    "outputs": [
      {
        "internalType": "address",
        "name": "creatorAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "collectionAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "collectionName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "removeRaffleByIndex",
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