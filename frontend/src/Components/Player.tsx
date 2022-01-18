import React from 'react';
import "./Player.css";
interface PlayerInterface {
    address: string;
    tickets: number;
    totalEth: number;
}

interface Props {
    player: PlayerInterface;
}

export default class Player extends React.Component <Props>{
    render() {
        return (
            <div className="Player-Component-Main-Container">
                Player: {this.props.player.address}  
                Tickets: {this.props.player.tickets}  
                Total ETH: {this.props.player.totalEth}
            </div>
        )
    }
}