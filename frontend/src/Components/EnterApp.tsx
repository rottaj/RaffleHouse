import React from 'react';
import { ethers } from 'ethers';


declare let window: any;
export default class EnterApp extends React.Component {


    connectWallet = async () => {
        if (window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();

        }
    }


    render() {
        return (
            <div>
                <button onClick={this.connectWallet}> Connect Wallet </button>
            </div>
        )
    }
}