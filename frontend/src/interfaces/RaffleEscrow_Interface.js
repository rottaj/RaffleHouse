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
        "inputs": [],
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
        "name": "withdrawEther",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export const _Raffle_bytecode = "0x608060405260008060146101000a81548160ff02191690831515021790555034801561002a57600080fd5b50604051610799380380610799833981810160405281019061004c9190610133565b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806001819055505050610173565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100ca8261009f565b9050919050565b6100da816100bf565b81146100e557600080fd5b50565b6000815190506100f7816100d1565b92915050565b6000819050919050565b610110816100fd565b811461011b57600080fd5b50565b60008151905061012d81610107565b92915050565b6000806040838503121561014a5761014961009a565b5b6000610158858286016100e8565b92505060206101698582860161011e565b9150509250929050565b610617806101826000396000f3fe60806040526004361061003f5760003560e01c806312065fe0146100445780637362377b1461005b578063d0e30db014610072578063e1e158a51461007c575b600080fd5b34801561005057600080fd5b506100596100a7565b005b34801561006757600080fd5b506100706100c5565b005b61007a610173565b005b34801561008857600080fd5b50610091610285565b60405161009e9190610366565b60405180910390f35b6100c3670de0b6b3a7640000476100be91906103df565b61028b565b565b60011515600060149054906101000a900460ff1615151461011b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161011290610493565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f1935050505050565b60003414156101b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ae906104ff565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610227576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021e9061056b565b60405180910390fd5b600034905034600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461027b919061058b565b9250508190555050565b60015481565b6103218160405160240161029f9190610366565b6040516020818303038152906040527ff5b1bba9000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610324565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000819050919050565b6103608161034d565b82525050565b600060208201905061037b6000830184610357565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006103ea8261034d565b91506103f58361034d565b92508261040557610404610381565b5b828204905092915050565b600082825260208201905092915050565b7f57495448445241573a204e4f5420414c4c4f57454420544f205749544844524160008201527f5700000000000000000000000000000000000000000000000000000000000000602082015250565b600061047d602183610410565b915061048882610421565b604082019050919050565b600060208201905081810360008301526104ac81610470565b9050919050565b7f4445504f5349543a20494e56414c49442046554e445300000000000000000000600082015250565b60006104e9601683610410565b91506104f4826104b3565b602082019050919050565b60006020820190508181036000830152610518816104dc565b9050919050565b7f4445504f5349543a20494e56414c494420414444524553530000000000000000600082015250565b6000610555601883610410565b91506105608261051f565b602082019050919050565b6000602082019050818103600083015261058481610548565b9050919050565b60006105968261034d565b91506105a18361034d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156105d6576105d56103b0565b5b82820190509291505056fea2646970667358221220ebc7d5a59b42d48535ebe8fe83684de98607232a1ae58cf5751b016589cba53064736f6c634300080b0033"