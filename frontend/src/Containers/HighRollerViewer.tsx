import React, { useState, useEffect } from 'react';
import HighRollerDeposits from '../Components/HighRollerDeposits';
import PlayersList from '../Components/PlayersList';
import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import fetchNFTs from '../utils/HandleNFTs';
import { _abi } from '../interfaces/Eyescream_Interface';
import { _HighRoller_abi } from '../interfaces/HighRoller_Interface';
import { ethers } from 'ethers';
import "./HighRollerViewer.css";




const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_ABI = 'https://api.etherscan.io/api?module=contract&action=getabi&address='
//&apikey=YourApiKeyToken
const ETHERSCAN_API_KEY = 'FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI';





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
const HighRollerViewer = () => {


    const [account, setAccount] = useState('');
    const [gameTokens, setGameTokens]:any = useState([]);
    const [players, setPlayers]:any = useState([]);


    const getUniqueAddresses = (array: any) => {
        let unique = array.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i);
        return unique;
    }

    const getOccurances = (array: any, val: any) =>{
        let ticketNumber = array.reduce((a: any, v: any) => (v === val ? a + 1 : a), 0);
        return ticketNumber;
    }

    const getTickets = async (uniqueAddresses: any, tickets: any) => {
        console.log(tickets)
        for (let i=0; i<=uniqueAddresses.length; i++ ) {
            let ticketNumber = getOccurances(tickets, uniqueAddresses[i])
            if (uniqueAddresses[i] !== undefined) {
                console.log("TESTING GET_TICKETS", uniqueAddresses[i], ticketNumber, (ticketNumber).toFixed(2))
                let player = {address: uniqueAddresses[i], tickets: ticketNumber, totalEth: (ticketNumber).toFixed(2), chance: ((ticketNumber / tickets.length) * 100).toFixed(2)}
                setPlayers((players: any) => [...players, player]);
            }
        }

    }


    useEffect(() => {

        const contractAddress = window.location.pathname.split('/').at(-1);
        const mountGameInfo = async () => {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            setAccount(account);
            console.log(contractAddress);
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(contractAddress, _HighRoller_abi, signer);
            console.log(contract)

            fetchNFTs(contractAddress).then(data => {
                setGameTokens(data);
            }); // FETCHES GAME TOKENS
            const currentHighRollerContract = new ethers.Contract(contractAddress, _HighRoller_abi, signer);
            const tickets = await currentHighRollerContract.getTickets();
            console.log("TICKETS", tickets)
            const uniqueAddresses = getUniqueAddresses(tickets);
            getTickets(uniqueAddresses, tickets);
        }
        if (window.ethereum){ 
            mountGameInfo()
        }
    }, [])


    return (
        <div className="HighRollerViewer-Main-Container">
            <MenuItems account={account}/>
            <Messages/>
            <div className="HighRollerViewer-Game-Container">
                <div className="HighRollers-GameInfo-Container">
                    <HighRollerDeposits tokens={gameTokens}/>
                </div>

                <div className="HighRollers-PlayerList-Container">
                    <PlayersList players={players}/>
                </div>
            </div>

        </div>
    )
}

export default HighRollerViewer;