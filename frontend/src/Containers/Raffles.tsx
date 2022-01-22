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

declare let window: any;
export default class Raffles extends React.Component {

    state = {
        raffles: []
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
                tempRaffle['contractAddress'] = raffle['contractAddress'];
                tempRaffle['tokenImage'] = raffle['tokenImage'];
                tempRaffle['creatorAddress'] = gameInfo['creatorAddress'];
                tempRaffle['buyInPrice'] = parseInt(gameInfo['buyInPrice'], 16);
                tempRaffle['collectionName'] = gameInfo['collectionName'];
                tempRaffle['tokenID'] = parseInt(gameInfo['tokenID'], 16);
                this.setState({
                    raffles: [...this.state.raffles, tempRaffle]
                })
            }
        }
    }

    componentDidMount() {
        this.getRaffles()
    }


    render() {
        return (
            <div className="Raffles-container-main">
                <MenuItems/>
                <div className="Raffles-title-container">
                    <h1 className="Raffles-Title-h1">Current Raffles</h1>
                </div> 
                <div className="Raffles-Viewer-Main">
                    <Grid container spacing={2}>
                    {this.state.raffles.map(raffle => {
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
            </div>
        )
    }
}