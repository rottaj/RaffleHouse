import { useState, useEffect, useContext } from "react";
//import { Redirect, Link, useHistory } from "react-router-dom";
import { ethers } from "ethers";
import CoinFlip from "./CoinFlip";
import { _CoinFlips_abi } from "../../../interfaces/CoinFlips_Interface";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../../../interfaces/CoinFlip_Interface";
import BaseContainer from "../../../Containers/BaseContainers/BaseContainer";
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
  Spinner,
  Grid,
  GridItem,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Switch
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import {
  createCoinFlipGame,
  sendTransactionToCoinFlips,
} from "../../../utils/CreateCoinFlipGame";
import { MetaMaskUserContext } from "../../../utils/contexts";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  increment,
  updateDoc,
  doc,
} from "firebase/firestore";

declare let window: any;
const CoinFlips = () => {
  const [currentCoinFlips, setCurrentCoinFlips]: any = useState([]);
  const [pastCoinFlips, setPastCoinFlips]: any = useState([]);
  const [currentView, setCurrentView]: any = useState("Card");

  const coinflipsCollectionRef = collection(db, "coinflips");
  useEffect(() => {
    document.title = "Coin Flips - Raffle House";
    if (window.ethereum) {
      getCoinFlips();
    }
  }, []);

  const getCoinFlips = async () => {
    if (window.ethereum) {
      const data = await getDocs(coinflipsCollectionRef);
      data.docs.map((doc) => {
        if (doc.data().winner != "0") {
          setPastCoinFlips((pastCoinFlips) => [...pastCoinFlips, doc.data()]);
        } else {
          setCurrentCoinFlips((currentCoinFlips) => [
            ...currentCoinFlips,
            doc.data(),
          ]);
        }
      });
    }
  };

  const handleViewChange = () => {
    setCurrentView(currentView == "Card" ? "Table" : "Card")
  }

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
                <Switch onChange={handleViewChange}></Switch>
                <Button bgColor="green" color="white" onClick={onOpen}>
                  Create Game
                </Button>
              </Box>
            </Flex>
          </Box>
          {currentView == "Card" && 
            <Grid color="white" templateColumns="repeat(2, 1fr)" gap={2}>
              {currentCoinFlips.map((coinFlip: any) => {
                return (
                  <GridItem>
                    <CoinFlip coinFlip={coinFlip} view={currentView}></CoinFlip>
                  </GridItem>
                );
              })}
            </Grid>
          }
          {currentView == "Table" && 
            <Table color="white">
              <Thead w="100%">
                <Tr>
                  <Th>Creator</Th>
                  <Th>Status</Th>
                  <Th>Buy In</Th>
                </Tr>
              </Thead>
              <Tbody w="100%">
                {currentCoinFlips.map((coinFlip: any) => {
                  return <CoinFlip coinFlip={coinFlip} view={currentView}></CoinFlip>;
                })}
              </Tbody>
            </Table>
          } 
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
          {currentView == "Card" && 
            <Grid color="white" templateColumns="repeat(2, 1fr)" gap={2}>
              {pastCoinFlips.map((coinFlip: any) => {
                return (
                  <GridItem>
                    <CoinFlip coinFlip={coinFlip} view={currentView}></CoinFlip>
                  </GridItem>
                );
              })}
            </Grid>
          }
          {currentView == "Table" &&
            <Table color="white">
              <Thead w="100%">
                <Tr>
                  <Th>Creator</Th>
                  <Th>Status</Th>
                  <Th>Buy In</Th>
                </Tr>
              </Thead>
              <Tbody w="100%">
                {pastCoinFlips.map((coinFlip: any) => {
                  return <CoinFlip coinFlip={coinFlip} view={currentView}></CoinFlip>;
                })}
              </Tbody>
            </Table>
          }
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default CoinFlips;

type ModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const CreateGameModal = (props: ModalProps) => {
  const { user: account, networkStats } = useContext(MetaMaskUserContext);
  const [balance, setBalance]: any = useState(0);
  const [sliderValue, setSliderValue]: any = useState(0.1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [txnNumber, setTxnNumber] = useState(0);
  const [isCreated, setCreated] = useState(false);
  const [contract, setContract]: any = useState();
  const coinflipsCollectionRef = collection(db, "coinflips");

  const handleSubmit = () => {
    setLoading(true);

    setTxnNumber(1);
    createCoinFlipGame(parseFloat(sliderValue)).then((contract) => {
      setContract(contract);
      setTxnNumber(2);
      sendTransactionToCoinFlips(contract, parseFloat(sliderValue)).then(
        async () => {
          setTxnNumber(3);
          await setDoc(doc(db, "coinflips", contract.address), {
            creatorAddress: account,
            contractAddress: contract.address,
            buyInPrice: parseFloat(sliderValue),
            joineeAddress: null,
            winner: "0",
          });
          const playerRef = doc(db, "users", account);
          await updateDoc(playerRef, {
            totalDeposited: increment(parseFloat(sliderValue)),
          });
          const requestParameters = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contractAddress: contract.address,
            }), // CREATE REQUEST BODY
          };
          await fetch(
            "https://rafflehouse.uk.r.appspot.com/fundGame",
            //"http://127.0.0.1:8080/fundGame",
            requestParameters
          );
        }
      );
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
      {/*isCreated && <Redirect to={`/coin-flip/${contract.address}`} />*/}
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
              <Text width="auto">
                USD: $
                {String(
                  parseFloat(
                    String(
                      parseFloat(balance) * parseFloat(networkStats?.ethusd)
                    )
                  ).toFixed(2)
                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>

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
              <Box pt="10%">
                <Heading fontSize="20px">
                  $
                  {parseFloat(
                    String(sliderValue * parseFloat(networkStats?.ethusd))
                  )
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Heading>
              </Box>
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
