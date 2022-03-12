import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { _CoinFlip_abi } from "../interfaces/CoinFlip_Interface";
import CoinBull from "../images/coinBull.png";
import CoinBear from "../images/coinBear.png";
import Footer from "../Components/Footer";
import { FaEthereum } from "react-icons/fa";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
} from "@chakra-ui/react";
import "../styles/CoinFlips/CoinFlipViewer.scss";
import { MetaMaskUserContext } from "../utils/contexts";
import { db } from "../firebase-config";
import { setDoc, doc, increment, getDoc, updateDoc } from "firebase/firestore";

type ModalViewerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  gameInfo: any;
  creatorImage: string;
  joineeImage: string;
};

declare let window: any;
const CoinFlipViewer = (props: ModalViewerProps) => {
  const { user, networkStats } = useContext(MetaMaskUserContext);
  const [coinStatus, setCoinStatus] = useState("flipHead");
  useEffect(() => {
    if (
      props.gameInfo.winner === "0x0000000000000000000000000000000000000000" &&
      props.gameInfo.joineeAddress !==
        "0x0000000000000000000000000000000000000000"
    ) {
      setInterval(() => {
        handleCoinAnimation();
      }, 500);
    }
  }, []);

  const handleCoinAnimation = () => {
    if (coinStatus === "flipHead") {
      setCoinStatus("flipTail");
    } else if (coinStatus === "flipTail") {
      setCoinStatus("flipHead");
    }
  };

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
        value: ethers.utils.parseEther(props.gameInfo.buyInPrice.toString()),
      });
      const coinFlipGameRef = doc(db, "coinflips", contractAddress);
      await updateDoc(coinFlipGameRef, {
        joineeAddress: user,
      });
      const playerRef = doc(db, "users", user);
      await updateDoc(playerRef, {
        totalDeposited: increment(
          parseFloat(
            String((parseInt(props.gameInfo.buyInPrice) * 0.1 ** 18).toFixed(2))
          )
        ),
      });
    }
  };

  return (
    <>
      {props.gameInfo.joineeAddress != null ? (
        <Modal
          isOpen={props.isOpen}
          onClose={props.onClose}
          isCentered
          size="7xl"
        >
          <ModalOverlay textAlign="center" />
          <ModalContent
            //bgColor="#1c191c"
            bgColor="black"
            border="1px solid white"
            color="white"
            background="#141414"
            mx="25%"
            pb="5%"
            textAlign="center"
            alignContent="center"
          >
            <ModalBody>
              <Box textAlign="center" alignItems="center">
                <Box>
                  <Box paddingTop="2%">
                    <Heading
                      color="white"
                      textShadow="green 3px 3px"
                      fontSize="40px"
                    >
                      COIN FLIP
                    </Heading>
                    <Heading color="white" fontSize="20px">
                      {props.gameInfo.contractAddress}
                    </Heading>
                    {props.gameInfo.winner !=
                    "0x0000000000000000000000000000000000000000" ? (
                      <Heading color="white" fontSize="20px">
                        Winner: {props.gameInfo.winner}
                      </Heading>
                    ) : (
                      <Heading color="white" fontSize="20px">
                        Winner not selected.
                      </Heading>
                    )}
                  </Box>
                  {props.gameInfo ? (
                    <Box>
                      <Flex justifyContent="center" marginTop="10%">
                        <Box>
                          <Box
                            py="1%"
                            px="1%"
                            my="1%"
                            mx="5%"
                            color="white"
                            border="1px solid white"
                            borderRadius="10%"
                          >
                            <Heading fontSize="lg">Creator</Heading>
                            <Flex pl="10%">
                              <Box pt="10%" pl="15%">
                                <Image
                                  maxWidth="200px"
                                  maxHeight="200px"
                                  borderRadius="50%"
                                  src={String(props.creatorImage)}
                                ></Image>
                              </Box>
                              <Box position="absolute" pl="6%" pt="2.5%">
                                <Image
                                  borderRadius="50%"
                                  maxHeight="60px"
                                  maxWidth="60px"
                                  src={CoinBull}
                                ></Image>
                              </Box>
                            </Flex>
                            <Flex my="5%" ml="42%">
                              <Heading fontSize="25px">
                                {props.gameInfo.buyInPrice}
                              </Heading>
                              <FaEthereum size={25} />
                            </Flex>
                            <Text>
                              $
                              {parseFloat(
                                String(
                                  props.gameInfo.buyInPrice *
                                    parseFloat(networkStats.ethusd)
                                )
                              ).toFixed(2)}
                            </Text>
                            <Heading fontSize="sl">
                              {props.gameInfo.creatorAddress}
                            </Heading>
                          </Box>
                        </Box>
                        <Box paddingTop="5.5%">
                          <Heading
                            color="white"
                            textShadow="green 3px 3px"
                            fontSize="40px"
                          >
                            VS
                          </Heading>
                        </Box>

                        <Box>
                          <Box
                            px="1%"
                            py="1%"
                            my="1%"
                            mx="5%"
                            color="white"
                            border="1px solid white"
                            borderRadius="10%"
                          >
                            <Heading fontSize="lg">Joinee</Heading>
                            <Flex pl="10%">
                              <Box pt="10%" pl="15%">
                                <Image
                                  maxHeight="200px"
                                  maxWidth="200px"
                                  borderRadius="50%"
                                  src={String(props.joineeImage)}
                                ></Image>
                              </Box>
                              <Box position="absolute" pl="6%" pt="2.5%">
                                <Image
                                  borderRadius="50%"
                                  maxHeight="60px"
                                  maxWidth="60px"
                                  src={CoinBear}
                                ></Image>
                              </Box>
                            </Flex>
                            <Flex my="5%" ml="42%">
                              <Heading fontSize="25px">
                                {props.gameInfo.buyInPrice}
                              </Heading>
                              <FaEthereum size={25} />
                            </Flex>

                            <Text>
                              $
                              {parseFloat(
                                String(
                                  props.gameInfo.buyInPrice *
                                    parseFloat(networkStats.ethusd)
                                )
                              ).toFixed(2)}
                            </Text>
                            <Heading fontSize="sl">
                              {props.gameInfo.joineeAddress}
                            </Heading>
                          </Box>
                        </Box>
                      </Flex>

                      <div
                        id="coin"
                        className={coinStatus}
                        onClick={handleCoinAnimation}
                      >
                        <div className="side head"></div>
                        <div className="side tail"></div>
                      </div>
                    </Box>
                  ) : (
                    "GAME DOESN'T EXIST"
                  )}
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
          <ModalOverlay textAlign="center" />
          <ModalContent
            bgColor="#1c191c"
            color="white"
            background="#141414"
            mx="25%"
            textAlign="center"
            alignContent="center"
          >
            <ModalBody>
              <Heading>Waiting for player</Heading>
              <Box paddingLeft="13%">
                <Heading fontSize="60px">
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </Heading>
              </Box>
              <Flex
                py="5%"
                px="22%"
                pl="150px"
                margin="0"
                height="100%"
                justifyContent="center"
              >
                <Heading>{parseFloat(props.gameInfo.buyInPrice)} </Heading>
                <Heading pt="1%" pr="25%">
                  <FaEthereum />
                </Heading>
              </Flex>
              <Box>
                <Button
                  onClick={() => handleSubmit(props.gameInfo.contractAddress)}
                  mt="10px"
                  color="black"
                  type="submit"
                  bgColor="green"
                >
                  Buy In
                </Button>
              </Box>

              <Button marginTop="10%" variant="ghost" onClick={props.onClose}>
                Watch Game
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CoinFlipViewer;
