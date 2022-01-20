export const _CoinFlip_abi = 
 [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_buyInPrice",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "valueBetween",
          "type": "uint256"
        }
      ],
      "name": "WinnerPicked",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "BUY_IN_PRICE",
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
      "name": "getGameInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "creatorAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "buyInPrice",
              "type": "uint256"
            }
          ],
          "internalType": "struct CoinFlip.GameInfo",
          "name": "",
          "type": "tuple"
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
    }
  ]


export const _CoinFlip_bytecode = "0x60c060405234801561001057600080fd5b506040516200121d3803806200121d8339818101604052810190610034919061018a565b73b3dccb4cf7a26f6cf6b120cf5a73875b7bbc655b7301be23585060835e02b77ef475b0cc51aa1e07098173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806005819055507f2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c131160001b60068190555067016345785d8a0000600481905550506101b7565b600080fd5b6000819050919050565b61016781610154565b811461017257600080fd5b50565b6000815190506101848161015e565b92915050565b6000602082840312156101a05761019f61014f565b5b60006101ae84828501610175565b91505092915050565b60805160a051611032620001eb6000396000818161021f0152610673015260008181610443015261063701526110326000f3fe6080604052600436106100705760003560e01c8063b6b55f251161004e578063b6b55f25146100f4578063b7a17c4c14610110578063dbdff2c11461013b578063dfbf53ae1461016657610070565b80631746bd1b146100755780638e7ea5b2146100a057806394985ddd146100cb575b600080fd5b34801561008157600080fd5b5061008a610191565b60405161009791906108ab565b60405180910390f35b3480156100ac57600080fd5b506100b56101f3565b6040516100c291906108d5565b60405180910390f35b3480156100d757600080fd5b506100f260048036038101906100ed9190610957565b61021d565b005b61010e60048036038101906101099190610997565b6102b9565b005b34801561011c57600080fd5b50610125610436565b60405161013291906109d3565b60405180910390f35b34801561014757600080fd5b5061015061043c565b60405161015d91906109fd565b60405180910390f35b34801561017257600080fd5b5061017b61052f565b60405161018891906108d5565b60405180910390f35b6101996107f2565b60006040518060400160405280600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160055481525090508091505090565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a290610a75565b60405180910390fd5b6102b58282610555565b5050565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610329576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032090610ae1565b60405180910390fd5b600034141561036d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036490610b4d565b60405180910390fd5b6005543410156103b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a990610bb9565b60405180910390fd5b60005b818111610432576007339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808061042a90610c08565b9150506103b5565b5050565b60055481565b60006004547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161049a91906108d5565b602060405180830381865afa1580156104b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104db9190610c66565b101561051c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051390610cdf565b60405180910390fd5b61052a600654600454610633565b905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060016007805490508361056a9190610d2e565b6105749190610d5f565b90506007818154811061058a57610589610db5565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fe72a3cc2cb1a8abfb84171b8a17176f3f5329a21fe39f427c27a41056a007d128382604051610626929190610de4565b60405180910390a1505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16634000aea07f0000000000000000000000000000000000000000000000000000000000000000848660006040516020016106a7929190610de4565b6040516020818303038152906040526040518463ffffffff1660e01b81526004016106d493929190610ea6565b6020604051808303816000875af11580156106f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107179190610f1c565b5060006107398460003060008089815260200190815260200160002054610783565b905060016000808681526020019081526020016000205461075a9190610d5f565b6000808681526020019081526020016000208190555061077a84826107bf565b91505092915050565b60008484848460405160200161079c9493929190610f49565b6040516020818303038152906040528051906020012060001c9050949350505050565b600082826040516020016107d4929190610fd0565b60405160208183030381529060405280519060200120905092915050565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061084d82610822565b9050919050565b61085d81610842565b82525050565b6000819050919050565b61087681610863565b82525050565b6040820160008201516108926000850182610854565b5060208201516108a5602085018261086d565b50505050565b60006040820190506108c0600083018461087c565b92915050565b6108cf81610842565b82525050565b60006020820190506108ea60008301846108c6565b92915050565b600080fd5b6000819050919050565b610908816108f5565b811461091357600080fd5b50565b600081359050610925816108ff565b92915050565b61093481610863565b811461093f57600080fd5b50565b6000813590506109518161092b565b92915050565b6000806040838503121561096e5761096d6108f0565b5b600061097c85828601610916565b925050602061098d85828601610942565b9150509250929050565b6000602082840312156109ad576109ac6108f0565b5b60006109bb84828501610942565b91505092915050565b6109cd81610863565b82525050565b60006020820190506109e860008301846109c4565b92915050565b6109f7816108f5565b82525050565b6000602082019050610a1260008301846109ee565b92915050565b600082825260208201905092915050565b7f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00600082015250565b6000610a5f601f83610a18565b9150610a6a82610a29565b602082019050919050565b60006020820190508181036000830152610a8e81610a52565b9050919050565b7f494e56414c494420414444524553530000000000000000000000000000000000600082015250565b6000610acb600f83610a18565b9150610ad682610a95565b602082019050919050565b60006020820190508181036000830152610afa81610abe565b9050919050565b7f494e56414c494420455448455200000000000000000000000000000000000000600082015250565b6000610b37600d83610a18565b9150610b4282610b01565b602082019050919050565b60006020820190508181036000830152610b6681610b2a565b9050919050565b7f494e56414c49442042555920494e205052494345000000000000000000000000600082015250565b6000610ba3601483610a18565b9150610bae82610b6d565b602082019050919050565b60006020820190508181036000830152610bd281610b96565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610c1382610863565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610c4657610c45610bd9565b5b600182019050919050565b600081519050610c608161092b565b92915050565b600060208284031215610c7c57610c7b6108f0565b5b6000610c8a84828501610c51565b91505092915050565b7f4e4f5420454e4f554748204c494e4b0000000000000000000000000000000000600082015250565b6000610cc9600f83610a18565b9150610cd482610c93565b602082019050919050565b60006020820190508181036000830152610cf881610cbc565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610d3982610863565b9150610d4483610863565b925082610d5457610d53610cff565b5b828206905092915050565b6000610d6a82610863565b9150610d7583610863565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610daa57610da9610bd9565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000604082019050610df960008301856109ee565b610e0660208301846109c4565b9392505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610e47578082015181840152602081019050610e2c565b83811115610e56576000848401525b50505050565b6000601f19601f8301169050919050565b6000610e7882610e0d565b610e828185610e18565b9350610e92818560208601610e29565b610e9b81610e5c565b840191505092915050565b6000606082019050610ebb60008301866108c6565b610ec860208301856109c4565b8181036040830152610eda8184610e6d565b9050949350505050565b60008115159050919050565b610ef981610ee4565b8114610f0457600080fd5b50565b600081519050610f1681610ef0565b92915050565b600060208284031215610f3257610f316108f0565b5b6000610f4084828501610f07565b91505092915050565b6000608082019050610f5e60008301876109ee565b610f6b60208301866109c4565b610f7860408301856108c6565b610f8560608301846109c4565b95945050505050565b6000819050919050565b610fa9610fa4826108f5565b610f8e565b82525050565b6000819050919050565b610fca610fc582610863565b610faf565b82525050565b6000610fdc8285610f98565b602082019150610fec8284610fb9565b602082019150819050939250505056fea2646970667358221220c931b34e48eaac64c3b04739d10bccc1b69513cbaf416a47dfed3f9cb99cfb2c64736f6c634300080b0033"
