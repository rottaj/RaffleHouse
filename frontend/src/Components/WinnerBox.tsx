import React from 'react';
import "./WinnerBox.css";
export default class WinnerBox extends React.Component {
    render() {
        return (
            <div className="WinnerBox-Main-Div">
                <h3 className="Title-Raffle-Winner">Round Winner</h3>
                <h3 className="Title-Raffle-Total-Pot">Total</h3>
                <h3 className="Title-Raffle-Chance">Chance</h3>
            </div>
        )
    } 
}