import React from 'react';
import "./CoinFlip.css";

interface Props {
    coinFlip: any
}

export default class CoinFlip extends React.Component <Props>{
    render() {
        return (
            <div className="CoinFlip-Div-Main">
                {this.props.coinFlip.contractAddress}
            </div>
        )
    }

}