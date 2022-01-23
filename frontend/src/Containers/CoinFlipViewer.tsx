import React from 'react';
import MenuItems from "../Components/MenuItems";
import { ethers } from "ethers";
import { _CoinFlip_abi } from '../interfaces/CoinFlip_Interface';
import "./CoinFlipViewer.css";
import { WindowRounded } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../Components/Footer';
import { connectContractToSigner } from '@usedapp/core';

declare let window: any;

interface GameInfoInterface {
    creatorAddress: string;
    joineeAddress: string;
    winner: string;
    buyInPrice: string;
}

interface Props {
    GameInfo?: GameInfoInterface;
}
export default class CoinFlipViewer extends React.Component<Props>{

    state = {
        coinFlipContractAddress: "",
        gameInfo: this.props.GameInfo,
        account: "",
    }



    async componentDidMount() {
        if (window.ethereum){ 
            const contractAddress = window.location.pathname.split('/').at(-1);
            this.setState({
                coinFlipContractAddress: contractAddress
            })
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
            console.log(contractAddress);
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(contractAddress, _CoinFlip_abi, signer);
            console.log(contract)
            const gameData = await contract.getGameInfo();
            this.setState({
                gameInfo: gameData
            })
        }
    }


    handleSubmit = async (e: any, contractAddress: any) => {
        e.preventDefault();
        console.log("handle submit ");
        console.log("TESTING", e.target[0].value)
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, _CoinFlip_abi, signer);
            let depositTxn = await contract.deposit({
                value: ethers.utils.parseEther(e.target[0].value).toString()
            }).then(async function () {
                // JUST FOR TESTING
                const getRandomNumber = await contract.getRandomNumber();
                console.log("RANDOM NUMBER", getRandomNumber)
            }).then(async function() {
                // JUST FOR TESTING
                const winner = await contract.getWinner();
                console.log("WINNER ", winner)
            })
            console.log(depositTxn);
        }
    }

    render() {
        return (
            <div className="CoinFlipViewer-Div-Main">
                <MenuItems account={this.state.account}/>
                <div className="CoinFlip-Game-Container">

                    <h1 className="Coinflip-Main-Title">COIN FLIP</h1>
                    {this.state.gameInfo ?
                        <div>
                            <div className="CoinFlip-GameInfo-Div">
                                <h6>Winner: {this.state.gameInfo.winner}</h6>
                            </div>
                            <div className="CoinFlip-Players-Container">


                                <div className="CoinFlip-Players-Creator-Div">
                                    <h6>Creator: {this.state.gameInfo.creatorAddress}</h6>
                                    <h6>Buy in Price: {parseInt(this.state.gameInfo.buyInPrice) / (10 ** 18)} eth</h6>
                                </div>

                                <h3>VS</h3>
                                {this.state.gameInfo.joineeAddress != "0x0000000000000000000000000000000000000000" ? 
                                    <div className="CoinFlip-Players-Joinee-Div">
                                    <h6>Joinee: {this.state.gameInfo.joineeAddress}</h6>
                                    <h6></h6>
                                    </div>
                                :
                                    <div className="CoinFlip-Players-Waiting-Div">
                                        <h6>Waiting for player</h6>
                                        <form onSubmit={(e) => this.handleSubmit(e, this.state.coinFlipContractAddress)}>
                                            <TextField value={parseInt(this.state.gameInfo.buyInPrice) / (10 ** 18)}></TextField>
                                            <Button type="submit">Deposit</Button>
                                        </form>
                                    </div>

                                }
                            </div>

                        </div>
                    :
                    "GAME DOESN'T EXIST"
                    }
                </div>
                <Footer/>
            </div>
        )
    }
}