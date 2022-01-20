import React from 'react';
import { ethers, ContractFactory } from 'ethers';
import { _CoinFlip_abi, _CoinFlip_bytecode } from "../interfaces/CoinFlip_Interface";
import { CoinFlipAddress, _CoinFlips_abi } from '../interfaces/CoinFlips_Interface';
import "./CoinFlipCreator.css";

interface Props {
    isOpen: boolean;
}

declare let window: any;
export default class CoinFlipCreator extends React.Component {


    handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("HANDLE SUBMIT", e.target)
        if (window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const CoinFlipFactory = new ContractFactory(_CoinFlip_abi, _CoinFlip_bytecode, signer) // Initialize new Raffle 
            const coinFlipsContract = await new ethers.Contract(CoinFlipAddress, _CoinFlips_abi, signer)  // connect to Raffles Contract
            // DEPLOY CONTRACT
            const account = accounts.result[0];
            const contract = await CoinFlipFactory.deploy(parseInt(e.target[0].value)); // FIX THIS not parseInt
            await contract.deployed().then(async function (data) {
                console.log(data);
                const depositTxn = contract.deposit(parseInt(e.target[0].value), {
                    value: ethers.utils.parseEther(parseInt(e.target[0].value).toString())
                }).then(async function () {
                    const addCoinFlipsTxn = coinFlipsContract.addCoinFlip(contract.address, parseInt(e.target[0].value));
                    console.log("COINFLIPS TXN", addCoinFlipsTxn);
                })
            })
        }
    }

    render() {
        return (
            <div className="Create-Coin-Flip-Main">
                {/* {this.props.isOpen &&  */}
                <div className="PopUp-Form">
                    <h3>Host a CoinFlip Game!</h3>
                    <form className="CreateCoinFlip-Form" onSubmit={(e) => this.handleSubmit(e)}>
                        Minimum Buy in:
                        <input className="CoinFlipForm-Minimum-Buyin" defaultValue="0.5"></input>
                        <br></br>
                        <br></br>
                        <button type="submit">Submit Proposal</button>
                    </form>
                </div>
                {/* } */}
            </div>
        )
    }
}