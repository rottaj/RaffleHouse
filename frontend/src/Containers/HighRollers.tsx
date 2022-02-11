import { ethers } from "ethers";
import { _abi } from "../interfaces/Eyescream_Interface";
import {
  HighRollersAddress,
  _HighRollers_abi,
} from "../interfaces/HighRollers_Interface";
import { _HighRoller_abi } from "../interfaces/HighRoller_Interface";
import { useState, useEffect } from 'react';
import fetchNFTs from '../utils/HandleNFTs';

import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import NFTSelector from "../Components/NFTSelector";
import PlayerList from "../Components/PlayersList";
import HighRollerDeposits from "../Components/HighRollerDeposits";
import PastHighRollerGames from "./PastHighRollerGames";
import Footer from "../Components/Footer";
import Button from "@mui/material/Button";
import "./HighRollers.css";
import BaseContainer from "../Components/BaseContainers/BaseContainer";

const ETHERSCAN_API_NFT_TXN =
  "https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=";
const ETHERSCAN_API_ABI =
  "https://api.etherscan.io/api?module=contract&action=getabi&address=";
//&apikey=YourApiKeyToken
const ETHERSCAN_API_KEY = "FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI";

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

interface CurrentGame {
  contractAddress: string;
  startTime: string;
  endTime: string;
  winner: string;
}

declare let window: any;

const HighRollers = () => {


    const [userTokens, setUserTokens]:any = useState([]);
    const [gameTokens, setGameTokens]:any = useState([]);   
    const [players, setPlayers]:any = useState([]);
    const [currentGame, setCurrentGame] = useState({contractAddress: "", startTime: "", endTime: "", winner: ""});
    const [account, setAccount] = useState('');
    const [minutesLeft, setMinutesLeft] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(0);
    

    const handleDeposit = async () => {
        var provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        var accounts = await window.ethereum.send('eth_requestAccounts');
        const account = accounts.result[0];
        /*  // NEED TO REFACTOR TOKENSELECTOR
        const collectionContract = await new ethers.Contract(selectedToken.contractAddress, _abi, signer);
        const sendingTxn = await collectionContract.transferFrom(account, currentGame.contractAddress, selectedToken.tokenID);
        sendingTxn.wait();
        if (sendingTxn) {
            const requestParameters = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tickets: selectedToken.tokenPrice, playerAddress: account, tokenURI: selectedToken.image }) // CREATE REQUEST BODY ( WILL ADD CONTRACT ADDRESS + TOKEN ID FOR BACKEND AUTH)
            };
            fetch('http://127.0.0.1:8080/submit-tickets-high-rollers', requestParameters).then(res => { // FETCH TO HIGHROLLER API
                return res.json()
            }).then(data => {
                console.log(data)
            })
        }
        */

    }

    // END OF DEPOSITS


    // START OF GAME INFO
    const getCountDown = () => {
        let dateString: any = parseInt(currentGame.endTime);
        var now = new Date().getTime();
        var countDownDate = new Date(dateString).getTime();
        var minutes  = parseInt(String((countDownDate - (now) / 1000) / 60))
        var seconds = parseInt(String(((countDownDate - (now / 1000)) - (parseInt(String(minutes)) * 60))))
        if (minutes <= 0) {
            minutes = 0
        }
        if (seconds <= 0) {
            seconds = 0
        }
        setMinutesLeft(minutes);
        setSecondsLeft(seconds);
    }

    // END OF GAME INFO


    const getUniqueAddresses = (array: any) => {
        let unique = array.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i);
        return unique;
    }

    const getOccurances = (array: any, val: any) => {
        let ticketNumber = array.reduce((a: any, v: any) => (v === val ? a + 1 : a), 0);
        return ticketNumber;
    }

    const getTickets = async (uniqueAddresses: any, tickets: any) => {
        console.log(tickets)
        for (let i=0; i<=uniqueAddresses.length; i++ ) {
            let ticketNumber = getOccurances(tickets, uniqueAddresses[i])
            if (uniqueAddresses[i] !== undefined) {
                let player = {address: uniqueAddresses[i], tickets: ticketNumber, totalEth: (ticketNumber).toFixed(2), chance: ((ticketNumber / tickets.length) * 100).toFixed(2)}
                setPlayers((players: any) => [...players, player])
            }
        }

    }


    useEffect(() => {
        document.title = "High Rollers - Raffle House"
        const mountHighRollerGameInfo = async () => {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            setAccount(account);
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const HighRollersContract = new ethers.Contract(HighRollersAddress, _HighRollers_abi, signer);
            const currentHighRollerGame: any = await HighRollersContract.getCurrentGame();
            var currentGameInstance: CurrentGame = {contractAddress: currentHighRollerGame['contractAddress'], startTime: currentHighRollerGame.startTime, endTime: currentHighRollerGame.endTime, winner: currentHighRollerGame.winner}
            setCurrentGame(currentGameInstance);
            fetchNFTs(account).then(data => {
                setUserTokens(data);
            }) // FETCHES USER NFTS
            fetchNFTs(currentGameInstance.contractAddress); // FETCHES GAME TOKENS
            const currentHighRollerContract = new ethers.Contract(currentGameInstance.contractAddress, _HighRoller_abi, signer);
            const tickets = await currentHighRollerContract.getTickets();
            const uniqueAddresses = getUniqueAddresses(tickets);
            getTickets(uniqueAddresses, tickets);
        }

        if(window.ethereum) {
            mountHighRollerGameInfo();
            var interval = setInterval(() => {
                getCountDown();
            }, 1000)
        }
    }, [])


    return (
        <div className="HighRollers-Div-Main">
            {console.log("TESTING TOKENS", userTokens)}
            <MenuItems account={account}/>
            <Messages/>
            <h3 className="HighRollers-Current-Game-h3">HIGH ROLLERS</h3>
            {currentGame.contractAddress ?
                <div>
                    <h3 className="HighRollers-Current-Game-Address-h3">Current Game: {currentGame.contractAddress}</h3>
                    {currentGame.winner !== "0x0000000000000000000000000000000000000000" ?
                        <h3 className="HighRollers-Current-Game-Winner-Address-h3">Winner: {currentGame.winner}</h3>
                    :    
                        <div> 
                            <h3 className="HighRollers-Current-Game-Winner-Address-h3">Game in Progress</h3>
                            <h6 className="CoinFlip-Waiting-h6"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></h6>
                        </div>
                    }
                    <h3 className="HighRollers-Current-Game-TimeLeft-h3"> {minutesLeft} Minutes {secondsLeft} Seconds </h3>
                </div>
            :
                <h3 className="HighRollers-Current-Game-Address-h3">No Game</h3>
            }

            <div className="HighRollers-GameInfo-Container">
                <HighRollerDeposits tokens={gameTokens}/>
            </div>

            <div className="HighRollers-PlayerList-Container">
                <PlayerList players={players}/>
            </div>
            <Button onClick={() => handleDeposit() }variant="contained" type="submit" style={{maxHeight: '55px'}}>
                Deposit 
            </Button>
            <NFTSelector tokens={userTokens}  />
            <PastHighRollerGames/>
            <Footer/>
        </div>
    )
}

export default HighRollers;
