import React from 'react';
import CoinFlip from '../Components/CoinFlip';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import { CoinFlipAddress, _CoinFlips_abi } from "../interfaces/CoinFlips_Interface";
import "./CoinFlips.css";


declare let window: any;
export default class CoinFlips extends React.Component {

    state = {
        coinFlips: []
    }
  
    getCoinFlips = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log("SIGNER", signer)
            const coinFlipContract = await new ethers.Contract(CoinFlipAddress, _CoinFlips_abi, signer);
            let coinFlipLength = await coinFlipContract.getCoinFlips();
            console.log("COINFLIPLENGTH", parseInt(coinFlipLength, 16))
            for (let i =0; i<=coinFlipLength-1; i++ ) {
                let coinFlip = await coinFlipContract.getCoinFlipByIndex(i);
                this.setState({
                    coinFlips: [...this.state.coinFlips, coinFlip]
                })
            }
        }
    }

    componentDidMount() {
        this.getCoinFlips();
    }
 

    render() {
        return (
            <div className="CoinFlips-Container-Main">
               Coin Flips Container 
               {console.log("HELLO", this.state)}
               {this.state.coinFlips.map((coinFlip: any) => {
                   return (
                    <Link to={`coin-flip/${coinFlip['contractAddress']}`}>
                        <CoinFlip coinFlip={coinFlip}></CoinFlip>
                    </Link>
                   )
               })}
            </div>
        )
    }
}