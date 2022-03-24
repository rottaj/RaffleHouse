import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { _CoinFlip_abi } from "../../../interfaces/CoinFlip_Interface";
import CoinBull from "../../../images/coinBull.png";
import CoinBear from "../../../images/coinBear.png";
import Footer from "../../Footer";
import { FaEthereum } from "react-icons/fa";
import etherscan_light from "../../../images/etherscan-logos/etherscan-logo-light.png";
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
  HStack,
  Spacer,
} from "@chakra-ui/react";
import "../../../styles/CoinFlips/CoinFlipViewer.scss";
import { MetaMaskUserContext } from "../../../utils/contexts";
import { db } from "../../../firebase-config";
import { setDoc, doc, increment, getDoc, updateDoc } from "firebase/firestore";
import CoinFlipUser from "./CoinFlipUser";


const ETHERSCAN_URL = 'https://rinkeby.etherscan.io/address/'

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

  const handleContractRedirect = (contractAddress) => {
    window.open(ETHERSCAN_URL + contractAddress)
  }

  return (
    <>
      {props.gameInfo.joineeAddress != null ? (
        <Modal
          isOpen={props.isOpen}
          onClose={props.onClose}
          isCentered
          size="lg"
          preserveScrollBarGap
        >
          <ModalOverlay textAlign="center" />
          <ModalContent
            bgColor="black"
            border="1px solid white"
            color="white"
            background="#141414"
            w="100%"
            textAlign="center"
            alignContent="center"
          >
            <ModalBody w="100%">
              {/* <Box w="100%"> */}
              <Box paddingTop="24px">
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
                {props.gameInfo.winner !==
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
                <Box w="100%" h="100%">
                  {/* <Flex w="100%" maxW="full">
                    <CoinFlipUser
                      address={props.gameInfo.creatorAddress as string}
                      isBull={true}
                      isViewer
                      isCreator
                      buyInPrice={props.gameInfo.buyInPrice}
                      ethusd={parseFloat(networkStats?.ethusd)}
                    /> */}
                  {/* 
                    <Text
                      color="white"
                      textShadow="green 3px 3px"
                      fontSize="40px"
                    >
                      VS
                    </Text> */}

                  {/* <CoinFlipUser
                      address={props.gameInfo.joineeAddress as string}
                      isViewer
                      buyInPrice={props.gameInfo.buyInPrice}
                      ethusd={parseFloat(networkStats?.ethusd)}
                    />
                  </Flex> */}

                  <Flex align="center">
                    <>
                      <CoinFlipUser
                        address={props.gameInfo.creatorAddress as string}
                        isBull={true}
                        buyInPrice={props.gameInfo.buyInPrice}
                        ethusd={parseFloat(networkStats?.ethusd)}
                        view={"Card"}
                      />
                      <Flex
                        bgColor="white"
                        height="40px"
                        width="40px"
                        mx="4px"
                        justify="center"
                        align="center"
                      >
                        <Text color="black" fontWeight="bold" fontSize="14px">
                          VS
                        </Text>
                      </Flex>

                      <CoinFlipUser
                        address={props.gameInfo.joineeAddress as string}
                        buyInPrice={props.gameInfo.buyInPrice}
                        ethusd={parseFloat(networkStats?.ethusd)}
                        view={"Card"}
                      />
                    </>
                  </Flex>
                  <div
                    id="coin"
                    className={coinStatus}
                    onClick={handleCoinAnimation}
                  >
                    <div className="side head"></div>
                    <div className="side tail"></div>
                  </div>
                <Image 
                  height="25%"
                  width="25%"
                  src={etherscan_light} 
                  onClick={() => handleContractRedirect(props.gameInfo.contractAddress)}>
                </Image>
                </Box>
              ) : (
                "GAME DOESN'T EXIST"
              )}
              {/* </Box> */}
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
              <Image 
                height="25%"
                width="25%"
                src={etherscan_light} 
                onClick={() => handleContractRedirect(props.gameInfo.contractAddress)}>
              </Image>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CoinFlipViewer;
