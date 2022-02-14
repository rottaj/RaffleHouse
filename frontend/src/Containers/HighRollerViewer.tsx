import { useState, useEffect } from 'react';
import BaseContainer from '../Components/BaseContainers/BaseContainer';
import HighRollerDeposits from '../Components/HighRollerDeposits';
import PlayersList from '../Components/PlayersList';
import Messages from "../Components/Messages";
import fetchNFTs from '../utils/HandleNFTs';
import { _abi } from '../interfaces/Eyescream_Interface';
import { _HighRoller_abi } from '../interfaces/HighRoller_Interface';
import { ethers } from 'ethers';
import {
    Box
} from "@chakra-ui/react"


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
        <BaseContainer>
            <Box>
                <Messages/>
                <Box marginTop="10%" height="100%">
                    <Box >
                        <HighRollerDeposits tokens={gameTokens}/>
                    </Box>

                    <Box className="HighRollers-PlayerList-Container">
                        <PlayersList players={players}/>
                    </Box>
                </Box>

            </Box>
        </BaseContainer>
    )
}

export default HighRollerViewer;