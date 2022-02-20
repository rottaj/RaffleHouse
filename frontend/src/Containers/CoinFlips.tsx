import { useState, useEffect, useContext } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { ethers } from "ethers";
import CoinBull from "../images/coinBull.png";
import CoinBear from "../images/coinBear.png";
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
  Image,
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
  Spinner,
  Grid,
  GridItem

} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import {
  createCoinFlipGame,
  sendTransactionToCoinFlips,
  addCoinFlipToGames,
} from "../utils/CreateCoinFlipGame";
import { MetaMaskUserContext } from "../utils/contexts";
//import { MetaMaskDataContext} from "../utils/contexts/UserDataContext";

declare let window: any;
const CoinFlips = () => {
  const [currentCoinFlips, setCurrentCoinFlips]: any = useState([]);
  const [pastCoinFlips, setPastCoinFlips]: any = useState([]);

  useEffect(() => {
    document.title = "Coin Flips - Raffle House";
    if (window.ethereum) {
      getCoinFlips();
    }
  }, []);

  const getCoinFlips = async () => {
    // const tempPastCoinFlips = [];
    // const tempCurrentCoinFlips = [];
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
          setPastCoinFlips((pastCoinFlips: any) => [
            ...pastCoinFlips,
            tempCoinFlip,
          ]);
          // tempPastCoinFlips.push(tempCoinFlip);
        } else {
          setCurrentCoinFlips((currentCoinFlips: any) => [
            ...currentCoinFlips,
            tempCoinFlip,
          ]);
          // tempCurrentCoinFlips.push(tempCoinFlip);
        }
      }
      // setPastCoinFlips(tempPastCoinFlips);
      // setCurrentCoinFlips(tempCurrentCoinFlips);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <BaseContainer>
      <CreateGameModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box pb="100px" px="230px">
        <Box py="5%" margin="0" height="100%" justifyContent="center">
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
          <Grid 
            color="white"
            templateColumns='repeat(2, 1fr)' 
            gap={2}
          >
            {currentCoinFlips.map((coinFlip: any) => {
              return (<GridItem><CoinFlip coinFlip={coinFlip}></CoinFlip></GridItem>)
            })}
          </Grid>

        </Box>
        <Box py="5%" height="100%" justifyContent="center">
          <Box alignItems="center" borderBottom="4px dotted green">
            <Flex>
              <Heading
                marginBottom="2%"
                color="white"
                fontSize="30px"
                paddingLeft="3%"
              >
                PAST
              </Heading>
              <Heading
                marginBottom="2%"
                color="green"
                fontSize="30px"
                paddingLeft="6px"
              >
                GAMES
              </Heading>
            </Flex>
          </Box>
          <Grid 
            color="white"
            templateColumns='repeat(2, 1fr)' 
            gap={2}
          >
            {pastCoinFlips.map((coinFlip: any) => {
              return (<GridItem><CoinFlip coinFlip={coinFlip}></CoinFlip></GridItem>)
            })}
          </Grid>
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
  const history = useHistory();
  return (
    <Box 
      py="0.5%"
      px="0.5%"
      borderRadius="20px"
      fontSize="13px"
      minWidth="300px"
      border="1px solid white"
      cursor="pointer"
      _hover={{ bgColor: "green" }}
      onClick={() =>
        history.push(`coin-flip/${props.coinFlip["contractAddress"]}`)
      }
    >
      <Flex>
        <>
          <Box minHeight="100px" width="50%" border="1px solid white" borderRadius="20px" textAlign="center">
            <Box pt="10%"pl="15%">
              <Image src={CoinBull}></Image>
            </Box>
            <Heading fontSize="20px">{props.coinFlip.creatorAddress.substr(0, 10)}...</Heading>

            <Box pl="70px" pt="40px" minHeight="100px" width="100%" justifyContent="center" margin="0" fontSize="30px">
              <Flex margin="0">
                {props.coinFlip.buyInPrice}
                <Box pl="3px" pt="3px">
                  <FaEthereum />
                </Box>
              </Flex>
            </Box>

          </Box>

          <Box bgColor="white" height="40px" width="40px" mt="130px" mx="1%" textAlign="center" lineHeight="20px">
            <Heading color="black" fontSize="10px">VS</Heading>
       
          </Box>

          <Box width="50%" border="1px solid white" borderRadius="20px" textAlign="center">
            <Box pt="10%"pl="15%">
              <Image src={CoinBear}></Image>
            </Box>
            {props.coinFlip.joineeAddress !==
            "0x0000000000000000000000000000000000000000" ? 
              <Box>
                <Heading fontSize="20px">{props.coinFlip.winner.substr(0, 10)}...</Heading>

              <Box pl="70px" pt="40px" minHeight="100px" width="100%" justifyContent="center" margin="0" fontSize="30px">
                  <Flex>
                    {props.coinFlip.buyInPrice}
                    <Box pl="3px" pt="3px">
                      <FaEthereum />
                    </Box>
                  </Flex>
                </Box>

              </Box>
            :

              <Heading color="green"fontSize="20px">Joinable</Heading>
            }
          </Box>

        </>
          
      </Flex>


  </Box>
  );
};

type ModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const CreateGameModal = (props: ModalProps) => {
  const { user: account } = useContext(MetaMaskUserContext);
  const [balance, setBalance]: any = useState(0);
  const [sliderValue, setSliderValue]: any = useState(0.1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [txnNumber, setTxnNumber] = useState(0);
  const [isCreated, setCreated] = useState(false);
  const [contract, setContract]: any = useState();

  const handleSubmit = () => {
    console.log(parseFloat(sliderValue));
    setLoading(true);

    setTxnNumber(1);
    createCoinFlipGame(parseFloat(sliderValue)).then((contract) => {
      setContract(contract);
      setTxnNumber(2);
      sendTransactionToCoinFlips(contract, parseFloat(sliderValue)).then(() => {
        setTxnNumber(3);
        addCoinFlipToGames(contract, parseFloat(sliderValue)).then(() => {
          //setLoading(false);
          setCreated(true);
        });
      });
    });
  };

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
      {isCreated && <Redirect to={`/coin-flip/${contract.address}`} />}
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay textAlign="center"></ModalOverlay>
        <ModalContent
          bgColor="#1c191c"
          color="white"
          pt="2%"
          textAlign="center"
          alignContent="center"
        >
          {!isLoading ? (
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
                onChange={(v) =>
                  setSliderValue((balance * (v * 0.01)).toFixed(2))
                }
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
          ) : (
            // LOADING SCREEN
            <ModalBody>
              <Heading>Waiting for Metamask Transaction </Heading>
              {txnNumber === 1 && (
                <Box>
                  <Text>Creating Game Contract</Text>
                  <Spinner size="lg" />
                </Box>
              )}
              {txnNumber === 2 && (
                <Box>
                  <Text>Sending Ethereum to Game</Text>
                  <Spinner size="lg" />
                </Box>
              )}
              {txnNumber === 3 && (
                <Box>
                  <Text>Adding Game to Coin Flips</Text>
                  <Spinner size="lg" />
                </Box>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};
