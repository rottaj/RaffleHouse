import React from 'react';
import { ethers } from 'ethers';
import { _HighRoller_abi } from "../interfaces/HighRoller_Interface";
import { _HighRollers_abi } from '../interfaces/HighRollers_Interface';
import "./HighRollerGame.css";

interface Props {
    winner: string
    tickets: number,
}

declare let window: any;
export default class HighRollerGame extends React.Component <Props>{

    state = {
        winner: ""
    }


    render() {
        return (
            <div>
                <h3 className="PastHighRollerGame-Winner-h3">Winner: {this.props.winner}</h3>
                <h3 className="PastHighRollerGame-Tickets-h3">Tickets: {this.props.tickets}</h3>
            </div>
        )
    }
}