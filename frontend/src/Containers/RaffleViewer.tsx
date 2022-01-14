import React from 'react';
import Deposit from "../Components/Deposit";
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { _abi } from "../interfaces/Eyescream_Interface";
import { _Raffle_abi } from '../interfaces/RaffleEscrow_Interface';
import "./RaffleViewer.css";

const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'JPARDRW9CAVF9ZKISWVC3YYM6RP93JNQUC';



declare let window: any;
export default class RaffleViewer extends React.Component {


    state: any = {
        tokenMetaData: {},
        isDepositOpen: false,
        raffleContractAddress: ""
    }

    fetchNFTs = async (contractAddress: any) => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            var url = ETHERSCAN_API_NFT_TXN + contractAddress + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
            console.log(url)
            fetch(url)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(data => {
                this.getMetaData(data.result[0]) // POTENTIAL FIX IS PROBALY GOOD
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
                if (String(token.contractAddress) == '0x05d79a33c0f7e719ae171b61f095f500635a0a21') { // THIS IS EYESCREAM ADDRESS (UPDATE THIS !!!)
                    let contract = new ethers.Contract(token.contractAddress, _abi, signer)
                    console.log(token.contractAddress)
                    let metaData = await contract.tokenURI(parseInt(token.tokenID))
                    fetch(metaData).then(res => {return res.json()}).then(data => {
                        token['image'] = data.image
                        this.setState({
                            tokenMetaData: token
                        })
                    })
                }
            }
            catch(err) {
                console.log(err)
            }

        }
    }


    handleRaffle = async () => {
        console.log("HELLLO");
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = window.location.pathname.split('/').at(-1);
            const contract = new ethers.Contract(contractAddress, _Raffle_abi, signer) 
            console.log("NFT", this.state.tokenMetaData);

        }
    }

    handleDepositClicked = () => {
        this.setState({
            isDepositOpen: !this.state.isDepositOpen
        })
    }

    componentDidMount() {
        const contractAddress = window.location.pathname.split('/').at(-1);
        this.setState({
            raffleContractAddress: contractAddress
        })
        console.log(contractAddress);
        this.fetchNFTs(contractAddress);
    }

    componentDidUpdate() {
        this.handleRaffle();
    }

    render() {
        return (
            <div className="RaffleViewer-Div-Main">
                <Link to="/raffles">
                    <button>View Open Raffles</button>
                </Link>
                <h3>Raffle Viewer</h3>
                <img src={this.state.tokenMetaData.image}></img>
                <button onClick={this.handleDepositClicked}>Deposit</button>
                <Deposit isDepositOpen={this.state.isDepositOpen} raffleContractAddress={this.state.raffleContractAddress}/>
            </div>
        )
    }
}
