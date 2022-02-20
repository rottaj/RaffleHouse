import { useEffect } from "react";
import { 
  Flex, 
  Stack, 
  HStack, 
  VStack, 
  Heading, 
  Box, 
  Text,
  Image
} from "@chakra-ui/react";
import BaseContainer from "./BaseContainers/BaseContainer";
import "../styles/Home/Home.scss";
import ape from "../images/my_fucking_mayc.png";
import dood from "../images/dood.png";
import cat from "../images/cc.png";
import { FaEthereum } from "react-icons/fa";

const Home = () => {
  useEffect(() => {
    document.title = "Raffle House";
  }, []);

  return (
    <BaseContainer>

      <VStack>

        <Flex w="100%" h="100%" justify="center" pt="220px" background-image="radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )">
          <div className="sign">
            <span className="fast-flicker">Raffle House</span>
          </div>
        </Flex>
        <Flex justify="center">
          <Heading size="xl" color="white">The worlds first and #1 in on-chain NFT gambling</Heading>
        </Flex>

          <Flex h="75px">
          </Flex>
          {/* ^temp bc Stack spacing={100} not working rn */}

        <HStack spacing='24px' justify="center" color="white">

          <VStack>
            <Heading size="4xl">
              Total Winnings
            </Heading>
            <HStack >
              <Image borderRadius='20px' boxSize='150px' src={ape} alt="error"/>
              <Image borderRadius='20px' boxSize='150px' src={dood} alt="error"/>
              <Image borderRadius='20px' boxSize='150px' src={cat} alt="error"/>
            </HStack>

            <Text fontSize='3xl'>
              {/* 69,421+<span><FaEthereum size={0}/></span>won */}
              69,421+*ETH ICON*won
            </Text>
          </VStack>

          <VStack>
            <Heading size="4xl">
              Total Games
            </Heading>
            <Text fontSize='3xl'>
              1,421,337+ Games and counting
            </Text>
          </VStack>

          <VStack>
            <Heading size="4xl">
              Total Players
            </Heading>
            <Text fontSize='3xl'>
              149,000+ Players and counting
            </Text>
          </VStack>

        </HStack>
        
      </VStack>
    </BaseContainer>
  );
};

export default Home;

