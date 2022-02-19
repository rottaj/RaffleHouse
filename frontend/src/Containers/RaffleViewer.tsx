import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { _abi } from "../interfaces/Eyescream_Interface";
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
import BaseContainer from "./BaseContainers/BaseContainer";
import RaffleDeposit from "../Components/DepositRaffle";
import PlayersList from "../Components/PlayersList";
import { getMetaDataSingle } from "../utils/HandleNFTs";
import { MetaMaskUserContext } from "../utils/contexts";
import { FaEthereum } from "react-icons/fa";
import {
  Box,
  Heading,
  Flex,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"

const ETHERSCAN_API_NFT_TXN =
  "https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=";
const ETHERSCAN_API_KEY = "JPARDRW9CAVF9ZKISWVC3YYM6RP93JNQUC";

/*
            The reason for this shenanigans is RaffleViewer is not a child component.. so no props. ( getting contract address from path :shit: )
            We are fetching all token info... again.
*/

declare let window: any;
const RaffleViewer = () => {
  const [tokenMetaData, setTokenMetaData]: any = useState({});
  const [imageSrc, setImageSrc] = useState('')
  const [isDepositOpen, setIsDepositOpen]: any = useState(false);
  const [raffleContractAddress, setRaffleContractAddress]: any = useState("");
  const [raffleBalance, setRaffleBalance]: any = useState("");
  const [players, setPlayers]: any = useState([]);
  const [gameInfo, setGameInfo]: any = useState([]);
  const [account, setAccount]: any = useState("");

  const getUniqueAddresses = (array: any) => {
    let unique = array.filter(
      (item: any, i: any, ar: any) => ar.indexOf(item) === i
    );
    return unique;
  };

  const getOccurances = (array: any, val: any) => {
    let ticketNumber = array.reduce(
      (a: any, v: any) => (v === val ? a + 1 : a),
      0
    );
    return ticketNumber;
  };

  const getTickets = async (uniqueAddresses: any, tickets: any) => {
    console.log(tickets);
    for (let i = 0; i <= uniqueAddresses.length; i++) {
      let ticketNumber = getOccurances(tickets, uniqueAddresses[i]);
      if (uniqueAddresses[i] !== undefined) {
        console.log(
          "TESTING GET_TICKETS",
          uniqueAddresses[i],
          ticketNumber,
          (ticketNumber * 0.01).toFixed(2)
        );
        let player = {
          address: uniqueAddresses[i],
          tickets: ticketNumber,
          totalEth: (ticketNumber * 0.01).toFixed(2),
          chance: ((ticketNumber / tickets.length) * 100).toFixed(2),
        };
        setPlayers((players: any) => [...players, player]);
      }
    }
  };

   useEffect(() => {
    const contractAddress = window.location.pathname.split("/").at(-1);
    setRaffleContractAddress(contractAddress);

    const mountRaffleGameInfo = async () => {
      var accounts = await window.ethereum.send("eth_requestAccounts");
      const account = accounts.result[0];
      setAccount(account);
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(contractAddress, _Raffle_abi, signer);
      await contract.getGameInfo().then((token) => {
      console.log("gameInfo", token)
        getMetaDataSingle(token).then((bitch) => {
          console.log("dataaaaa", bitch)
          setImageSrc(bitch.image);
        })
      });


      setGameInfo(gameInfo);
      const tickets = await contract.getTickets();
      const uniqueAddresses = getUniqueAddresses(tickets);
      getTickets(uniqueAddresses, tickets);
    };
    if (window.ethereum) {
      mountRaffleGameInfo();

    }
  }, []);

  return (
    <BaseContainer>
      <Box>
        {
          gameInfo.winner !== "0x0000000000000000000000000000000000000000" &&
          <DepositModal raffleContractAddress={raffleContractAddress} gameInfo={gameInfo}/>
        }
        {/* check for if "Winner not picked" or not? */}
        <Flex
          paddingLeft="3%"
          color="white"
          background="#211c1c"
          marginTop="8%"
          mx="30%"
          border="1px solid black"
          borderRadius="20px" /* or 50% */
        >
          <Heading fontSize="sl">Raffle Winner:</Heading>
          {gameInfo.winner !== "0x0000000000000000000000000000000000000000" ? (
            <Heading fontSize="sl" id="status">{gameInfo.winner}</Heading>
          ) : (
            <Heading fontSize="sl" id="status">Winner not picked</Heading>
          )}
        </Flex>
        <Flex mx="3%" marginTop="5%">
          <Box height="25%" width="25%" px="1%">
            <Image borderRadius="20px" src={imageSrc}></Image>
            <RaffleDeposit
              tokenMetaData={tokenMetaData}
              isDepositOpen={isDepositOpen}
              raffleContractAddress={raffleContractAddress}
            />
          </Box>

          <PlayersList players={players} />
        </Flex>
      </Box>
  </BaseContainer>
  );
};

export default RaffleViewer;

type ModalProps = {
  raffleContractAddress: any
  gameInfo: any
}

  const DepositModal = (props: ModalProps) => {
  const [tokenMetaData, setTokenMetaData]: any = useState({});
  const [isDepositOpen, setIsDepositOpen]: any = useState(false);
  const [raffleContractAddress, setRaffleContractAddress]: any = useState("");
  const {user} = useContext(MetaMaskUserContext)
  const handleSubmit = async (contractAddress: any) => {
    if (window.ethereum) {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        _Raffle_abi,
        signer
      );
      let depositTxn = await contract.deposit({
        value: ethers.utils.parseEther(String((parseInt(props.gameInfo.buyInPrice) * 0.1 ** 18).toFixed(2))).toString(),
      });
      console.log(depositTxn);
    }
  };


  const handleDepositClicked = () => {
    setIsDepositOpen(!isDepositOpen);
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
            <Image borderRadius="20px" src={tokenMetaData.image}></Image>
          </Box>
            <Flex
              py="5%"
              px="22%"
              pl="150px"
              margin="0" 
              height="100%" 
              justifyContent="center" 
            >
              <Heading>*PRICE HERE*</Heading>
              <Heading pt="1%" pr="25%"><FaEthereum/></Heading>
            </Flex>
            <Box>
              <Image borderRadius="20px" src={tokenMetaData.image}></Image>
                  <RaffleDeposit
                  tokenMetaData={tokenMetaData}
                  isDepositOpen={isDepositOpen}
                  raffleContractAddress={raffleContractAddress}
                  />
            </Box>

          <Button marginTop="10%" variant='ghost' onClick={onClose}>
            Watch Game
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
