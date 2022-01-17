export const _Raffle_abi = [
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_creatorAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_minDeposit",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_tokenURI",
          "type": "string"
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
      "inputs": [],
      "name": "MIN_DEPOSIT",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tickets",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
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
      "name": "getRandomNumber",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWinner",
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
      "inputs": [],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "winner",
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
      "inputs": [],
      "name": "withdrawEther",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

export const _Raffle_bytecode = 
"0x60c06040526000600160146101000a81548160ff0219169083151502179055503480156200002c57600080fd5b50604051620016eb380380620016eb833981810160405281019062000052919062000476565b73f64cc5d9dc2a6245dee28686342cdef6f41d2d5b7301be23585060835e02b77ef475b0cc51aa1e07098173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050505082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160028190555080600390805190602001906200014692919062000189565b507f2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c131160001b60068190555067016345785d8a000060058190555050505062000556565b828054620001979062000520565b90600052602060002090601f016020900481019282620001bb576000855562000207565b82601f10620001d657805160ff191683800117855562000207565b8280016001018555821562000207579182015b8281111562000206578251825591602001919060010190620001e9565b5b5090506200021691906200021a565b5090565b5b80821115620002355760008160009055506001016200021b565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200027a826200024d565b9050919050565b6200028c816200026d565b81146200029857600080fd5b50565b600081519050620002ac8162000281565b92915050565b6000819050919050565b620002c781620002b2565b8114620002d357600080fd5b50565b600081519050620002e781620002bc565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200034282620002f7565b810181811067ffffffffffffffff8211171562000364576200036362000308565b5b80604052505050565b60006200037962000239565b905062000387828262000337565b919050565b600067ffffffffffffffff821115620003aa57620003a962000308565b5b620003b582620002f7565b9050602081019050919050565b60005b83811015620003e2578082015181840152602081019050620003c5565b83811115620003f2576000848401525b50505050565b60006200040f62000409846200038c565b6200036d565b9050828152602081018484840111156200042e576200042d620002f2565b5b6200043b848285620003c2565b509392505050565b600082601f8301126200045b576200045a620002ed565b5b81516200046d848260208601620003f8565b91505092915050565b60008060006060848603121562000492576200049162000243565b5b6000620004a2868287016200029b565b9350506020620004b586828701620002d6565b925050604084015167ffffffffffffffff811115620004d957620004d862000248565b5b620004e78682870162000443565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200053957607f821691505b6020821081141562000550576200054f620004f1565b5b50919050565b60805160a0516111616200058a6000396000818161036e015261074b0152600081816105a3015261070f01526111616000f3fe6080604052600436106100865760003560e01c806394985ddd1161005957806394985ddd14610123578063b6b55f251461014c578063dbdff2c114610168578063dfbf53ae14610193578063e1e158a5146101be57610086565b806312065fe01461008b5780633c130d90146100b65780637362377b146100e15780638e7ea5b2146100f8575b600080fd5b34801561009757600080fd5b506100a06101e9565b6040516100ad91906108e3565b60405180910390f35b3480156100c257600080fd5b506100cb610204565b6040516100d89190610997565b60405180910390f35b3480156100ed57600080fd5b506100f6610292565b005b34801561010457600080fd5b5061010d610342565b60405161011a91906109fa565b60405180910390f35b34801561012f57600080fd5b5061014a60048036038101906101459190610a7c565b61036c565b005b61016660048036038101906101619190610abc565b610408565b005b34801561017457600080fd5b5061017d61059c565b60405161018a9190610af8565b60405180910390f35b34801561019f57600080fd5b506101a861068f565b6040516101b591906109fa565b60405180910390f35b3480156101ca57600080fd5b506101d36106b5565b6040516101e091906108e3565b60405180910390f35b6000670de0b6b3a7640000476101ff9190610b71565b905090565b6003805461021190610bd1565b80601f016020809104026020016040519081016040528092919081815260200182805461023d90610bd1565b801561028a5780601f1061025f5761010080835404028352916020019161028a565b820191906000526020600020905b81548152906001019060200180831161026d57829003601f168201915b505050505081565b60011515600160149054906101000a900460ff161515146102e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102df90610c75565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f1935050505050565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103f190610ce1565b60405180910390fd5b61040482826106bb565b5050565b600034141561044c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044390610d4d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156104bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b390610db9565b60405180910390fd5b600034905034600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105109190610dd9565b9250508190555060005b828111610597576007339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808061058f90610e2f565b91505061051a565b505050565b60006005547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016105fa91906109fa565b602060405180830381865afa158015610617573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063b9190610e8d565b101561067c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067390610f06565b60405180910390fd5b61068a60065460055461070b565b905090565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b600060016014836106cc9190610f26565b6106d69190610dd9565b905080837fe72a3cc2cb1a8abfb84171b8a17176f3f5329a21fe39f427c27a41056a007d1260405160405180910390a3505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16634000aea07f00000000000000000000000000000000000000000000000000000000000000008486600060405160200161077f929190610f57565b6040516020818303038152906040526040518463ffffffff1660e01b81526004016107ac93929190610fd5565b6020604051808303816000875af11580156107cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ef919061104b565b506000610811846000306000808981526020019081526020016000205461085b565b90506001600080868152602001908152602001600020546108329190610dd9565b600080868152602001908152602001600020819055506108528482610897565b91505092915050565b6000848484846040516020016108749493929190611078565b6040516020818303038152906040528051906020012060001c9050949350505050565b600082826040516020016108ac9291906110ff565b60405160208183030381529060405280519060200120905092915050565b6000819050919050565b6108dd816108ca565b82525050565b60006020820190506108f860008301846108d4565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561093857808201518184015260208101905061091d565b83811115610947576000848401525b50505050565b6000601f19601f8301169050919050565b6000610969826108fe565b6109738185610909565b935061098381856020860161091a565b61098c8161094d565b840191505092915050565b600060208201905081810360008301526109b1818461095e565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109e4826109b9565b9050919050565b6109f4816109d9565b82525050565b6000602082019050610a0f60008301846109eb565b92915050565b600080fd5b6000819050919050565b610a2d81610a1a565b8114610a3857600080fd5b50565b600081359050610a4a81610a24565b92915050565b610a59816108ca565b8114610a6457600080fd5b50565b600081359050610a7681610a50565b92915050565b60008060408385031215610a9357610a92610a15565b5b6000610aa185828601610a3b565b9250506020610ab285828601610a67565b9150509250929050565b600060208284031215610ad257610ad1610a15565b5b6000610ae084828501610a67565b91505092915050565b610af281610a1a565b82525050565b6000602082019050610b0d6000830184610ae9565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610b7c826108ca565b9150610b87836108ca565b925082610b9757610b96610b13565b5b828204905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610be957607f821691505b60208210811415610bfd57610bfc610ba2565b5b50919050565b7f57495448445241573a204e4f5420414c4c4f57454420544f205749544844524160008201527f5700000000000000000000000000000000000000000000000000000000000000602082015250565b6000610c5f602183610909565b9150610c6a82610c03565b604082019050919050565b60006020820190508181036000830152610c8e81610c52565b9050919050565b7f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00600082015250565b6000610ccb601f83610909565b9150610cd682610c95565b602082019050919050565b60006020820190508181036000830152610cfa81610cbe565b9050919050565b7f4445504f5349543a20494e56414c49442046554e445300000000000000000000600082015250565b6000610d37601683610909565b9150610d4282610d01565b602082019050919050565b60006020820190508181036000830152610d6681610d2a565b9050919050565b7f4445504f5349543a20494e56414c494420414444524553530000000000000000600082015250565b6000610da3601883610909565b9150610dae82610d6d565b602082019050919050565b60006020820190508181036000830152610dd281610d96565b9050919050565b6000610de4826108ca565b9150610def836108ca565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610e2457610e23610b42565b5b828201905092915050565b6000610e3a826108ca565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610e6d57610e6c610b42565b5b600182019050919050565b600081519050610e8781610a50565b92915050565b600060208284031215610ea357610ea2610a15565b5b6000610eb184828501610e78565b91505092915050565b7f4e6f7420656e6f756768204c494e4b0000000000000000000000000000000000600082015250565b6000610ef0600f83610909565b9150610efb82610eba565b602082019050919050565b60006020820190508181036000830152610f1f81610ee3565b9050919050565b6000610f31826108ca565b9150610f3c836108ca565b925082610f4c57610f4b610b13565b5b828206905092915050565b6000604082019050610f6c6000830185610ae9565b610f7960208301846108d4565b9392505050565b600081519050919050565b600082825260208201905092915050565b6000610fa782610f80565b610fb18185610f8b565b9350610fc181856020860161091a565b610fca8161094d565b840191505092915050565b6000606082019050610fea60008301866109eb565b610ff760208301856108d4565b81810360408301526110098184610f9c565b9050949350505050565b60008115159050919050565b61102881611013565b811461103357600080fd5b50565b6000815190506110458161101f565b92915050565b60006020828403121561106157611060610a15565b5b600061106f84828501611036565b91505092915050565b600060808201905061108d6000830187610ae9565b61109a60208301866108d4565b6110a760408301856109eb565b6110b460608301846108d4565b95945050505050565b6000819050919050565b6110d86110d382610a1a565b6110bd565b82525050565b6000819050919050565b6110f96110f4826108ca565b6110de565b82525050565b600061110b82856110c7565b60208201915061111b82846110e8565b602082019150819050939250505056fea26469706673582212208194e593a328aade20ceaa29aeabd031a4eaa8b3969c9b15a418d868e056b6d964736f6c634300080b0033"