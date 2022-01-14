import React from 'react';
import { ethers } from 'ethers';
import { _abi } from "../interfaces/Eyescream_Interface";
import { _Raffle_abi } from '../interfaces/RaffleEscrow_Interface';
import "./RaffleViewer.css";

const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'JPARDRW9CAVF9ZKISWVC3YYM6RP93JNQUC';



declare let window: any;
export default class RaffleViewer extends React.Component {


    state: any = {
        tokenMetaData: {}
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
                console.log("TESTING DATA", data.result)
                this.getMetaData(data.result[0])
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
                    console.log("PENNNISSSS")
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
            console.log("COntract", contract);
            console.log("NFT", this.state.tokenMetaData);

        }
    }

    componentDidMount() {
        const contractAddress = window.location.pathname.split('/').at(-1);
        console.log(contractAddress);
        this.fetchNFTs(contractAddress);
    }

    componentDidUpdate() {
        this.handleRaffle();
    }

    render() {
        return (
            <div className="RaffleViewer-Div-Main">
                <h3>Raffle Viewer</h3>
                {console.log("STATE", this.state)}
                <img src={this.state.tokenMetaData.image}></img>
            </div>
        )
    }
}
