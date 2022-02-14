import { useState, useEffect } from 'react';
import HighRollerGame from '../Components/HighRollerGame';
import { ethers } from 'ethers';
import { HighRollersAddress, _HighRollers_abi } from '../interfaces/HighRollers_Interface';
import { Link } from 'react-router-dom';
import { Box, Heading } from "@chakra-ui/react";

declare let window: any;
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

export default PastHighRollerGames