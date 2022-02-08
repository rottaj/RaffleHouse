import React from 'react';
import HighRollerGame from '../Components/HighRollerGame';
import { ethers } from 'ethers';
import { HighRollersAddress, _HighRollers_abi } from '../interfaces/HighRollers_Interface';
import "./PastHighRollerGames.css";

declare let window: any;
export default class PastHighRollerGames extends React.Component {

    state = {
        pastGames: []
    }

    getPastGames = async () => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const HighRollersContract = new ethers.Contract(HighRollersAddress, _HighRollers_abi, signer)
            let pastGames = await HighRollersContract.getPastGames();
            console.log("PAST GAMES", parseInt(pastGames))
            for ( let i=0; i<= parseInt(pastGames)-1; i++ ) {
                let tempGame = await HighRollersContract.getPastGameByIndex(i);
                this.setState({
                    pastGames: [...this.state.pastGames, tempGame]
                })
            }
        }
    }

    componentDidMount() {
        this.getPastGames();
    }

    render() {
        return (
            <div className="PastHighRoller-Games-Main-Div">
                <h1 className="PastHighRoller-Games-h1">Past Games</h1>
                {this.state.pastGames.length !== 0 ? 
                    <div>
                        {this.state.pastGames.map( (game: any) => {
                            return (
                                <HighRollerGame winner={game.winner} tickets={parseInt(game.tickets)} contractAddress={game.contractAddress}/> 
                            )
                        })}
                    </div>
                : 
                    <h3 className="PastGames-Header-h3">No Games</h3>
                }
            </div>
        )
    }
}