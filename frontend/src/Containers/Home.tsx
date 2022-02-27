import { useEffect, useState } from "react";
import {
  Flex,
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

  const coinflipsCollectionRef = collection(db, "coinflips");      
  const playersCollectionRef = collection(db, "users");      
  useEffect(() => {
    document.title = "Raffle House";
    const mountSiteData = async () => {
      const gameData = await getDocs(coinflipsCollectionRef);
      const playerData = await getDocs(playersCollectionRef);

      setTotalGames(gameData.docs.length) // update w/ Raffles + HighRollers
      setTotalPlayers(playerData.docs.length) // update w/ Raffles + HighRollers
    }

    mountSiteData();
  }, []);

  return (
    <BaseContainer>
      <VStack>
        <Flex
          w="100%"
          h="100%"
          justify="center"
          pt="220px"
          background-image="radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )"
        >
          <div className="sign">
            <span className="fast-flicker">Raffle House</span>
          </div>
        </Flex>
        <Flex justify="center">
          <Heading size="xl" color="white">
            The worlds first and #1 in on-chain NFT gambling
          </Heading>
        </Flex>

        <Stack
          spacing="24px"
          direction={["column", null, null, null, "row"]}
          justify="center"
          color="white"
          pt="75px"
          px="22px"
        >
          <VStack>
            <Heading size="4xl">Total Winnings</Heading>
            <HStack>
              <Image
                borderRadius="20px"
                boxSize="150px"
                src={ape}
                alt="error"
              />
              <Image
                borderRadius="20px"
                boxSize="150px"
                src={dood}
                alt="error"
              />
              <Image
                borderRadius="20px"
                boxSize="150px"
                src={cat}
                alt="error"
              />
            </HStack>

            <Text fontSize="3xl">
              {/* 69,421+<span><FaEthereum size={0}/></span>won */}
              69,421+*ETH ICON*won
            </Text>
          </VStack>

          <VStack>
            <Heading size="4xl">Total Games</Heading>
            <Text fontSize="3xl">{totalGames} Games and counting</Text>
          </VStack>

          <VStack>
            <Heading size="4xl">Total Players</Heading>
            <Text fontSize="3xl">{totalPlayers} Players and counting</Text>
          </VStack>
        </Stack>
      </VStack>
    </BaseContainer>
  );
};

export default Home;
