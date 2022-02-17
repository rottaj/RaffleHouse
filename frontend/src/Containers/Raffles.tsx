import React, { useEffect, useState } from "react";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { RafflesAddress, _abi_raffles } from "../interfaces/Raffles_Interface";
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
import Footer from "../Components/Footer";
import BaseContainer from "./BaseContainers/BaseContainer";
import {
  Grid, 
  GridItem,
  Box,
  Image,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons"
import { FaEthereum } from "react-icons/fa"

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
          tokenImage: raffle.tokenImage,
          creatorAddress: gameInfo.creatorAddress,
          buyInPrice: parseInt(gameInfo.buyInPrice, 16),
          winner: gameInfo.winner,
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
        <Box alignItems="center" px="20%" fontFamily="Courier New, Monospace">
            <Flex>
              <Heading
                color="white"
                fontSize="40px"
              >
                Current&nbsp;
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
                  Past&nbsp;
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
  return (
    <Box
      height="100%"
      width="100%"
      margin="3%" 
      textAlign="center"
    >
      <Image 
        height="200px"
        width="200px"
        borderRadius="30px"
        src={props.token.tokenImage}
      ></Image>
      <Box 
        alignItems="center"
        color="white"
      >
        <Flex pl="16px">
          <Heading 
            fontSize="20px"
          >
            {props.token.collectionName}
          </Heading>
          <h3> #</h3>
          <h3>{props.token.tokenID}</h3>
          <CheckIcon color="#00acee" marginLeft="20px"></CheckIcon>
        </Flex>
        <Flex pl="19px">
          <Heading fontSize="md">BUY IN: {props.token.buyInPrice} eth</Heading>
          <FaEthereum/>
        </Flex>
      </Box>
    </Box>
  );
};
