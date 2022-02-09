import React from 'react';
import "./PlayersList.css";

interface PlayerInterface {
    address: string;
    tickets: number;
    totalEth: number;
    chance: number;
}

interface PropsPlayersList {
    players: PlayerInterface[];
}

const PlayersList = (props:PropsPlayersList) => {
    return (
        <div className="PlayersList-Main-Container">
            <div className="PlayersList-Box-Header">
                <h4 className="PlayersList-Player-Header">Player</h4>
                <h4 className="PlayersList-Tickets-Header">Tickets</h4>
                <h4 className="PlayersList-TotalEth-Header">Total Eth</h4>
                <h4 className="PlayersList-Chance-Header">Chance</h4>
            </div>
            {props.players.map(player => {return <Player player={player}/>})}
        </div>
    )
}

export default PlayersList;

interface Props {
    player: PlayerInterface;
}

const Player = (props:Props) => {
    return (
        <div className="Player-Component-Main-Container">
            <p className="Player-Address">{props.player.address}</p>
            <p className="Player-Tickets">{props.player.tickets}</p>
            <p className="Player-TotalEth">{props.player.totalEth}</p>
            <p className="Player-Chance">{props.player.chance} %</p>
        </div>
    )
}