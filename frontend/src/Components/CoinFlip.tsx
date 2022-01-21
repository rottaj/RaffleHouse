import React from 'react';
import "./CoinFlip.css";

interface Props {
    coinFlip: any
}

export default class CoinFlip extends React.Component <Props>{
    render() {
        return (
            <div className="CoinFlip-Div-Main">
                <h6 className="CoinFlip-Creator-h6"> Creator: {this.props.coinFlip.creatorAddress}</h6>
                <h6 className="CoinFlip-Winner-h6"> Winner: {this.props.coinFlip.winner}</h6>
                <h6 className="CoinFlip-BuyIn-h6">Buy In Price: {this.props.coinFlip.buyInPrice} eth </h6>
            </div>
        )
    }

}