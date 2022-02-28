import React, { useEffect, useState } from "react";
import { _abi } from "../interfaces/Eyescream_Interface";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { RafflesAddress, _abi_raffles } from "../interfaces/Raffles_Interface";
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
import Footer from "../Components/Footer";
import BaseContainer from "./BaseContainers/BaseContainer";
import { getMetaDataSingle } from "../utils/HandleNFTs";
import {
  Grid, 
  GridItem,
  Box,
  Image,
  Flex,
  Heading,
  Button
} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons"
import { FaEthereum, FaWpbeginner } from "react-icons/fa"

declare let window: any;
const Raffles = () => {
  const [currentRaffles, setCurrentRaffles]: any = useState([]);
  const [pastRaffles, setPastRaffles]: any = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    document.title = "Raffles - Raffle House";
    const getAccount = async () => {
      var accounts = await window.ethereum.send("eth_requestAccounts");
      const account = accounts.result[0];
      setAccount(account);
    };
    if (window.ethereum) {
      getAccount();
      getRaffles();
    }
  }, []);

  const getRaffles = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const rafflesContract = await new ethers.Contract(
        RafflesAddress,
        _abi_raffles,
        signer
      );
      let rafflesLength = await rafflesContract.getRaffles();
      for (let i = 0; i <= rafflesLength - 1; i++) {
        let raffle = await rafflesContract.getRaffleByIndex(i);
        const raffleInstance = await new ethers.Contract(
          raffle.contractAddress,
          _Raffle_abi,
          signer
        );

        const gameInfo = await raffleInstance.getGameInfo();
        var tempRaffle: any = {
          contractAddress: raffle.contractAddress,
          creatorAddress: gameInfo.creatorAddress,
          buyInPrice: parseInt(gameInfo.buyInPrice, 16),
          winner: gameInfo.winner,
          collectionAddress: gameInfo.collectionAddress,
          collectionName: gameInfo.collectionName,
          tokenID: parseInt(gameInfo.tokenID, 16),
        };

        if (gameInfo.winner === "0x0000000000000000000000000000000000000000") {
          // Will update when refactor Raffles contract
          setCurrentRaffles((currentRaffles: any) => [
            ...currentRaffles,
            tempRaffle,
          ]);
        } else {
          setPastRaffles((pastRaffles: any) => [...pastRaffles, tempRaffle]);
        }
      }
    }
  };

  return (
    <BaseContainer>
      <Box className="Raffles-container-main">
        <Box float="right">
          <Button bgColor="green" color="white">
              Create Game
          </Button>
        </Box>
        <Box alignItems="center" px="20%" fontFamily="Courier New, Monospace">
            <Flex>
              <Heading
                color="white"
                fontSize="40px"
              >
                Latest&nbsp;
              </Heading>
              <Heading
                color="green"
                fontSize="40px"
              >
                Raffles
              </Heading>
          </Flex>
        </Box>
        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={2} 
          width="75%" 
          mx="15%"
        >
          {currentRaffles.map((raffle: any) => {
            return (
              <Link to={`raffle/${raffle["contractAddress"]}`}>
                <GridItem >
                  <Raffle token={raffle}/>
                </GridItem>
              </Link>
            );
          })}
        </Grid>
        <Box></Box>
          <Box px="20%">
            <Flex>
                <Heading
                  color="white"
                  fontSize="40px"
                >
                  Recent&nbsp;
                </Heading>
                <Heading
                  color="green"
                  fontSize="40px"
                >
                  Wins
                </Heading>
            </Flex>
          </Box>
        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={2} 
          width="75%" 
          mx="15%"
        >
          {pastRaffles.map((raffle: any) => {
            return (
              <Link to={`raffle/${raffle["contractAddress"]}`}>
                <GridItem >
                  <Raffle token={raffle} />
                </GridItem>
              </Link>
            );
          })}
        </Grid>
        <Box alignItems="center" px="20%" fontFamily="Courier New, Monospace">
            <Flex>
              <Heading
                color="white"
                fontSize="40px"
              >
                Trending&nbsp;
              </Heading>
              <Heading
                color="green"
                fontSize="40px"
              >
                Raffles
              </Heading>
          </Flex>
        </Box>
        {/* <Footer /> */}
      </Box>
    </BaseContainer>
  );
};
export default Raffles;

interface Props {
  token: any;
}

const Raffle = (props: Props) => {

  const [imageSrc, setImageSrc] = useState('')
  const [isMouseOver, setIsMouseOver] = useState(false)

  useEffect(() => {
    getMetaDataSingle(props.token).then((data) => {
      setImageSrc(data.image);
    })

  }, [])

  return (
    <Box 
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      height="100%"
      width="100%"
      margin="3%" 
      textAlign="center"
    >
      {isMouseOver == false ? 
      <Image 
        height="200px"
        width="200px"
        borderRadius="10px"
        src={imageSrc} // ADD TOKEN IMAGE BITACH
      ></Image>
      :
      <Box 
        alignItems="center"
        color="white"
        minHeight="200px"
        minWidth="200px"
      >
        <Image 
          position="absolute"
          height="200px"
          width="200px"
          borderRadius="30px"
          opacity="30%"
          src={imageSrc} // ADD TOKEN IMAGE BITACH
        ></Image>

        <Flex pl="16px">
          <Heading 
            fontSize="20px"
            pt="10px"
            opacity="100%"
          >
            {props.token.collectionName}
          </Heading>

            <Heading opacity="100%" pt="20px" pl="5px" fontSize="33px">#{props.token.tokenID}</Heading>

          <CheckIcon color="#00acee" marginLeft="20px"></CheckIcon>
        </Flex>
          {props.token.winner != "0x0000000000000000000000000000000000000000" ?
            <Heading opacity="100%"pt="30px" fontSize="20px" color="green">{props.token.winner.split(0, 20)}</Heading>
          :
            <Heading opacity="100%" pt="30px" fontSize="20px" color="green">Join Raffle!</Heading>
          }
        <Flex pl="30%" pt="18%" opacity="100%">
          <Heading fontSize="40px">{props.token.buyInPrice}</Heading>
          <FaEthereum size={50}/>
        </Flex>
      </Box>
      }

    </Box>
  );
};
