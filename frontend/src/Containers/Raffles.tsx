import React from 'react';
import Raffle from '../Components/Raffle';
import { ethers } from "ethers";
import { Link } from 'react-router-dom';
import { RafflesAddress, _abi_raffles } from '../interfaces/Raffles_Interface';
import RaffleViewer from './RaffleViewer';
import {BrowserRouter, Route} from 'react-router-dom';
import './Raffles.css';

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
                let raffle = await rafflesContract.getRaffleByIndex(i);
                this.setState({
                    raffles: [...this.state.raffles, raffle]
                })
            }
        }
    }

    handleClick = (e: any) => {
        console.log(e)
    }


    componentDidMount() {
        this.getRaffles()
    }

    componentDidUpdate() {
        console.log(this.state)
        return <BrowserRouter>
            {this.state.raffles.map(raffle => {<Link to={`raffle/${raffle['contractAddress']}`}/>})}
            <Route path="raffle/:id" component={RaffleViewer}/>
        </BrowserRouter>
    }

    render() {
        return (
            <div className="Raffles-container-main">
                <BrowserRouter>

                    {this.state.raffles.map(raffle => {<Link to={`raffle/${raffle['contractAddress']}`}/>})}
                    <Route path="raffle/:id" component={RaffleViewer}/>
                </BrowserRouter>
                <Link to="/">
                    <button>Raffle House</button>
                </Link>
                <div className="Raffles-title-container">
                    <h2>Current Raffles</h2>
                </div> 
                <div className="Raffles-Viewer-Main">
                    {this.state.raffles.map(raffle => {
                        return <div onClick={(e) => this.handleClick(e)} className="Raffle-Div-Main-Container"><Raffle token={raffle}/></div>
                    })}
                </div>
            </div>
        )
    }
}