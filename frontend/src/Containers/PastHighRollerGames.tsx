import React, { useState, useEffect } from 'react';
import HighRollerGame from '../Components/HighRollerGame';
import { ethers } from 'ethers';
import { HighRollersAddress, _HighRollers_abi } from '../interfaces/HighRollers_Interface';
import { Link } from 'react-router-dom';
import "./PastHighRollerGames.css";

declare let window: any;
const PastHighRollerGames = () => {

    const [pastGames, setPastGames]:any = useState([]);

    const getPastGames = async () => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const HighRollersContract = new ethers.Contract(HighRollersAddress, _HighRollers_abi, signer)
            let pastGames = await HighRollersContract.getPastGames();
            console.log("PAST GAMES", parseInt(pastGames))
            for ( let i=0; i<= parseInt(pastGames)-1; i++ ) {
                let tempGame = await HighRollersContract.getPastGameByIndex(i);
                setPastGames((pastGames: any) => [...pastGames, tempGame])
            }
        }
    }

    useEffect(() => { 
        getPastGames();
    }, [])

    return (
        <div className="PastHighRoller-Games-Main-Div">
            <h1 className="PastHighRoller-Games-h1">Past Games</h1>
            {pastGames.length !== 0 ? 
                <div>
                    {pastGames.map( (game: any) => {
                        return (
                            <Link to={`high-roller/${game['contractAddress']}`}>
                                <HighRollerGame winner={game.winner} tickets={parseInt(game.tickets)} contractAddress={game.contractAddress}/> 
                            </Link>
                        )
                    })}
                </div>
            : 
                <h3 className="PastGames-Header-h3">No Games</h3>
            }
        </div>
    )
}

export default PastHighRollerGames