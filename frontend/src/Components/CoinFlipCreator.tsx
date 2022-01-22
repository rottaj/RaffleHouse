import React from 'react';
import { ethers, ContractFactory } from 'ethers';
import { _CoinFlip_abi, _CoinFlip_bytecode } from "../interfaces/CoinFlip_Interface";
import { CoinFlipAddress, _CoinFlips_abi } from '../interfaces/CoinFlips_Interface';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
            const contract = await CoinFlipFactory.deploy(ethers.utils.parseEther(parseFloat(e.target[0].value).toFixed(1))); // FIX THIS not parseInt
            await contract.deployed().then(async function (data) {
                console.log(data);
                const depositTxn = contract.deposit({
                    value: ethers.utils.parseEther(e.target[0].value.toString())
                }).then(async function () {
                    const addCoinFlipsTxn = coinFlipsContract.addCoinFlip(contract.address, ethers.utils.parseEther(parseFloat(e.target[0].value).toFixed(1)));
                    console.log("COINFLIPS TXN", addCoinFlipsTxn);
                })
            })
        }
    }

    render() {
        return (
            <div className="CreateCoinFlipForm-Main" >
                <div className="PopUpCoinFlip-Form">
                    <h3 className="CreateCoinFlip-h3">Host a CoinFlip Game!</h3>
                    <div className="CreateCoinFlip-Form-Container">
                        <h3 className="MinimumCoinFlip-BuyIn-h3">Minimum Buy in: </h3>
                        <form className="CreateCoinFlip-Form" onSubmit={(e) => this.handleSubmit(e)}>
                            <TextField className="CoinFlipForm-Minimum-Buyin" defaultValue="0.08"></TextField>
                            <Button type="submit">Create Game</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}