import { ethers } from "ethers";
import React from 'react';
import NFT from "./NFT";
interface Props {
    tokens: any
}

declare let window: any;
export default class HighRollerDeposits extends React.Component <Props>{

    async componentDidMount() {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
        }
    }

    render() {
        return (
            <div className="HighRollerDeposits-Main-Div">
                {this.props.tokens.map((token:any) => {return (<div className="NFT-Div-Container" ><NFT token={String(token.image)}></NFT></div>)})}
            </div>
        )
    }
}