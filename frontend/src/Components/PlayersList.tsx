import React from 'react';
import Player from "./Player";
import "./PlayersList.css";

interface PlayerInterface {
    address: string;
    tickets: number;
    totalEth: number;
    chance: number;
}

interface Props {
    players: PlayerInterface[];
}

export default class PlayersList extends React.Component <Props>{
    render() {
        return (
            <div className="PlayersList-Main-Container">
                Players List
                {console.log(this.props)}
                <div className="PlayersList-Box-Header">
                <h4 className="PlayersList-Player-Header">Player</h4>
                <h4 className="PlayersList-Tickets-Header">Tickets</h4>
                <h4 className="PlayersList-TotalEth-Header">Total Eth</h4>
                <h4 className="PlayersList-Chance-Header">Chance</h4>
                </div>
                {this.props.players.map(player => {return <Player player={player}/>})}
            </div>
        )
    }
}