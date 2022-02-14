import { ethers } from "ethers";
import { _abi } from "../interfaces/Eyescream_Interface";
import { _HighRoller_abi } from "../interfaces/HighRoller_Interface";
import { useState, useEffect } from 'react';
import {
  HighRollersAddress,
  _HighRollers_abi,
} from "../interfaces/HighRollers_Interface";
import { Link } from 'react-router-dom';
import fetchNFTs from '../utils/HandleNFTs';
import Messages from "../Components/Messages";
import NFTSelector from "../Components/NFTSelector";
import PlayerList from "../Components/PlayersList";
import HighRollerDeposits from "../Components/HighRollerDeposits";
//import Footer from "../Components/Footer";
import BaseContainer from "./BaseContainers/BaseContainer";
import "../styles/HighRollers/HighRollers.scss";
import {
    Button,
    Box,
    Heading
} from "@chakra-ui/react";

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

        <BaseContainer>
            <Box textAlign='center'>
                <Messages/>
                <Heading color="#DE89BE" textShadow="#FDCFF3 3px 3px;" fontSize="40px">HIGH ROLLERS</Heading>
                {currentGame.contractAddress ?
                    <Box>
                        <Heading color="#FDCFF3" fontSize="20px">Current Game: {currentGame.contractAddress}</Heading>
                        {currentGame.winner !== "0x0000000000000000000000000000000000000000" ?
                            <Heading color="#FDCFF3" fontSize="20px">Winner: {currentGame.winner}</Heading>
                        :    
                            <Box> 
                                <Heading color="#FDCFF3" fontSize="20px">Game in Progress</Heading>
                                <h6 className="CoinFlip-Waiting-h6"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></h6>
                            </Box>
                        }
                        <h3 className="HighRollers-Current-Game-TimeLeft-h3"> {minutesLeft} Minutes {secondsLeft} Seconds </h3>
                    </Box>
                :
                    <Heading color="#FDCFF3" fontSize="20px" >No Game</Heading>
                }

                <Box className="HighRollers-GameInfo-Container">
                    <HighRollerDeposits tokens={gameTokens}/>
                </Box>

                <Box width="80%" marginLeft="30%">
                    <PlayerList players={players}/>
                </Box>
                <Button onClick={() => handleDeposit() }variant="contained" type="submit" style={{maxHeight: '55px'}}>
                    Deposit 
                </Button>
                <NFTSelector tokens={userTokens}  />
                <PastHighRollerGames/>
            </Box>
        </BaseContainer>
    )
}

export default HighRollers;



const PastHighRollerGames = () => {

    const [pastGames, setPastGames]:any = useState([]);

    const getPastGames = async () => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const HighRollersContract = new ethers.Contract(HighRollersAddress, _HighRollers_abi, signer)
            let pastGames = await HighRollersContract.getPastGames();
            console.log("PAST GAMES", parseInt(pastGames))
            for ( let i=0; i<= parseInt(pastGames)-1; i++ ) {
                let tempGame = await HighRollersContract.getPastGameByIndex(i);
                setPastGames((pastGames: any) => [...pastGames, tempGame])
            }
        }
    }

    useEffect(() => { 
        getPastGames();
    }, [])

    return (
        <Box marginTop="5%">
            <Heading color="#FDCFF3" fontSize="30px">Past Games</Heading>
            {pastGames.length !== 0 ? 
                <Box>
                    {pastGames.map( (game: any) => {
                        return (
                            <Link to={`high-roller/${game['contractAddress']}`}>
                                <HighRollerGame winner={game.winner} tickets={parseInt(game.tickets)} contractAddress={game.contractAddress}/> 
                            </Link>
                        )
                    })}
                </Box>
            : 
                <Heading color="#FDCFF3" fontSize="30px">No Games</Heading>
            }
        </Box>
    )
}



type HighRollerGameProps = {
    winner: string
    tickets: number,
    contractAddress: string,
}

const HighRollerGame = (props:HighRollerGameProps) => {

    return (
        <Box
            background="#40434E" 
            py="1%%"
            mx="20%"
            my="2%"
            borderRadius="20px"
        >
            <Heading color="#FDCFF3" fontSize="30px">Winner: {props.winner}</Heading>
            <Heading color="#FDCFF3" fontSize="30px">Tickets: {props.tickets}</Heading>
            <Heading color="#FDCFF3" fontSize="20px">Contract: {props.contractAddress}</Heading>
        </Box>
    )
}
