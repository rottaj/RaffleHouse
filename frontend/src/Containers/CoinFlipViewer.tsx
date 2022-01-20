import React from 'react';
import MenuItems from "../Components/MenuItems";
import { ethers } from "ethers";
import { _CoinFlip_abi } from '../interfaces/CoinFlip_Interface';
import "./CoinFlipViewer.css";

declare let window: any;
export default class CoinFlipViewer extends React.Component {

    state = {
        coinFlipContractAddress: ""
    }

    async componentDidMount() {
        if (window.ethereum){ 
            const contractAddress = window.location.pathname.split('/').at(-1);
            this.setState({
                coinFlipContractAddress: contractAddress
            })
            console.log(contractAddress);
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(contractAddress, _CoinFlip_abi, signer);
            console.log(contract)
        }
    }

    render() {
        return (
            <div className="CoinFlipViewer-Div-Main">
                <MenuItems/>
                {this.state.coinFlipContractAddress}        
            </div>
        )
    }
}