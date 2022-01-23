import React from 'react';
import { ethers } from 'ethers';

interface Props{
    account: string;
}

declare let window: any;
export default class EnterApp extends React.Component <Props> {


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
                {console.log(this.props.account, "testtest")}
                {this.props.account != "" ?
                  <h3>{this.props.account.substring(0, 6) + "..." + this.props.account.substring(36, 40)}</h3>
                :
                  <button onClick={this.connectWallet}> Connect Wallet </button>
                }
            </div>
        )
    }
}