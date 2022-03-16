import { useEffect, useState, useContext } from "react";
import { _abi } from "../../../interfaces/Eyescream_Interface";
import { Link } from "react-router-dom";
import { _Raffle_abi } from "../../../interfaces/RaffleEscrow_Interface";
import BaseContainer from "../../../Containers/BaseContainers/BaseContainer";
import { MetaMaskUserContext } from "../../../utils/contexts";
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
  Spinner,
  Grid,
  GridItem

} from "@chakra-ui/react";

import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import {CheckIcon} from "@chakra-ui/icons"
import { FaEthereum, FaWpbeginner } from "react-icons/fa"

import RaffleCreator from "./RaffleCreator";

declare let window: any;
const Raffles = () => {
  const [currentRaffles, setCurrentRaffles]: any = useState([]);
  const [pastRaffles, setPastRaffles]: any = useState([]);
  const rafflesCollectionRef = collection(db, "raffles");   
  const { user: account } = useContext(MetaMaskUserContext);

  useEffect(() => {
    document.title = "Raffles - Raffle House";
    getRaffles();
  }, []);

  const getRaffles = async () => {
    if (window.ethereum) {
      const data = await getDocs(rafflesCollectionRef);
      data.docs.map((doc) => {
        if (doc.data().winner != "0" || doc.data().winner != null) {
          setPastRaffles((pastRaffles) => [...pastRaffles, doc.data()])
        } 
        else {
          setCurrentRaffles((currentRaffles) => [...currentRaffles, doc.data()])
        }
      })
    }
  };


  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <BaseContainer>
      {console.log("CURRENT RAFFLES", currentRaffles)}
      <CreateGameModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box className="Raffles-container-main">
        <Box float="right">
          <Button bgColor="green" color="white" onClick={onOpen}>
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

  const [isMouseOver, setIsMouseOver] = useState(false)

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
        src={props.token.tokenImage} // ADD TOKEN IMAGE BITACH
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
          src={props.token.tokenImage} // ADD TOKEN IMAGE BITACH
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
          {props.token.winner != "0" || props.token.winner != null ?
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



type ModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
 
const CreateGameModal = (props: ModalProps) => {
  const { user: account } = useContext(MetaMaskUserContext);
  const [isLoading, setLoading] = useState(false);
  const [txnNumber, setTxnNumber] = useState(0);

  return (
    <Box>
      {/*isCreated && <Redirect to={`/coin-flip/${contract.address}`} />*/}
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="6xl">
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
              <RaffleCreator/>
            </ModalBody>
          ) : (
            // LOADING SCREEN  // WIll move this to RaffleCreator ( Or NFT )
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



