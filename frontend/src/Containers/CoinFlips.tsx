import React from 'react';
import CoinFlip from '../Components/CoinFlip';
import MenuItems from '../Components/MenuItems';
import Messages from "../Components/Messages";
import Header from "./Header";
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import { CoinFlipAddress, _CoinFlips_abi } from "../interfaces/CoinFlips_Interface";
import { _CoinFlip_abi, _CoinFlip_bytecode } from "../interfaces/CoinFlip_Interface";
import "./CoinFlips.css";
import Footer from '../Components/Footer';


declare let window: any;
export default class CoinFlips extends React.Component {

    state = {
        currentCoinFlips: [],
        pastCoinFlips: [],
        account: ""
    }

    async componentDidMount() {
        document.title = "Coin Flips - Raffle House"
        this.getCoinFlips();
        if(window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
        }
    }  
  
    getCoinFlips = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const coinFlipContract = await new ethers.Contract(CoinFlipAddress, _CoinFlips_abi, signer);
            let coinFlipLength = await coinFlipContract.getCoinFlips();
            for (let i =0; i<=coinFlipLength-1; i++ ) {
                var tempCoinFlip:any  = {}
                var coinFlip = await coinFlipContract.getCoinFlipByIndex(i);
                const coinFlipInstance = await new ethers.Contract(coinFlip.contractAddress, _CoinFlip_abi, signer);
                const gameInfo = await coinFlipInstance.getGameInfo();
                tempCoinFlip['contractAddress'] = coinFlip['contractAddress'];
                tempCoinFlip['buyInPrice'] = parseInt(gameInfo['buyInPrice']) / (10 ** 18);
                tempCoinFlip['creatorAddress'] = gameInfo['creatorAddress'];
                tempCoinFlip['joineeAddress'] = gameInfo['joineeAddress'];
                tempCoinFlip['winner'] = gameInfo['winner'];
                if (gameInfo.winner !== "0x0000000000000000000000000000000000000000") {
                    this.setState({
                        currentCoinFlips: [...this.state.currentCoinFlips, tempCoinFlip]
                    })
                }else {
                    this.setState({
                        pastCoinFlips: [...this.state.pastCoinFlips, tempCoinFlip]
                    })
                }
            }
        }
    }
 

    render() {
        return (
            <div className="CoinFlips-Container-Main">
                <Header/>
                <MenuItems account={this.state.account}/>
                <Messages/>
                <div className="CoinFlips-Games-Container">
                    <div className="CurrentCoinFlips-Container">

                        <h2 className="CoinFlips-Current-CoinFlips-h2">Current Coin Flips</h2>
                        <div className="CoinFlips-Games-Header">
                            <h3 className="CoinFlips-Creator-h3">Creator</h3>
                            <h3 className="CoinFlips-BuyIn-h3">Buy in Price</h3>
                        </div>
                        {this.state.pastCoinFlips.map((coinFlip: any) => {
                            return (
                                <Link to={`coin-flip/${coinFlip['contractAddress']}`}>
                                    <CoinFlip coinFlip={coinFlip}></CoinFlip>
                                </Link>
                            )
                        })}
                    </div>
                    {/* // Work on this
                    <div className="PastCoinFlips-Container">
                        <div className="PastCoinFlips-Games-Header">
                            <h3 className="PastCoinFlips-Creator-h3">Creator</h3>
                            <h3 className="PastCoinFlips-Winner-h3">Winner</h3>
                            <h3 className="PastCoinFlips-BuyIn-h3">Buy in Price</h3>
                        </div>
                    </div>
                    */}
                        <h2 className="CoinFlips-Current-CoinFlips-h2">Past Games</h2>
                        {this.state.currentCoinFlips.map((coinFlip: any) => {
                            return (
                                <Link to={`coin-flip/${coinFlip['contractAddress']}`}>
                                    <CoinFlip coinFlip={coinFlip}></CoinFlip>
                                </Link>
                            )
                        })}
                    </div>
                    <Footer/>
                </div>
        )
    }
}