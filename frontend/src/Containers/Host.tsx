import React from 'react';
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from '../Components/CoinFlipCreator';
import "./Host.css";
export default class Host extends React.Component {
    render() {
        return (
            <div className="Host-Container-Main-Div">
                <RaffleCreator/>
                <CoinFlipCreator/>
            </div>
        )
    }
}