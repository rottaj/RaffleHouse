import React from 'react';
import Player from "./Player";
import "./PlayersList.css";

interface PlayerInterface {
    address: string;
    tickets: number;
    totalEth: number;
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
                {this.props.players.map(player => {return <Player player={player}/>})}
            </div>
        )
    }
}