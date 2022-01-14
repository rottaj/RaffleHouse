import React from 'react';
import NFTSelector from "./NFTSelector";
import { ethers, ContractFactory } from 'ethers';
import { _abi } from '../interfaces/Eyescream_Interface';
import { _Raffle_abi, _Raffle_bytecode } from "../interfaces/RaffleEscrow_Interface";
import { RafflesAddress, _abi_raffles } from '../interfaces/Raffles_Interface';
import "./RaffleCreator.css";
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
}

declare let window: any;
export default class RaffleCreator extends React.Component <Props>{
    state = {
        tokens: []
    }

    tokenSelector: any = React.createRef() 

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
            console.log(url)
            fetch(url)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(data => {
                console.log("TESTING", data)
                for (let i=0; i<=data.result.length; i++ ) {
                    this.getMetaData(data.result[i])
                }

            })

        }
    }

    getMetaData = async (token: any) => {
        console.log(token)
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            try {
                if (String(token.contractAddress) == '0x05d79a33c0f7e719ae171b61f095f500635a0a21') {
                    let contract = new ethers.Contract(token.contractAddress, _abi, signer)
                    console.log(token.contractAddress)
                    let metaData = await contract.tokenURI(parseInt(token.tokenID))
                    fetch(metaData).then(res => {return res.json()}).then(data => {
                        token['image'] = data.image
                        this.setState({
                            tokens: [...this.state.tokens, token] 
                        })
                    })
                }
            }
            catch(err) {
                console.log(err)
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
            console.log("handleSubmit", e.target[0].value);
            console.log("NFT Selector state", this.tokenSelector.state.selectedToken);
            const raffleFactory = new ContractFactory(_Raffle_abi, _Raffle_bytecode, signer) // Initialize new Raffle 
            const rafflesContract = await new ethers.Contract(RafflesAddress, _abi_raffles, signer)  // connect to Raffles Contract
            console.log("SIGNER", accounts.result[0]);
            // DEPLOY CONTRACT
            const account = accounts.result[0];
            const selectedToken = this.tokenSelector.state.selectedToken; // maybe remove?
            const contract = await raffleFactory.deploy(account, parseInt(e.target[0].value), selectedToken.image);
            await contract.deployed().then(async function (data) {
                console.log(data);
                console.log("TESTING FOOBAR", selectedToken)
                console.log("TESTING", selectedToken.contractAddress);
                const collectionContract = await new ethers.Contract(selectedToken.contractAddress, _abi, signer);
                const sendingTxn = await collectionContract.transferFrom(account, contract.address, selectedToken.tokenID);
                console.log("TOKEN TXN: ", sendingTxn);
            }).then(async function (dataTwo) {
                console.log(dataTwo);
                const addRaffleTxn = rafflesContract.addRaffle(selectedToken.image)
                console.log("WENT THROUGH", addRaffleTxn)
            })
            console.log("CONTRACT: ", contract);
        }
    }

    render() {
        return (
            <div className="CreateRaffleForm-Main" >
                {this.props.isOpen && 
                <div className="PopUp-Form">
                    {console.log(this.state)}
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