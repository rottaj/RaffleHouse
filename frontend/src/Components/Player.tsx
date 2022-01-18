import React from 'react';
import "./Player.css";
interface PlayerInterface {
    address: string;
    tickets: number;
    totalEth: number;
    chance: number;
}

interface Props {
    player: PlayerInterface;
}

export default class Player extends React.Component <Props>{
    render() {
        return (
            <div className="Player-Component-Main-Container">
                <p className="Player-Address">{this.props.player.address}</p>
                <p className="Player-Tickets">{this.props.player.tickets}</p>
                <p className="Player-TotalEth">{this.props.player.totalEth}</p>
                <p className="Player-Chance">{this.props.player.chance} %</p>
            </div>
        )
    }
}