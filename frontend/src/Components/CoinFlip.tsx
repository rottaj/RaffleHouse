import React from 'react';
import "./CoinFlip.css";

interface Props {
    coinFlip: any
}

export default class CoinFlip extends React.Component <Props>{
    render() {
        return (
            <div className="CoinFlip-Div-Main">
                <h6 className="CoinFlip-Creator-h6">{this.props.coinFlip.creatorAddress}</h6>
                {this.props.coinFlip.winner != "0x0000000000000000000000000000000000000000" ?
                <h6 className="CoinFlip-Winner-h6">{this.props.coinFlip.winner}</h6>
                :
                    <div>
                    {this.props.coinFlip.joineeAddress != "0x0000000000000000000000000000000000000000" ? 
                        <h6 className="CoinFlip-Waiting-h6">Game In Progress</h6>
                    :
                        <h6 className="CoinFlip-Waiting-h6">Waiting for player</h6>
                    }
                    </div>
                }
                <h6 className="CoinFlip-BuyIn-h6">{this.props.coinFlip.buyInPrice} eth </h6>
            </div>
        )
    }

}