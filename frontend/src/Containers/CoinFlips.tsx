import React from 'react';
import CoinFlip from '../Components/CoinFlip';
import MenuItems from '../Components/MenuItems';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import { CoinFlipAddress, _CoinFlips_abi } from "../interfaces/CoinFlips_Interface";
import { _CoinFlip_abi, _CoinFlip_bytecode } from "../interfaces/CoinFlip_Interface";
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
                var tempCoinFlip:any  = {}
                var coinFlip = await coinFlipContract.getCoinFlipByIndex(i);
                console.log("COINFOOBET", coinFlip)
                const coinFlipInstance = await new ethers.Contract(coinFlip.contractAddress, _CoinFlip_abi, signer);
                const gameInfo = await coinFlipInstance.getGameInfo();
                console.log("GAME INFOOO", gameInfo)
                tempCoinFlip['contractAddress'] = coinFlip['contractAddress'];
                tempCoinFlip['buyInPrice'] = parseInt(gameInfo['buyInPrice'], 16);
                tempCoinFlip['creatorAddress'] = gameInfo['creatorAddress'];
                this.setState({
                    coinFlips: [...this.state.coinFlips, tempCoinFlip]
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
                <MenuItems/>
                <h1>Coin Flips Container </h1>
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