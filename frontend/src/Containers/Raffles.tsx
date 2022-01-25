import React from 'react';
import Raffle from '../Components/Raffle';
import { ethers } from "ethers";
import { Link } from 'react-router-dom';
import { RafflesAddress, _abi_raffles } from '../interfaces/Raffles_Interface';
import { _Raffle_abi } from '../interfaces/RaffleEscrow_Interface';
import { Grid } from "@mui/material";
import RaffleViewer from './RaffleViewer';
import {BrowserRouter, Route} from 'react-router-dom';
import './Raffles.css';
import MenuItems from "../Components/MenuItems";
import Footer from '../Components/Footer';
import Messages from "../Components/Messages";
import Header from "./Header";

declare let window: any;
export default class Raffles extends React.Component {

    state = {
        currentRaffles: [],
        pastRaffles: [],
        account: ""
    }

    async componentDidMount() {
        document.title = "Raffles - Raffle House"
        this.getRaffles()
        if(window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
        }
    }  

    getRaffles = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const rafflesContract = await new ethers.Contract(RafflesAddress, _abi_raffles, signer);
            let rafflesLength = await rafflesContract.getRaffles();
            for (let i =0; i<=rafflesLength-1; i++ ) {
                var tempRaffle:any  = {}

                let raffle = await rafflesContract.getRaffleByIndex(i);
                const raffleInstance = await new ethers.Contract(raffle.contractAddress, _Raffle_abi, signer);
                const gameInfo = await raffleInstance.getGameInfo();
                console.log("GAME INFO", gameInfo.winner, gameInfo)
                tempRaffle['contractAddress'] = raffle['contractAddress'];
                tempRaffle['tokenImage'] = raffle['tokenImage'];
                tempRaffle['creatorAddress'] = gameInfo['creatorAddress'];
                tempRaffle['buyInPrice'] = parseInt(gameInfo['buyInPrice'], 16);
                tempRaffle['winner'] = gameInfo['winner'];
                tempRaffle['collectionName'] = gameInfo['collectionName'];
                tempRaffle['tokenID'] = parseInt(gameInfo['tokenID'], 16);
                if (gameInfo.winner === "0x0000000000000000000000000000000000000000") {
                    this.setState({
                        currentRaffles: [...this.state.currentRaffles, tempRaffle]
                    })
                }else {
                    this.setState({
                        pastRaffles: [...this.state.pastRaffles, tempRaffle]
                    })
                }
            }
        }
    }


    render() {
        return (
            <div className="Raffles-container-main">
                <Header/>
                <MenuItems account={this.state.account}/>
                <Messages/>
                <div className="Raffles-title-container">
                    <h1 className="Raffles-Title-h1">Current Raffles</h1>
                </div> 
                <div className="Raffles-Viewer-Main">
                    <Grid container spacing={2}>
                        {this.state.currentRaffles.map(raffle => {
                            return (
                                <Link to={`raffle/${raffle['contractAddress']}`}>
                                    <div className="Raffle-Div-Main-Container">
                                        <Grid item xs={8}>
                                            <Raffle token={raffle}/>
                                        </Grid>
                                    </div>
                                </Link>
                            )
                        })}
                    </Grid>


                </div>
                <div className="PastRaffles-Viewer-Main">
                    <div className="PastRaffles-title-container">
                        <h1 className="PastRaffles-Title-h1">Past Raffles</h1>
                    </div> 
                    <Grid className="PastRaffles-Grid-Container" container spacing={2}>
                        {this.state.pastRaffles.map(raffle => {
                            return (
                                <Link to={`raffle/${raffle['contractAddress']}`}>
                                    <div className="PastRaffle-Div-Main-Container">
                                        <Grid className="PastRaffle-Grid-Item" item xs={8}>
                                            <Raffle token={raffle}/>
                                        </Grid>
                                    </div>
                                </Link>
                            )
                        })}
                    </Grid>
                </div>
                <Footer/>

            </div>

        )
    }
}