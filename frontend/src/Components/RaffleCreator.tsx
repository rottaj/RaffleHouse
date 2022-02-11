import { useState, useEffect } from 'react';
import NFTSelector from "./NFTSelector";
import { ethers, ContractFactory } from 'ethers';
import { _abi } from '../interfaces/Eyescream_Interface';
import { _Raffle_abi, _Raffle_bytecode } from "../interfaces/RaffleEscrow_Interface";
import { RafflesAddress, _abi_raffles } from '../interfaces/Raffles_Interface';
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


    const [tokens, setTokens]: any = useState([]);
    const [RaffleFormOpen, setRaffleFormOpen] = useState(false);


    const handleRaffleForm = () => {
        setRaffleFormOpen(!RaffleFormOpen);
    }



    const fetchNFTs = async () => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            var accounts = await window.ethereum.send('eth_requestAccounts');

            var url = ETHERSCAN_API_NFT_TXN + accounts.result[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
            fetch(url).then(res => {
                return res.json();
            })
            .then(data => {
                var tempTokens: Token[] = []
                //console.log("TOKENS TESTING FOOBAR", data.result)
                for (let i=0; i<=data.result.length; i++ ) {
                    if (tempTokens.length > 0) {
                        try {
                            let index = tempTokens.findIndex(temp => (temp['tokenID'] === data.result[i]['tokenID']) && (temp['contractAddress'] === data.result[i]['contractAddress']));
                            if (index === -1) {
                                tempTokens.push(data.result[i])
                            } else {
                                tempTokens.splice(index, 1)
                            }
                        } 
                        catch(err) {
                            console.log(err)
                        }
                    }
                    else {
                        tempTokens.push(data.result[i])
                    }
                }
                getMetaData(tempTokens)
            })
            

        }
    }

    const getMetaData = async (tempTokens: any) => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            for (let i=0; i<=tempTokens.length; i++ ) {
                //try {
                if(tempTokens[i]) {
                    //if (String(tokens[i].contractAddress) === '0x8f44a8b9059b2bc914c893eed250a2e1097ee187') { // THIS IS EYESCREAM ADDRESS (UPDATE THIS !!!)
                        let contract = new ethers.Contract(tempTokens[i].contractAddress, _abi, signer)
                        let metaData = await contract.tokenURI(parseInt(tempTokens[i].tokenID))
                        fetch(metaData).then(res => {return res.json()}).then(data => {
                            if (data.image.startsWith('ipfs://')) {
                                tempTokens[i]['image'] = 'https://ipfs.io/ipfs' + data.image.slice(6)
                            } else {
                                tempTokens[i]['image'] = data.image
                            }
                            setTokens((tokens: any) => [...tokens, tempTokens[i]])
                        }).catch((err) => console.log(err))
                    //}
                }
                //}
                //catch(err) {
                    //console.log(err)
                //}
            }

        }
    }



    useEffect(() =>  {
        fetchNFTs()
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
                <NFTSelector tokens={tokens} />
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