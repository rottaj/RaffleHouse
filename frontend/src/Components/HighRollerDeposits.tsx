import React from 'react';
import NFT from "./NFT";
import "./HighRollerDeposits.css";


interface Props {
    tokens: any
}

declare let window: any;
const HighRollerDeposits = (props:Props) => {


    return (
        <div className="HighRollerDeposits-Main-Div">

            {props.tokens.length != 0 ?

            props.tokens.map((token:any) => {return (<div className="NFT-Div-Container" ><NFT token={token}></NFT></div>)})
            :
            <h5>No Tokens</h5>
            }
        </div>
    )
}

export default HighRollerDeposits;