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
const HighRollerGame = (props:Props) => {

    return (
        <div className="PastHighRollerGame-Main-Div">
            <h3 className="PastHighRollerGame-Winner-h3">Winner: {props.winner}</h3>
            <h3 className="PastHighRollerGame-Tickets-h3">Tickets: {props.tickets}</h3>
            <h6 className="PastHighRollerGame-Address-h6">Contract: {props.contractAddress}</h6>
        </div>
    )
}

export default HighRollerGame;