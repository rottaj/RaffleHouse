import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { _CoinFlip_abi } from "../interfaces/CoinFlip_Interface";
import Messages from "../Components/Messages";
import Footer from "../Components/Footer";
import { FaEthereum } from "react-icons/fa";
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
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"
import "../styles/CoinFlips/CoinFlipViewer.scss";
import BaseContainer from "./BaseContainers/BaseContainer";
import { isBoxedPrimitive } from "util/types";
import { ConstructorFragment } from "ethers/lib/utils";
import { MetaMaskUserContext } from "../utils/contexts";

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
    if (gameInfo.winner === "0x0000000000000000000000000000000000000000" && gameInfo.joineeAddress !== "0x0000000000000000000000000000000000000000") {
      setInterval(() => {
      let coin = document.getElementById("coin");
      coin.className="flipHead"
      coin.className="flipTail"
      }, 500)
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
        value: ethers.utils.parseEther(String((parseInt(gameInfo.buyInPrice) * 0.1 ** 18).toFixed(2))).toString(),
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
        {gameInfo.joineeAddress != undefined &&
          <DepositModal coinFlipContractAddress={coinFlipContractAddress} gameInfo={gameInfo}/>
        }
        <Box>
          <Box paddingTop="2%">
            <Heading color="white" textShadow="green 3px 3px" fontSize="40px">COIN FLIP</Heading>
            <Heading color="white" fontSize="20px">{coinFlipContractAddress}</Heading>
            {gameInfo.winner != "0x0000000000000000000000000000000000000000" ?
              <Heading color="white" fontSize="20px">Winner: {gameInfo.winner}</Heading>           
            :
              <Heading color="white" fontSize="20px">Winner not selected.</Heading>           
            }
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
                  
                  <Heading color="white" textShadow="green 3px 3px" fontSize="40px">VS</Heading>
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
  const {user} = useContext(MetaMaskUserContext)
  const handleSubmit = async (contractAddress: any) => {
    if (window.ethereum) {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        _CoinFlip_abi,
        signer
      );
      let depositTxn = await contract.deposit({
        value: ethers.utils.parseEther(String((parseInt(props.gameInfo.buyInPrice) * 0.1 ** 18).toFixed(2))).toString(),
      });
      console.log(depositTxn);
    }
  };


  console.log("FOOBERA", props.gameInfo)
  console.log(user.toUpperCase(), props.gameInfo.creatorAddress)
  const {isOpen, onOpen, onClose} = useDisclosure(
    {defaultIsOpen: props.gameInfo.joineeAddress == "0x0000000000000000000000000000000000000000" && String(user.toUpperCase()) !== String(props.gameInfo.creatorAddress)})
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
        bgColor="#1c191c"
        color="white"
        background="#141414"
        mx="25%"
        textAlign="center"
        alignContent="center"
      >
        <ModalBody
        >

          <Heading>Join Game</Heading>
          <Box paddingLeft="13%">
            <Heading fontSize="60px"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></Heading>
          </Box>
            <Flex
              py="5%"
              px="22%"
              pl="150px"
              margin="0" 
              height="100%" 
              justifyContent="center" 
            >
              <Heading>{(parseInt(props.gameInfo.buyInPrice) * 0.1 ** 18).toFixed(2)} </Heading>
              <Heading pt="1%" pr="25%"><FaEthereum/></Heading>
            </Flex>
            <Box>
              <Button 
                onClick={() => handleSubmit(props.coinFlipContractAddress)}
                mt="10px"
                color="black" 
                type="submit"
              >
                Buy In
              </Button> 
            </Box>

          <Button marginTop="10%" variant='ghost' onClick={onClose}>
            Watch Game
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}