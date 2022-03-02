import { useState, useEffect, useContext } from 'react';
import BaseContainer from "./BaseContainers/BaseContainer";
import CoinFlip from "../Components/CoinFlip";
import {
    Box,
    HStack,
    Grid,
    GridItem,
    Heading
} from "@chakra-ui/react";
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  increment,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { MetaMaskUserContext } from "../utils/contexts";

const MyHistory = () => {
    const [coinFlips, setCoinFlips]: any = useState([]);
    const coinflipsCollectionRef = collection(db, "coinflips");
    const { user } = useContext(MetaMaskUserContext);
    
    useEffect(() => {
        const getGameData = async () => {
            console.log("USER", user)
            const coinFlipsQuery = query(coinflipsCollectionRef, where("creatorAddress", "==", user), where("joineeAddress", "==", user));
            console.log("Query", coinFlipsQuery)
            const coinFlipsData = await getDocs(coinFlipsQuery);
            console.log("COINDATAFO", coinFlipsData)
            coinFlipsData.docs.map((doc) => {
                console.log("DATA", doc)
                setCoinFlips((coinFlips) => [...coinFlips, doc.data()])
            })
        }

        getGameData();
    }, [])

    return (
        <BaseContainer>
            <Box textAlign="center" color="white">
                <Heading> Game History </Heading>
                <HStack>
                    <Heading>Coin Flips</Heading>
                    <Heading>NFTS</Heading>
                </HStack>
                <HStack>
                    <Grid 
                        w="10%"
                        height="10%"
                        color="white"
                        templateColumns='repeat(2, 1fr)' 
                        gap={2}
                    >
                        {console.log("COIN FLIPS", coinFlips)}
                        {coinFlips.map((coinFlip: any) => {
                            console.log("COINFLIP", coinFlip)
                            return (<GridItem><CoinFlip coinFlip={coinFlip}></CoinFlip></GridItem>)
                        })}
                    </Grid>
                    <Box>
                    </Box>
                    <Box>
                    </Box>
                </HStack>
            </Box>
        </BaseContainer>
    )
}


export default MyHistory