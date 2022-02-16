import { useState, useEffect, useContext } from "react";
import Messages from "../Components/Messages";
import { Redirect, Link } from "react-router-dom";
import { ethers } from "ethers";
import {
  CoinFlipAddress,
  _CoinFlips_abi,
} from "../interfaces/CoinFlips_Interface";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../interfaces/CoinFlip_Interface";
import Footer from "../Components/Footer";
import BaseContainer from "./BaseContainers/BaseContainer";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
  Spinner
} from '@chakra-ui/react'
import { FaEthereum } from 'react-icons/fa';
import  { createCoinFlipGame, sendTransactionToCoinFlips, addCoinFlipToGames } from "../utils/CreateCoinFlipGame";
import { MetaMaskUserContext } from "../utils/contexts";
//import { MetaMaskDataContext} from "../utils/contexts/UserDataContext";

declare let window: any;
const CoinFlips = () => {
  const [currentCoinFlips, setCurrentCoinFlips]: any = useState([]);
  const [pastCoinFlips, setPastCoinFlips]: any = useState([]);

  useEffect(() => {
    document.title = "Coin Flips - Raffle House";
    const mountCoinFlipData = async () => {
      getCoinFlips();
    };
    if (window.ethereum) {
      mountCoinFlipData();
    }
  }, []);

  const getCoinFlips = async () => {
    const tempPastCoinFlips = [];
    const tempCurrentCoinFlips = [];
    if (window.ethereum) {
      //const signer = provider.getSigner();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const coinFlipContract = new ethers.Contract(
        CoinFlipAddress,
        _CoinFlips_abi,
        provider
      );
      let coinFlipLength = await coinFlipContract.getCoinFlips();
      for (let i = 0; i <= coinFlipLength - 1; i++) {
        var tempCoinFlip: any = {};
        var coinFlip = await coinFlipContract.getCoinFlipByIndex(i);
        const coinFlipInstance = await new ethers.Contract(
          coinFlip.contractAddress,
          _CoinFlip_abi,
          provider
        );
        const gameInfo = await coinFlipInstance.getGameInfo();
        tempCoinFlip["contractAddress"] = coinFlip["contractAddress"];
        tempCoinFlip["buyInPrice"] = (
          parseInt(gameInfo["buyInPrice"]) *
          0.1 ** 18
        ).toFixed(2);
        tempCoinFlip["creatorAddress"] = gameInfo["creatorAddress"];
        tempCoinFlip["joineeAddress"] = gameInfo["joineeAddress"];
        tempCoinFlip["winner"] = gameInfo["winner"];
        if (gameInfo.winner !== "0x0000000000000000000000000000000000000000") {
          tempPastCoinFlips.push(tempCoinFlip);
        } else {
          tempCurrentCoinFlips.push(tempCoinFlip);
        }
      }
      setPastCoinFlips(tempPastCoinFlips);
      setCurrentCoinFlips(tempCurrentCoinFlips);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <BaseContainer>
      <Messages />
      <CreateGameModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box pb="100px">
        <Box py="5%" px="22%" margin="0" height="100%" justifyContent="center">
          <Box alignItems="center" borderBottom="4px dotted green">
            <Flex>
              <Heading
                marginBottom="2%"
                color="white"
                fontSize="30px"
                paddingLeft="3%"
              >
                ACTIVE
              </Heading>
              <Heading
                marginBottom="2%"
                color="green"
                fontSize="30px"
                paddingLeft="6px"
              >
                GAMES
              </Heading>
              <Box alignSelf="right" marginLeft="auto">
                <Button bgColor="green" color="white" onClick={onOpen}>
                  Create Game
                </Button>
              </Box>
            </Flex>
          </Box>
          <Flex
            overflow="auto"
            border="1px solid black"
            color="white"
            my="1%"
            py="1%"
          >
            <Flex flexGrow="1" paddingLeft="12%">
              <Heading fontSize="md">Player</Heading>
            </Flex>
            <Flex flexGrow="1" paddingLeft="5%">
              <Heading fontSize="md">Status</Heading>
            </Flex>
            <Heading fontSize="md" paddingRight="3%">
              {" "}
              Buy In
            </Heading>
          </Flex>

          {currentCoinFlips.map((coinFlip: any) => {
            return (
              <Link to={`coin-flip/${coinFlip["contractAddress"]}`}>
                <CoinFlip coinFlip={coinFlip}></CoinFlip>
              </Link>
            );
          })}
        </Box>
        <Box py="5%" px="22%" margin="0" height="100%" justifyContent="center">
          <Box alignItems="center" borderBottom="4px dotted green">
            <Flex>
              <Heading
                //border="1px solid blue"
                marginBottom="2%"
                color="white"
                fontSize="30px"
                //py="2%"
                paddingLeft="3%"
              >
                PAST
              </Heading>
              <Heading
                //border="1px solid blue"
                marginBottom="2%"
                color="green"
                fontSize="30px"
                //py="2%"
                paddingLeft="6px"
              >
                GAMES
              </Heading>
            </Flex>
          </Box>
          <Flex
            overflow="auto"
            border="1px solid black"
            color="white"
            my="1%"
            py="1%"
          >
            <Flex flexGrow="1" paddingLeft="12%">
              <Heading fontSize="md">Creator</Heading>
            </Flex>
            <Flex flexGrow="1" paddingLeft="5%">
              <Heading fontSize="md">Winner</Heading>
            </Flex>
            <Heading fontSize="md" paddingRight="3%">
              {" "}
              Buy In
            </Heading>
          </Flex>
          {pastCoinFlips.map((coinFlip: any) => {
            return (
              <Link to={`coin-flip/${coinFlip["contractAddress"]}`}>
                <CoinFlip coinFlip={coinFlip}></CoinFlip>
              </Link>
            );
          })}
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default CoinFlips;
interface Props {
  coinFlip: any;
}

const CoinFlip = (props: Props) => {
  return (
    <Flex
      overflow="auto"
      border="1px solid black"
      background="#16120F"
      color="white"
      my="1%"
      py="1%"
    >
      <Flex flexGrow="1" paddingLeft="1%">
        <Heading fontSize="md">
          {props.coinFlip.creatorAddress.slice(0, 23) + "..."}
        </Heading>
      </Flex>
      {props.coinFlip.winner !==
      "0x0000000000000000000000000000000000000000" ? (
        <Flex flexGrow="1">
          <Heading fontSize="md">
            {props.coinFlip.winner.slice(0, 23) + "..."}
          </Heading>
        </Flex>
      ) : (
        <Flex flexGrow="1" paddingRight="4%">
          {props.coinFlip.joineeAddress !==
          "0x0000000000000000000000000000000000000000" ? (
            <Heading fontSize="md">In Progress</Heading>
          ) : (
            <Heading color="green" fontSize="md" paddingRight="25px">
              Joinable
            </Heading>
          )}
        </Flex>
      )}
      <Flex>
        <Heading fontSize="md" paddingRight="1%">
          {props.coinFlip.buyInPrice}{" "}
        </Heading>
        <FaEthereum />
      </Flex>
    </Flex>
  );
};

type ModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const CreateGameModal = (props: ModalProps) => {

  const {user: account} = useContext(MetaMaskUserContext);
  const [balance, setBalance]:any = useState(0)
  const [sliderValue, setSliderValue]:any = useState(0.1)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [txnNumber, setTxnNumber] = useState(0)
  const [isCreated, setCreated] = useState(false)
  const [contract, setContract]:any = useState()

  const handleSubmit = () => {
    console.log(parseFloat(sliderValue))
    setLoading(true)

    setTxnNumber(1)
    createCoinFlipGame(parseFloat(sliderValue)).then((contract) => {
      setContract(contract)
      setTxnNumber(2)
      sendTransactionToCoinFlips(contract, parseFloat(sliderValue)).then(() => {
        setTxnNumber(3)
        addCoinFlipToGames(contract, parseFloat(sliderValue)).then(() => {
          //setLoading(false);
          setCreated(true) 
        });
      });
    });
  }

  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance((parseInt(String(balance)) * 0.1 ** 18).toFixed(2));
    };
    if (window.ethereum) {
      getBalance();
    }
  }, []);

  return (
    <Box>
      {isCreated &&
        <Redirect to={`/coin-flip/${contract.address}`}/>
      }
    <Modal
      isOpen={props.isOpen} 
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay textAlign="center" ></ModalOverlay>
      <ModalContent
        bgColor="#1c191c"
        color="white"
        pt="2%"
        textAlign="center"
        alignContent="center"
      >
          {isLoading != true ?
          <ModalBody>
          <Heading pb="30%">Host A Coin Flip!</Heading>
          <Flex
            margin="0"
            height="100%"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Text width="auto">Your Balance: {balance}</Text>
            <FaEthereum />
          </Flex>

          <Slider
            id="slider"
            defaultValue={5}
            min={0}
            max={100}
            colorScheme="green"
            onChange={(v) => setSliderValue((balance * (v * 0.01)).toFixed(2))}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
              <Flex>
                <Text>{0}</Text>
                <Box pt="3px">
                  <FaEthereum />
                </Box>
              </Flex>
            </SliderMark>
            <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
              <Flex>
                <Text>{(balance * 0.25).toFixed(2)}</Text>
                <Box pt="3px">
                  <FaEthereum />
                </Box>
              </Flex>
            </SliderMark>
            <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
              <Flex>
                <Text>{(balance * 0.5).toFixed(2)}</Text>
                <Box pt="3px">
                  <FaEthereum />
                </Box>
              </Flex>
            </SliderMark>
            <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
              <Flex>
                <Text>{(balance * 0.75).toFixed(2)}</Text>
                <Box pt="3px">
                  <FaEthereum />
                </Box>
              </Flex>
            </SliderMark>
            <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
              <Flex>
                <Text>{balance}</Text>
                <Box pt="3px">
                  <FaEthereum />
                </Box>
              </Flex>
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${sliderValue} eth`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <Box pt="30%" pb="10%">
            <Button
              bgColor="green"
              color="white"
              onClick={() => handleSubmit()}
            >
              Create Game!
            </Button>
          </Box>
        </ModalBody>

        :
            // LOADING SCREEN
          <ModalBody>
            <Heading>Waiting for Metamask Transaction </Heading>
            {txnNumber == 1 && 
              <Box>
                <Text>Creating Game Contract</Text>  
                <Spinner size='lg' />
              </Box>

            }
            {txnNumber == 2 &&
              <Box>
                <Text>Sending Ethereum to Game</Text>
                <Spinner size='lg' />
              </Box>
            }
            {txnNumber == 3 && 
              <Box>
                <Text>Adding Game to Coin Flips</Text>
                <Spinner size='lg' />
              </Box>
            }

          </ModalBody>
        }
      </ModalContent>
    </Modal>
    </Box>
  )
}
