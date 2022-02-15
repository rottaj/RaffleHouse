import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { _CoinFlip_abi } from "../interfaces/CoinFlip_Interface";
import Messages from "../Components/Messages";
import Footer from "../Components/Footer";

import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useDisclosure
} from "@chakra-ui/react"
import "../styles/CoinFlips/CoinFlipViewer.scss";
import BaseContainer from "./BaseContainers/BaseContainer";
import { isBoxedPrimitive } from "util/types";

declare let window: any;
const CoinFlipViewer = () => {
  const [coinFlipContractAddress, setCoinFlipContractAddress] = useState("");
  const [gameInfo, setGameInfo]: any = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const mountCoinFlipGame = async () => {
      const contractAddress = window.location.pathname.split("/").at(-1);
      setCoinFlipContractAddress(contractAddress);
      var accounts = await window.ethereum.send("eth_requestAccounts");
      const account = accounts.result[0];
      setAccount(account);
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
        contractAddress,
        _CoinFlip_abi,
        signer
      );
      console.log(contract);
      const gameData = await contract.getGameInfo();
      setGameInfo(gameData);
    };

    if (window.ethereum) {
      mountCoinFlipGame();
    }
  }, []);

  const handleSubmit = async (e: any, contractAddress: any) => {
    e.preventDefault();
    if (window.ethereum) {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        _CoinFlip_abi,
        signer
      );
      let depositTxn = await contract.deposit({
        value: ethers.utils.parseEther(e.target[0].value).toString(),
      });
      console.log(depositTxn);
    }
  };


  const handleCoinAnimation = () => {
    let coin = document.getElementById("coin");
    var flipResult = Math.random();
    if (flipResult < 0.5) {
      coin.className = "flipHead";
    } else {
      coin.className = "flipTail";
    }
  }


  return (
    <BaseContainer>
      <Box textAlign="center" alignItems="center">
        <Messages />

        <DepositModal coinFlipContractAddress={coinFlipContractAddress} gameInfo={gameInfo}/>
        <Box>
          <Box paddingTop="2%">
            <Heading color="rgb(255, 242, 145)" textShadow="rgb(203, 176, 204) 3px 3px" fontSize="40px">COIN FLIP</Heading>
          </Box>
          {gameInfo ? (
            <Box>
              <Flex justifyContent="center" marginTop="10%">
                <Box>
                  <div id="coinStatic" >
                    <div className="side static_heads"></div>
                  </div>
                  <Box 
                    py="1%"
                    px="1%"
                    my="1%" 
                    mx="5%"
                    color="white"
                    border="1px solid black"
                    background="#40434E"
                    borderRadius="md"
                  >
                    <Heading fontSize="sl">Creator:</Heading>
                    <Heading fontSize="sl">{gameInfo.creatorAddress}</Heading>
                  </Box>
                </Box>
                <Box paddingTop="5.5%">
                  
                  <Heading color="rgb(255, 242, 145)" textShadow="rgb(203, 176, 204) 3px 3px" fontSize="40px">VS</Heading>
                </Box>
                
                <Box>
                <div id="coinStatic" >
                  <div className="side static_tails"></div>
                </div>
                {/*}
                {gameInfo.joineeAddress !==
                "0x0000000000000000000000000000000000000000" ? ( */}

                    <Box 
                      px="1%"
                      py="1%"
                      my="1%"
                      mx="5%"
                      color="white"
                      border="1px solid black"
                      background="#40434E"
                      borderRadius="md"
                    >
                      <Heading fontSize="sl">Joinee:</Heading>
                      <Heading fontSize="sl">{gameInfo.joineeAddress}</Heading>
                    </Box>

                {/*
                ) : (

                    <Box>
                      <Box 
                        px="1%"
                        py="1%"
                        my="1%"
                        mx="5%"
                        color="white"
                        border="1px solid black"
                        background="#40434E"
                        borderRadius="md"
                      >
                        <Heading fontSize="sl">Joinee:</Heading>
                        <Heading fontSize="sl">Waiting for player</Heading>
                      </Box>
                    </Box>

                )}

                    */}
                </Box>
              </Flex>
              
              <div id="coin" onClick={handleCoinAnimation}>
                <div className="side head"></div>
                <div className="side tail"></div>
              </div>

            </Box>
          ) : (
            "GAME DOESN'T EXIST"
          )}
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default CoinFlipViewer;

type ModalProps = {
  coinFlipContractAddress: any
  gameInfo: any
}

const DepositModal = (props: ModalProps) => {

  const handleSubmit = (e, contractAddress) => {
    console.log("MODAL SUBMIT", contractAddress, e.target[0].value)
  }

  const {isOpen, onOpen, onClose} = useDisclosure({isOpen: true})
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isCentered
    >
      <ModalOverlay
        textAlign="center"
      />
      <ModalContent
        mx="25%"
        textAlign="center"
      >
        <ModalBody
        >
          <Heading>Waiting for player</Heading>
          <Box paddingLeft="13%">
            <Heading fontSize="60px"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></Heading>
          </Box>
          <form
            onSubmit={(e) => handleSubmit(e, props.coinFlipContractAddress)}
          >

            <Button type="submit">Buy In</Button> 
          </form>
          <Button marginTop="10%" variant='ghost' onClick={onClose}>
            Watch Game
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}