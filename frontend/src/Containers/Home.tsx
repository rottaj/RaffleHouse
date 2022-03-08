import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import BaseContainer from "./BaseContainers/BaseContainer";
import "../styles/Home/Home.scss";
import ape from "../images/my_fucking_mayc.png";
import dood from "../images/dood.png";
import cat from "../images/cc.png";
import { FaEthereum } from "react-icons/fa";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  increment,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const Home = () => {

  const [totalGames, setTotalGames] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);

  const coinflipsCollectionRef = collection(db, "coinflips");
  const playersCollectionRef = collection(db, "users"); 
  const siteDataCollectionRef = doc(db, "siteData", "TotalWinnings");

  useEffect(() => {
    document.title = "Raffle House";
    const mountSiteData = async () => {
      const gameData = await getDocs(coinflipsCollectionRef);
      const playerData = await getDocs(playersCollectionRef);
      const siteDataDoc = await getDoc(siteDataCollectionRef);
      setTotalGames(gameData.docs.length) // update w/ Raffles + HighRollers
      setTotalPlayers(playerData.docs.length) // update w/ Raffles + HighRollers
      setTotalWinnings(siteDataDoc.data().TotalEth)
    }

    mountSiteData();
  }, []);

  return (
    <BaseContainer>
      <VStack>
        <Box
          px="5%"
          borderRadius="20px"
          border="4px solid green"
          //backgroundImage="radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )"
          //backgroundImage="linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)"
          backgroundImage="linear-gradient(to right top, #000000, #0c0403, #140802, #170e00, #161400, #1d2204, #1f320a, #174313, #1f6417, #288719, #33ac17, #41d20c)"
          py="40px"
        >
          <Flex
            w="100%"
            h="100%"
            justify="center"
            py="20px"
          >
            <div className="sign">
              <span className="fast-flicker">Raffle House</span>
            </div>
          </Flex>
          <Flex justify="center">
            <Heading size="xl" color="white" fontFamily="Monaco">
              The worlds first and #1 in on-chain NFT gambling
            </Heading>
          </Flex>

        </Box>
        <Stack
          spacing="24px"
          direction={["column", null, null, null, "row"]}
          justify="center"
          color="white"
          pt="75px"
          px="22px"
          fontFamily="Monaco"
        >
          <VStack >
            <Heading size="2xl">Total Winnings</Heading>
            <HStack>
              <Image
                borderRadius="20px"
                boxSize="100px"
                src={ape}
                alt="error"
              />
              <Image
                borderRadius="20px"
                boxSize="100px"
                src={dood}
                alt="error"
              />
              <Image
                borderRadius="20px"
                boxSize="100px"
                src={cat}
                alt="error"
              />
            </HStack>

            <Heading fontSize="15px">Recent NFT Wins</Heading>
            <Flex>
              <Text fontSize="20px">
                  {parseFloat(String(totalWinnings)).toFixed(2)} 
              </Text>
              <Text pt="1%">
                  <FaEthereum size={25}/> 
              </Text>
              <Text pt="3%" pl="2%" fontSize="15px">
                won
              </Text>
            </Flex>
          </VStack>

          <VStack>
            <Heading size="2xl">Total Games</Heading>
            <Box width="75%">
              <Text fontSize="3xl">{totalGames}+ Games and counting</Text>
            </Box>
          </VStack>

          <VStack>
            <Heading size="2xl">Total Players</Heading>
            <Box width="75%">
              <Text fontSize="3xl">{totalPlayers}+ Players and counting</Text>
            </Box>
          </VStack>
        </Stack>
      </VStack>
    </BaseContainer>
  );
};

export default Home;
