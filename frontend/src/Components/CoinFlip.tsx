import React from 'react';
import "./CoinFlip.css";

interface Props {
    coinFlip: any
}

const CoinFlip = (props: Props) => {
    return (
        <div className="CoinFlip-Div-Main">
            <h6 className="CoinFlip-Creator-h6">{props.coinFlip.creatorAddress}</h6>
            {props.coinFlip.winner !== "0x0000000000000000000000000000000000000000" ?
            <h6 className="CoinFlip-Winner-h6">{props.coinFlip.winner}</h6>
            :
                <div>
                {props.coinFlip.joineeAddress !== "0x0000000000000000000000000000000000000000" ? 
                    <h6 className="CoinFlip-Waiting-h6"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></h6>
                :
                    <h6 className="CoinFlip-Waiting-h6">Waiting for player</h6>
                }
                </div>
            }
            <h6 className="CoinFlip-BuyIn-h6">{props.coinFlip.buyInPrice} eth </h6>
        </div>
    )
}

export default CoinFlip;