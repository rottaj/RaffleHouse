import React from 'react';
import "./WinnerBox.css";

interface Props {
    winner: string;
}
export default class WinnerBox extends React.Component <Props> {
    render() {
        return (
            <div className="WinnerBox-Main-Div">
                <h3 className="Title-Raffle-Winner">Round Winner:</h3>
                {this.props.winner != "0x0000000000000000000000000000000000000000" ?
                    <h3>{this.props.winner}</h3>
                :
                    <h3>Winner not picked</h3>
                }
                { /*
                <h3 className="Title-Raffle-Total-Pot">Total</h3>
                <h3 className="Title-Raffle-Chance">Chance</h3>
                */ }
            </div>
        )
    } 
}