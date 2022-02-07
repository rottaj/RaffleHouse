import { ethers } from "ethers";
import React from 'react';
import NFT from "./NFT";
import "./HighRollerDeposits.css";
interface Props {
    tokens: any
}


declare let window: any;
export default class HighRollerDeposits extends React.Component <Props>{


    render() {
        return (
            <div className="HighRollerDeposits-Main-Div">

                {this.props.tokens.length != 0 ?

                this.props.tokens.map((token:any) => {return (<div className="NFT-Div-Container" ><NFT token={token}></NFT></div>)})
                :
                <h5>No Tokens</h5>
                }
            </div>
        )
    }
}