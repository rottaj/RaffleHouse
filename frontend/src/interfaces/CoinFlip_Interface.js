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
      "inputs": [],
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
export const _CoinFlip_bytecode = "0x60c060405234801561001057600080fd5b50604051620012dd380380620012dd8339818101604052810190610034919061018a565b73b3dccb4cf7a26f6cf6b120cf5a73875b7bbc655b7301be23585060835e02b77ef475b0cc51aa1e07098173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806005819055507f2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c131160001b60068190555067016345785d8a0000600481905550506101b7565b600080fd5b6000819050919050565b61016781610154565b811461017257600080fd5b50565b6000815190506101848161015e565b92915050565b6000602082840312156101a05761019f61014f565b5b60006101ae84828501610175565b91505092915050565b60805160a0516110f2620001eb6000396000818161020d015261073d01526000818161051a015261070101526110f26000f3fe6080604052600436106100705760003560e01c8063b7a17c4c1161004e578063b7a17c4c146100f4578063d0e30db01461011f578063dbdff2c114610129578063dfbf53ae1461015457610070565b80631746bd1b146100755780638e7ea5b2146100a057806394985ddd146100cb575b600080fd5b34801561008157600080fd5b5061008a61017f565b6040516100979190610975565b60405180910390f35b3480156100ac57600080fd5b506100b56101e1565b6040516100c2919061099f565b60405180910390f35b3480156100d757600080fd5b506100f260048036038101906100ed9190610a21565b61020b565b005b34801561010057600080fd5b506101096102a7565b6040516101169190610a70565b60405180910390f35b6101276102ad565b005b34801561013557600080fd5b5061013e610513565b60405161014b9190610a9a565b60405180910390f35b34801561016057600080fd5b50610169610606565b604051610176919061099f565b60405180910390f35b6101876108bc565b60006040518060400160405280600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160055481525090508091505090565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610299576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029090610b12565b60405180910390fd5b6102a3828261062c565b5050565b60055481565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561031d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031490610b7e565b60405180910390fd5b6000341415610361576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161035890610bea565b60405180910390fd5b6005543410156103a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039d90610c56565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660076001600281106103d3576103d2610c76565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561044c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044390610cf1565b60405180910390fd5b6000600214156104b05733600760006002811061046c5761046b610c76565b5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610511565b600160021415610510573360076001600281106104d0576104cf610c76565b5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b565b60006004547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610571919061099f565b602060405180830381865afa15801561058e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b29190610d26565b10156105f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ea90610d9f565b60405180910390fd5b6106016006546004546106fd565b905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160028361063d9190610dee565b6106479190610e4e565b90506007816002811061065d5761065c610c76565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fe72a3cc2cb1a8abfb84171b8a17176f3f5329a21fe39f427c27a41056a007d1283826040516106f0929190610ea4565b60405180910390a1505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16634000aea07f000000000000000000000000000000000000000000000000000000000000000084866000604051602001610771929190610ea4565b6040516020818303038152906040526040518463ffffffff1660e01b815260040161079e93929190610f66565b6020604051808303816000875af11580156107bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e19190610fdc565b506000610803846000306000808981526020019081526020016000205461084d565b90506001600080868152602001908152602001600020546108249190610e4e565b600080868152602001908152602001600020819055506108448482610889565b91505092915050565b6000848484846040516020016108669493929190611009565b6040516020818303038152906040528051906020012060001c9050949350505050565b6000828260405160200161089e929190611090565b60405160208183030381529060405280519060200120905092915050565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610917826108ec565b9050919050565b6109278161090c565b82525050565b6000819050919050565b6109408161092d565b82525050565b60408201600082015161095c600085018261091e565b50602082015161096f6020850182610937565b50505050565b600060408201905061098a6000830184610946565b92915050565b6109998161090c565b82525050565b60006020820190506109b46000830184610990565b92915050565b600080fd5b6000819050919050565b6109d2816109bf565b81146109dd57600080fd5b50565b6000813590506109ef816109c9565b92915050565b6109fe8161092d565b8114610a0957600080fd5b50565b600081359050610a1b816109f5565b92915050565b60008060408385031215610a3857610a376109ba565b5b6000610a46858286016109e0565b9250506020610a5785828601610a0c565b9150509250929050565b610a6a8161092d565b82525050565b6000602082019050610a856000830184610a61565b92915050565b610a94816109bf565b82525050565b6000602082019050610aaf6000830184610a8b565b92915050565b600082825260208201905092915050565b7f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00600082015250565b6000610afc601f83610ab5565b9150610b0782610ac6565b602082019050919050565b60006020820190508181036000830152610b2b81610aef565b9050919050565b7f494e56414c494420414444524553530000000000000000000000000000000000600082015250565b6000610b68600f83610ab5565b9150610b7382610b32565b602082019050919050565b60006020820190508181036000830152610b9781610b5b565b9050919050565b7f494e56414c494420455448455200000000000000000000000000000000000000600082015250565b6000610bd4600d83610ab5565b9150610bdf82610b9e565b602082019050919050565b60006020820190508181036000830152610c0381610bc7565b9050919050565b7f494e56414c49442042555920494e205052494345000000000000000000000000600082015250565b6000610c40601483610ab5565b9150610c4b82610c0a565b602082019050919050565b60006020820190508181036000830152610c6f81610c33565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f504c41594552532046554c4c0000000000000000000000000000000000000000600082015250565b6000610cdb600c83610ab5565b9150610ce682610ca5565b602082019050919050565b60006020820190508181036000830152610d0a81610cce565b9050919050565b600081519050610d20816109f5565b92915050565b600060208284031215610d3c57610d3b6109ba565b5b6000610d4a84828501610d11565b91505092915050565b7f4e4f5420454e4f554748204c494e4b0000000000000000000000000000000000600082015250565b6000610d89600f83610ab5565b9150610d9482610d53565b602082019050919050565b60006020820190508181036000830152610db881610d7c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610df98261092d565b9150610e048361092d565b925082610e1457610e13610dbf565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610e598261092d565b9150610e648361092d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610e9957610e98610e1f565b5b828201905092915050565b6000604082019050610eb96000830185610a8b565b610ec66020830184610a61565b9392505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f07578082015181840152602081019050610eec565b83811115610f16576000848401525b50505050565b6000601f19601f8301169050919050565b6000610f3882610ecd565b610f428185610ed8565b9350610f52818560208601610ee9565b610f5b81610f1c565b840191505092915050565b6000606082019050610f7b6000830186610990565b610f886020830185610a61565b8181036040830152610f9a8184610f2d565b9050949350505050565b60008115159050919050565b610fb981610fa4565b8114610fc457600080fd5b50565b600081519050610fd681610fb0565b92915050565b600060208284031215610ff257610ff16109ba565b5b600061100084828501610fc7565b91505092915050565b600060808201905061101e6000830187610a8b565b61102b6020830186610a61565b6110386040830185610990565b6110456060830184610a61565b95945050505050565b6000819050919050565b611069611064826109bf565b61104e565b82525050565b6000819050919050565b61108a6110858261092d565b61106f565b82525050565b600061109c8285611058565b6020820191506110ac8284611079565b602082019150819050939250505056fea2646970667358221220fe10f14f4fd62252025553c4facf47bb1bea94bf11dbfb1bd6a5617276a2106064736f6c634300080b0033"