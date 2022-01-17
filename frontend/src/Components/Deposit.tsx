import React from 'react';
import { ethers } from 'ethers';
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";

interface Props {
    isDepositOpen: boolean;
    tokenMetaData: any;
    raffleContractAddress: string;
}

declare let window: any;
export default class Deposit extends React.Component <Props>{

    handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(e)
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const raffleContract = await new ethers.Contract(this.props.raffleContractAddress, _Raffle_abi, signer);
            const depositTxn = await raffleContract.deposit(parseInt((parseFloat(e.target[0].value) / 0.1).toString()), {
                value: ethers.utils.parseEther(e.target[0].value)
            })
            console.log(depositTxn);
            const randomNumber = await raffleContract.getRandomNumber();
            console.log("RANDOM NUMBER: ", randomNumber);
        }
    }

    render() {
        return (
            <div className="Deposit-Container-Main">
                {this.props.isDepositOpen && 
                <div className="Deposit-PopUp-Form">
                    <h3>Deposit to win {this.props.tokenMetaData.tokenName} #{this.props.tokenMetaData.tokenID}!</h3>
                    <form className="Deposit-Form" onSubmit={(e) => this.handleSubmit(e)}>
                        <input defaultValue="0.08"></input>
                        <button type="submit" >Submit Deposit</button>
                    </form>
                </div>
                }
            </div>
        )
    }
}