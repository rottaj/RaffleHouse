export const _Raffle_abi =  [
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
        },
        {
          "internalType": "address",
          "name": "_vrfCoordinator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_link",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_fee",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "outputs": [],
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
      "name": "randomResult",
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
      "name": "withdrawEther",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
export const _Raffle_bytecode = 
"0x60c06040526000600160146101000a81548160ff0219169083151502179055503480156200002c57600080fd5b50604051620016da380380620016da833981810160405281019062000052919062000464565b82828173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050505085600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508460028190555083600390805190602001906200011e92919062000132565b508060058190555050505050505062000584565b82805462000140906200054e565b90600052602060002090601f016020900481019282620001645760008555620001b0565b82601f106200017f57805160ff1916838001178555620001b0565b82800160010185558215620001b0579182015b82811115620001af57825182559160200191906001019062000192565b5b509050620001bf9190620001c3565b5090565b5b80821115620001de576000816000905550600101620001c4565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200022382620001f6565b9050919050565b620002358162000216565b81146200024157600080fd5b50565b60008151905062000255816200022a565b92915050565b6000819050919050565b62000270816200025b565b81146200027c57600080fd5b50565b600081519050620002908162000265565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002eb82620002a0565b810181811067ffffffffffffffff821117156200030d576200030c620002b1565b5b80604052505050565b600062000322620001e2565b9050620003308282620002e0565b919050565b600067ffffffffffffffff821115620003535762000352620002b1565b5b6200035e82620002a0565b9050602081019050919050565b60005b838110156200038b5780820151818401526020810190506200036e565b838111156200039b576000848401525b50505050565b6000620003b8620003b28462000335565b62000316565b905082815260208101848484011115620003d757620003d66200029b565b5b620003e48482856200036b565b509392505050565b600082601f83011262000404576200040362000296565b5b815162000416848260208601620003a1565b91505092915050565b60006200042c82620001f6565b9050919050565b6200043e816200041f565b81146200044a57600080fd5b50565b6000815190506200045e8162000433565b92915050565b60008060008060008060c08789031215620004845762000483620001ec565b5b60006200049489828a0162000244565b9650506020620004a789828a016200027f565b955050604087015167ffffffffffffffff811115620004cb57620004ca620001f1565b5b620004d989828a01620003ec565b9450506060620004ec89828a016200044d565b9350506080620004ff89828a016200044d565b92505060a06200051289828a016200027f565b9150509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200056757607f821691505b602082108114156200057e576200057d6200051f565b5b50919050565b60805160a051611122620005b860003960008181610303015261071401526000818161053801526106d801526111226000f3fe60806040526004361061007b5760003560e01c806394985ddd1161004e57806394985ddd14610104578063b6b55f251461012d578063dbdff2c114610149578063e1e158a5146101745761007b565b806312065fe0146100805780633c130d901461009757806342619f66146100c25780637362377b146100ed575b600080fd5b34801561008c57600080fd5b5061009561019f565b005b3480156100a357600080fd5b506100ac6101bd565b6040516100b99190610955565b60405180910390f35b3480156100ce57600080fd5b506100d761024b565b6040516100e49190610990565b60405180910390f35b3480156100f957600080fd5b50610102610251565b005b34801561011057600080fd5b5061012b60048036038101906101269190610a12565b610301565b005b61014760048036038101906101429190610a52565b61039d565b005b34801561015557600080fd5b5061015e610531565b60405161016b9190610a8e565b60405180910390f35b34801561018057600080fd5b5061018961062a565b6040516101969190610990565b60405180910390f35b6101bb670de0b6b3a7640000476101b69190610b07565b610630565b565b600380546101ca90610b67565b80601f01602080910402602001604051908101604052809291908181526020018280546101f690610b67565b80156102435780601f1061021857610100808354040283529160200191610243565b820191906000526020600020905b81548152906001019060200180831161022657829003601f168201915b505050505081565b60045481565b60011515600160149054906101000a900460ff161515146102a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029e90610c0b565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f1935050505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461038f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038690610c77565b60405180910390fd5b61039982826106c9565b5050565b60003414156103e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d890610ce3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610451576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044890610d4f565b60405180910390fd5b600034905034600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104a59190610d6f565b9250508190555060005b82811161052c576006339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808061052490610dc5565b9150506104af565b505050565b60006005547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161058f9190610e4f565b602060405180830381865afa1580156105ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d09190610e7f565b1015610611576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060890610ef8565b60405180910390fd5b61062560068054905060001b6005546106d4565b905090565b60025481565b6106c6816040516024016106449190610990565b6040516020818303038152906040527ff5b1bba9000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610824565b50565b806004819055505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16634000aea07f000000000000000000000000000000000000000000000000000000000000000084866000604051602001610748929190610f18565b6040516020818303038152906040526040518463ffffffff1660e01b815260040161077593929190610f96565b6020604051808303816000875af1158015610794573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b8919061100c565b5060006107da846000306000808981526020019081526020016000205461084d565b90506001600080868152602001908152602001600020546107fb9190610d6f565b6000808681526020019081526020016000208190555061081b8482610889565b91505092915050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000848484846040516020016108669493929190611039565b6040516020818303038152906040528051906020012060001c9050949350505050565b6000828260405160200161089e9291906110c0565b60405160208183030381529060405280519060200120905092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156108f65780820151818401526020810190506108db565b83811115610905576000848401525b50505050565b6000601f19601f8301169050919050565b6000610927826108bc565b61093181856108c7565b93506109418185602086016108d8565b61094a8161090b565b840191505092915050565b6000602082019050818103600083015261096f818461091c565b905092915050565b6000819050919050565b61098a81610977565b82525050565b60006020820190506109a56000830184610981565b92915050565b600080fd5b6000819050919050565b6109c3816109b0565b81146109ce57600080fd5b50565b6000813590506109e0816109ba565b92915050565b6109ef81610977565b81146109fa57600080fd5b50565b600081359050610a0c816109e6565b92915050565b60008060408385031215610a2957610a286109ab565b5b6000610a37858286016109d1565b9250506020610a48858286016109fd565b9150509250929050565b600060208284031215610a6857610a676109ab565b5b6000610a76848285016109fd565b91505092915050565b610a88816109b0565b82525050565b6000602082019050610aa36000830184610a7f565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610b1282610977565b9150610b1d83610977565b925082610b2d57610b2c610aa9565b5b828204905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610b7f57607f821691505b60208210811415610b9357610b92610b38565b5b50919050565b7f57495448445241573a204e4f5420414c4c4f57454420544f205749544844524160008201527f5700000000000000000000000000000000000000000000000000000000000000602082015250565b6000610bf56021836108c7565b9150610c0082610b99565b604082019050919050565b60006020820190508181036000830152610c2481610be8565b9050919050565b7f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00600082015250565b6000610c61601f836108c7565b9150610c6c82610c2b565b602082019050919050565b60006020820190508181036000830152610c9081610c54565b9050919050565b7f4445504f5349543a20494e56414c49442046554e445300000000000000000000600082015250565b6000610ccd6016836108c7565b9150610cd882610c97565b602082019050919050565b60006020820190508181036000830152610cfc81610cc0565b9050919050565b7f4445504f5349543a20494e56414c494420414444524553530000000000000000600082015250565b6000610d396018836108c7565b9150610d4482610d03565b602082019050919050565b60006020820190508181036000830152610d6881610d2c565b9050919050565b6000610d7a82610977565b9150610d8583610977565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610dba57610db9610ad8565b5b828201905092915050565b6000610dd082610977565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610e0357610e02610ad8565b5b600182019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e3982610e0e565b9050919050565b610e4981610e2e565b82525050565b6000602082019050610e646000830184610e40565b92915050565b600081519050610e79816109e6565b92915050565b600060208284031215610e9557610e946109ab565b5b6000610ea384828501610e6a565b91505092915050565b7f4e6f7420656e6f756768204c494e4b0000000000000000000000000000000000600082015250565b6000610ee2600f836108c7565b9150610eed82610eac565b602082019050919050565b60006020820190508181036000830152610f1181610ed5565b9050919050565b6000604082019050610f2d6000830185610a7f565b610f3a6020830184610981565b9392505050565b600081519050919050565b600082825260208201905092915050565b6000610f6882610f41565b610f728185610f4c565b9350610f828185602086016108d8565b610f8b8161090b565b840191505092915050565b6000606082019050610fab6000830186610e40565b610fb86020830185610981565b8181036040830152610fca8184610f5d565b9050949350505050565b60008115159050919050565b610fe981610fd4565b8114610ff457600080fd5b50565b60008151905061100681610fe0565b92915050565b600060208284031215611022576110216109ab565b5b600061103084828501610ff7565b91505092915050565b600060808201905061104e6000830187610a7f565b61105b6020830186610981565b6110686040830185610e40565b6110756060830184610981565b95945050505050565b6000819050919050565b611099611094826109b0565b61107e565b82525050565b6000819050919050565b6110ba6110b582610977565b61109f565b82525050565b60006110cc8285611088565b6020820191506110dc82846110a9565b602082019150819050939250505056fea2646970667358221220dfc355d696316d4e1aa94dd102d211c9540b208e2dccf268c5ec5c49e10fbca564736f6c634300080b0033"
