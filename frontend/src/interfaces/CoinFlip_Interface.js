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
            "internalType": "address",
            "name": "joineeAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "winner",
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
  }
]

export const _CoinFlip_bytecode = 
"0x60c06040523480156200001157600080fd5b50604051620013b3380380620013b3833981810160405281019062000037919062000193565b73b3dccb4cf7a26f6cf6b120cf5a73875b7bbc655b7301be23585060835e02b77ef475b0cc51aa1e07098173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806005819055507f2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c131160001b60068190555067016345785d8a000060048190555050620001c5565b600080fd5b6000819050919050565b6200016d8162000158565b81146200017957600080fd5b50565b6000815190506200018d8162000162565b92915050565b600060208284031215620001ac57620001ab62000153565b5b6000620001bc848285016200017c565b91505092915050565b60805160a0516111ba620001f9600039600081816101d701526107db015260008181610611015261079f01526111ba6000f3fe60806040526004361061003f5760003560e01c80631746bd1b146100445780638e7ea5b21461006f57806394985ddd1461009a578063d0e30db0146100c3575b600080fd5b34801561005057600080fd5b506100596100cd565b6040516100669190610a73565b60405180910390f35b34801561007b57600080fd5b506100846101ab565b6040516100919190610a9d565b60405180910390f35b3480156100a657600080fd5b506100c160048036038101906100bc9190610b1f565b6101d5565b005b6100cb610271565b005b6100d561095a565b60006040518060800160405280600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160055481525090508091505090565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610263576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161025a90610bbc565b60405180910390fd5b61026d828261053d565b5050565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102d890610c28565b60405180910390fd5b6000341415610325576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031c90610c94565b60405180910390fd5b60055434101561036a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036190610d00565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600760006002811061039757610396610d20565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561042f573360076000600281106103eb576103ea610d20565b5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061053b565b600073ffffffffffffffffffffffffffffffffffffffff16600760016002811061045c5761045b610d20565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561053a573360076001600281106104b0576104af610d20565b5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061053861060a565b505b5b565b600060028261054c9190610d7e565b90506007816002811061056257610561610d20565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506105cc6106fd565b7fe72a3cc2cb1a8abfb84171b8a17176f3f5329a21fe39f427c27a41056a007d1283826040516105fd929190610dcd565b60405180910390a1505050565b60006004547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016106689190610a9d565b602060405180830381865afa158015610685573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a99190610e0b565b10156106ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106e190610e84565b60405180910390fd5b6106f860065460045461079b565b905090565b6000479050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050610798576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078f90610ef0565b60405180910390fd5b50565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16634000aea07f00000000000000000000000000000000000000000000000000000000000000008486600060405160200161080f929190610dcd565b6040516020818303038152906040526040518463ffffffff1660e01b815260040161083c93929190610fa9565b6020604051808303816000875af115801561085b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087f919061101f565b5060006108a184600030600080898152602001908152602001600020546108eb565b90506001600080868152602001908152602001600020546108c2919061107b565b600080868152602001908152602001600020819055506108e28482610927565b91505092915050565b60008484848460405160200161090494939291906110d1565b6040516020818303038152906040528051906020012060001c9050949350505050565b6000828260405160200161093c929190611158565b60405160208183030381529060405280519060200120905092915050565b6040518060800160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109ef826109c4565b9050919050565b6109ff816109e4565b82525050565b6000819050919050565b610a1881610a05565b82525050565b608082016000820151610a3460008501826109f6565b506020820151610a4760208501826109f6565b506040820151610a5a60408501826109f6565b506060820151610a6d6060850182610a0f565b50505050565b6000608082019050610a886000830184610a1e565b92915050565b610a97816109e4565b82525050565b6000602082019050610ab26000830184610a8e565b92915050565b600080fd5b6000819050919050565b610ad081610abd565b8114610adb57600080fd5b50565b600081359050610aed81610ac7565b92915050565b610afc81610a05565b8114610b0757600080fd5b50565b600081359050610b1981610af3565b92915050565b60008060408385031215610b3657610b35610ab8565b5b6000610b4485828601610ade565b9250506020610b5585828601610b0a565b9150509250929050565b600082825260208201905092915050565b7f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00600082015250565b6000610ba6601f83610b5f565b9150610bb182610b70565b602082019050919050565b60006020820190508181036000830152610bd581610b99565b9050919050565b7f494e56414c494420414444524553530000000000000000000000000000000000600082015250565b6000610c12600f83610b5f565b9150610c1d82610bdc565b602082019050919050565b60006020820190508181036000830152610c4181610c05565b9050919050565b7f494e56414c494420455448455200000000000000000000000000000000000000600082015250565b6000610c7e600d83610b5f565b9150610c8982610c48565b602082019050919050565b60006020820190508181036000830152610cad81610c71565b9050919050565b7f494e56414c49442042555920494e205052494345000000000000000000000000600082015250565b6000610cea601483610b5f565b9150610cf582610cb4565b602082019050919050565b60006020820190508181036000830152610d1981610cdd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610d8982610a05565b9150610d9483610a05565b925082610da457610da3610d4f565b5b828206905092915050565b610db881610abd565b82525050565b610dc781610a05565b82525050565b6000604082019050610de26000830185610daf565b610def6020830184610dbe565b9392505050565b600081519050610e0581610af3565b92915050565b600060208284031215610e2157610e20610ab8565b5b6000610e2f84828501610df6565b91505092915050565b7f4e4f5420454e4f554748204c494e4b0000000000000000000000000000000000600082015250565b6000610e6e600f83610b5f565b9150610e7982610e38565b602082019050919050565b60006020820190508181036000830152610e9d81610e61565b9050919050565b7f4641494c454420544f2053454e4420544f2057494e4e45520000000000000000600082015250565b6000610eda601883610b5f565b9150610ee582610ea4565b602082019050919050565b60006020820190508181036000830152610f0981610ecd565b9050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f4a578082015181840152602081019050610f2f565b83811115610f59576000848401525b50505050565b6000601f19601f8301169050919050565b6000610f7b82610f10565b610f858185610f1b565b9350610f95818560208601610f2c565b610f9e81610f5f565b840191505092915050565b6000606082019050610fbe6000830186610a8e565b610fcb6020830185610dbe565b8181036040830152610fdd8184610f70565b9050949350505050565b60008115159050919050565b610ffc81610fe7565b811461100757600080fd5b50565b60008151905061101981610ff3565b92915050565b60006020828403121561103557611034610ab8565b5b60006110438482850161100a565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061108682610a05565b915061109183610a05565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156110c6576110c561104c565b5b828201905092915050565b60006080820190506110e66000830187610daf565b6110f36020830186610dbe565b6111006040830185610a8e565b61110d6060830184610dbe565b95945050505050565b6000819050919050565b61113161112c82610abd565b611116565b82525050565b6000819050919050565b61115261114d82610a05565b611137565b82525050565b60006111648285611120565b6020820191506111748284611141565b602082019150819050939250505056fea26469706673582212204e4ea38e55f610d298e1369f18e3e6230defb967ba0124554bf1cd757257cae464736f6c634300080b0033"