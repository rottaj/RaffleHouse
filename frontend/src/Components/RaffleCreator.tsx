import { useState, useEffect } from 'react';
import NFTSelector from "./NFTSelector";
import { ethers, ContractFactory } from 'ethers';
import { _abi } from '../interfaces/Eyescream_Interface';
import { _Raffle_abi, _Raffle_bytecode } from "../interfaces/RaffleEscrow_Interface";
import { RafflesAddress, _abi_raffles } from '../interfaces/Raffles_Interface';
import fetchNFTs from '../utils/HandleNFTs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./RaffleCreator.css";
require('dotenv').config();
const ETHERSCAN_NFT_TXN = process.env.ETHERSCAN_API_NFT_TXN;
// 
/*
process.env.ETHERSCAN_API_NFT_TXN + ${0xB702DC679dCe8d27c77AC49A63B9A138B674929E} + ${&startblock=0&endblock=999999999&sort=asc&apikey=} + process.env.API_KEY
*/
// REMOVE THIS --> MOVE TO .ENV
const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI';
interface Props {
    isOpen: boolean;
    tokens?: Token[];
}

interface Token {
    blockHash: string;
    blockNumber: number;
    confirmations: number;
    contractAddress: string; 
    cumulativeGasUsed: number;
    from: string;
    gas: number;
    gasPrice: number;
    gasUsed: number; 
    hash: string;
    image: string;
    input: string;
    nonce: number;
    timeStamp: number;
    to: string;
    tokenDecimal: number;
    tokenID: number;
    tokenName: string;
    tokenSymbol: string;
    transactionIndex: number;
}



declare let window: any;
const RaffleCreator = () => {


    const [userTokens, setUserTokens]: any = useState([]);
    const [RaffleFormOpen, setRaffleFormOpen] = useState(false);


    const handleRaffleForm = () => {
        setRaffleFormOpen(!RaffleFormOpen);
    }


    useEffect(() =>  {
        const mountUserTokens = async() => {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            fetchNFTs(account).then(data => {
                setUserTokens(data);
            })
        }

        if (window.ethereum) {
            mountUserTokens();
        }
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const raffleFactory = new ContractFactory(_Raffle_abi, _Raffle_bytecode, signer) // Initialize new Raffle 
            const rafflesContract = await new ethers.Contract(RafflesAddress, _abi_raffles, signer)  // connect to Raffles Contract
            // DEPLOY CONTRACT
            const account = accounts.result[0];
            //const selectedToken = this.tokenSelector.state.selectedToken; // maybe remove?
            /*
            const contract = await raffleFactory.deploy(
                                                        parseInt(e.target[0].value),
                                                        parseInt(e.target[1].value),
                                                        selectedToken.image, 
                                                        selectedToken.contractAddress,
                                                        selectedToken.tokenName,
                                                        selectedToken.tokenID
                                                        );
            await contract.deployed().then(async function (data) {
                console.log(data);
                const collectionContract = await new ethers.Contract(selectedToken.contractAddress, _abi, signer);
                const sendingTxn = await collectionContract.transferFrom(account, contract.address, selectedToken.tokenID);
            }).then(async function (dataTwo) {
                console.log(dataTwo);
                const addRaffleTxn = rafflesContract.addRaffle(selectedToken.image, contract.address, selectedToken.tokenName, selectedToken.tokenID)
            })
            */
        }
    }

    return (
        <div className="CreateRaffleForm-Main" >
            <div className="PopUpRaffle-Form">
                <h3 className="CreateRaffle-h3">Create your Raffle!</h3>
                <NFTSelector tokens={userTokens} />
                <div className="CreateRaffle-Form-Container">
                    <form className="CreateRaffle-Form" onSubmit={(e) => handleSubmit(e)}>
                        <h3 className="Minimum-BuyIn-h3">Minimum Buy in: </h3>
                        <TextField className="RaffleForm-Minimum-Buyin" defaultValue="0.08" id="filled-basic" label="Deposit" variant="filled"></TextField>
                        <h3 className="Minimum-BuyIn-h3">Minimum Tickets: (1 ticket = 0.01)</h3>
                        <TextField className="RaffleForm-Minimum-Tickets" defaultValue="16" id="filled-basic" label="Deposit" variant="filled"></TextField>
                        <Button variant="contained" type="submit" style={{maxHeight: '55px'}}>
                            Create Raffle
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RaffleCreator;