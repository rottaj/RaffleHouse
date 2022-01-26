import { ethers } from "ethers";
import React from 'react';

interface Props {
    contractAddress: string
}

declare let window: any;
export default class HighRollerDeposits extends React.Component <Props>{

    state = {
        depositedTokens: []
    }

    async componentDidMount() {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
        }
    }

    render() {
        return (
            <div className="HighRollerDeposits-Main-Div">

            </div>
        )
    }
}