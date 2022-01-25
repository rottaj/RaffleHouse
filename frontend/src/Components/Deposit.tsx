import React from 'react';
import { ethers } from 'ethers';
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Deposit.css";

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
            console.log("TESTING DEPOSIT>> TICKETS", (parseInt((parseFloat(e.target[0].value) / 0.01).toString())))
            const depositTxn = await raffleContract.deposit(parseInt((parseFloat(e.target[0].value) / 0.01).toString()), {
                value: ethers.utils.parseEther(e.target[0].value)
            })
            /* // REMOVED -- UPDATED RAFFLEESCROW
            .then(async (data: any) => {
                console.log(data)
                //console.log(depositTxn);
                const randomTxn = await raffleContract.getRandomNumber();
                console.log("RANDOM TXN TEST", randomTxn)
                const winner = await raffleContract.getWinner();
                console.log("WINNNNER", winner)
            })
            */
            //console.log("RANDOM NUMBER: ", randomNumber);
        }
    }

    render() {
        return (
            <div className="Deposit-Container-Main">
                {this.props.isDepositOpen && 
                <div className="Deposit-PopUp-Form">
                    <h3 className="Deposit-To-Win-h3">Deposit to win {this.props.tokenMetaData.tokenName} #{this.props.tokenMetaData.tokenID}!</h3>
                    <form className="Deposit-Form" onSubmit={(e) => this.handleSubmit(e)}>
                            <TextField defaultValue="0.08" id="filled-basic" label="Deposit" variant="outlined" sx={{input: { color:'white'}}}></TextField>
                            <Button variant="contained" type="submit" style={{maxHeight: '55px'}}>
                                Submit Deposit
                            </Button>
                    </form>
                </div>
                }
            </div>
        )
    }
}