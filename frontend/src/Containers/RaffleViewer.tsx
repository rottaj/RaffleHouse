import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { _abi } from "../interfaces/Eyescream_Interface";
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
import BaseContainer from "./BaseContainers/BaseContainer";
import RaffleDeposit from "../Components/DepositRaffle";
import PlayersList from "../Components/PlayersList";
import { fetchNFTs, getMetaDataSingle } from "../utils/HandleNFTs";
import { MetaMaskUserContext } from "../utils/contexts";
import { FaEthereum } from "react-icons/fa";
import {
  Box,
  Heading,
  Flex,
  Button,
  Image,
  Text,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"
import { TokenPrice } from "../utils/Opensea/TokenPrice";
import { TokenMetaData } from "../utils/Opensea/TokenMetaData";

/*
    The reason for this shenanigans is RaffleViewer is not a child component.. so no props. ( getting contract address from path :shit: )
*/



declare let window: any;
const RaffleViewer = () => {
  const [tokenMetaData, setTokenMetaData]: any = useState({});
  const [gameInfo, setGameInfo]: any = useState({})
  const [token, setToken]: any = useState({});
  const [isDepositOpen, setIsDepositOpen]: any = useState(false);
  const [raffleContractAddress, setRaffleContractAddress]: any = useState("");
  const [raffleBalance, setRaffleBalance]: any = useState("");
  const [players, setPlayers]: any = useState([]);
  const { user, queryClient } = useContext(MetaMaskUserContext);

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
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      let contract = new ethers.Contract(contractAddress, _Raffle_abi, provider);
      const gameToken = await fetchNFTs(contractAddress); // FETCHES GAME TOKENS
      console.log(gameToken[0])
      setToken(gameToken[0]);


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
      <Box
        margin="0"
        height="100%" 
        width="100%"
        px="5%"
        justifyContent="center"

      >
        {console.log(token, token.length)}
        <Flex mx="3%" marginTop="5%">
          <Box height="25%" width="25%" px="1%">

              {token.contractAddress != undefined && 

              <Flex>
              <Box>
                <Heading color="white">{token.tokenName} #{token.tokenID}</Heading>
                <Image minWidth="300px" minHeight="300px" borderRadius="20px" src={token.image}></Image>
                <Box fontSize="30px" ml="30%">
                  <TokenPrice
                    token={token}
                    queryClient={queryClient}
                  />
                </Box>
              </Box>
                <Box ml="60%" mt="20%">
                  <TokenMetaData token={token} queryClient={queryClient}/>
                </Box>
              </Flex>
              }
          </Box>


        </Flex>
        <PlayersList players={players} />
      </Box>
  </BaseContainer>
  );
};

export default RaffleViewer;


/*
        <RaffleDeposit
          tokenMetaData={tokenMetaData}
          isDepositOpen={isDepositOpen}
          raffleContractAddress={raffleContractAddress}
        />

*/








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
