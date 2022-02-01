import React from 'react';
import { ethers } from 'ethers';
import { _HighRollers_abi } from '../interfaces/HighRollers_Interface';
import "./HighRollerGame.css";

interface Props {
    winner: string
    tickets: number,
    contractAddress: string,
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
                <h6 className="PastHighRollerGame-Address-h6">Contract: {this.props.contractAddress}</h6>
            </div>
        )
    }
}