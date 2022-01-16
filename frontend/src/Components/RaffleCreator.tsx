import React from 'react';
import NFTSelector from "./NFTSelector";
import { ethers, ContractFactory } from 'ethers';
import { _abi } from '../interfaces/Eyescream_Interface';
import { _Raffle_abi, _Raffle_bytecode } from "../interfaces/RaffleEscrow_Interface";
import { RafflesAddress, _abi_raffles } from '../interfaces/Raffles_Interface';
import { ChainLinkTokenAddress, VRFCoordinatorAddress, ChainLinkFee } from '../interfaces/ChainLink_interface';
import "./RaffleCreator.css";
import { timeStamp } from 'console';
require('dotenv').config();
const ETHERSCAN_NFT_TXN = process.env.ETHERSCAN_API_NFT_TXN;
// 
/*
process.env.ETHERSCAN_API_NFT_TXN + ${0xB702DC679dCe8d27c77AC49A63B9A138B674929E} + ${&startblock=0&endblock=999999999&sort=asc&apikey=} + process.env.API_KEY
*/
// REMOVE THIS --> MOVE TO .ENV
const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'JPARDRW9CAVF9ZKISWVC3YYM6RP93JNQUC';
interface Props {
    isOpen: boolean;
    tokens?: Token[];
}

interface Token {
    blockHash: string;
    blockNumber: number;
    confirmations: number;
    contractAddress: string; 
    cumulativeGasUsed: number;
    from: string;
    gas: number;
    gasPrice: number;
    gasUsed: number; 
    hash: string;
    image: string;
    input: string;
    nonce: number;
    timeStamp: number;
    to: string;
    tokenDecimal: number;
    tokenID: number;
    tokenName: string;
    tokenSymbol: string;
    transactionIndex: number;
}



declare let window: any;
export default class RaffleCreator extends React.Component <Props>{
    state = {
        tokens: [],

    }

    tokenSelector: any = React.createRef() 

    filterTokenTxns = (token: any) => {
        for (let i=0; i<=this.state.tokens.length; i++ ) {
            if (this.state.tokens[i] == token) {

            }
        }
    }

    fetchNFTs = async () => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            var accounts = await window.ethereum.send('eth_requestAccounts');
            console.log(accounts.result[0])
            var url = ETHERSCAN_API_NFT_TXN + accounts.result[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
            fetch(url).then(res => {
                return res.json();
            })
            .then(data => {
                var tokens: Token[] = []

                for (let i=0; i<=data.result.length; i++ ) {
                    if (tokens.length > 0) {
                        try {
                            //let x: any = tokens.find(token => token['tokenID'] !== data.result[i]['tokenID'])
                            let index = tokens.findIndex(temp => temp['tokenID'] == data.result[i]['tokenID']);
                            if (index == -1) {
                                tokens.push(data.result[i])
                            } else {
                                tokens.slice(index, 1)
                            }
                        } 
                        catch(err) {
                            console.log(err)
                        }
                    }
                    else {
                        tokens.push(data.result[i])
                    }
                }
                console.log("TOKENS", tokens)
                this.getMetaData(tokens)
            })
            

        }
    }

    getMetaData = async (tokens: any) => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            for (let i=0; i<=tokens.length; i++ ) {
                try {
                    if (String(tokens[i].contractAddress) == '0x05d79a33c0f7e719ae171b61f095f500635a0a21') { // THIS IS EYESCREAM ADDRESS (UPDATE THIS !!!)
                        let contract = new ethers.Contract(tokens[i].contractAddress, _abi, signer)
                        let metaData = await contract.tokenURI(parseInt(tokens[i].tokenID))
                        fetch(metaData).then(res => {return res.json()}).then(data => {
                            tokens[i]['image'] = data.image
                            this.setState({
                                //tokens: this.state.tokens.filter(tempToken => tempToken['tokenID'] !== tokens[i].tokenID)
                                tokens: [...this.state.tokens, tokens[i]]
                            })
                        })
                    }
                }
                catch(err) {
                    console.log(err)
                }
            }

        }
    }



    componentDidMount() {
        this.fetchNFTs()
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        if (window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const raffleFactory = new ContractFactory(_Raffle_abi, _Raffle_bytecode, signer) // Initialize new Raffle 
            const rafflesContract = await new ethers.Contract(RafflesAddress, _abi_raffles, signer)  // connect to Raffles Contract
            // DEPLOY CONTRACT
            const account = accounts.result[0];
            const selectedToken = this.tokenSelector.state.selectedToken; // maybe remove?
            const contract = await raffleFactory.deploy(account, parseInt(e.target[0].value), selectedToken.image, ChainLinkTokenAddress, VRFCoordinatorAddress, ChainLinkFee);
            await contract.deployed().then(async function (data) {

                console.log(data);
                const collectionContract = await new ethers.Contract(selectedToken.contractAddress, _abi, signer);
                const sendingTxn = await collectionContract.transferFrom(account, contract.address, selectedToken.tokenID);
            }).then(async function (dataTwo) {
                console.log(dataTwo);
                const addRaffleTxn = rafflesContract.addRaffle(selectedToken.image, contract.address)
            })
        }
    }

    render() {
        return (
            <div className="CreateRaffleForm-Main" >
                {this.props.isOpen && 
                <div className="PopUp-Form">
                    <h3>Create your Raffle!</h3>
                    <h3> 1 Share(FUN) = 0.08 ETH</h3>
                    <form className="CreateRaffle-Form" onSubmit={(e) => this.handleSubmit(e)}>
                        Minimum Buy in:
                        <input className="RaffleForm-Minimum-Buyin" defaultValue="0.08"></input>
                        <br></br>
                        <br></br>
                        <NFTSelector tokens={this.state.tokens} ref={(tokenSelector) => this.tokenSelector = tokenSelector}/>
                        <button type="submit">Submit Proposal</button>
                    </form>
                </div>
                }
            </div>
        )
    }
}