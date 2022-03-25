import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { _abi } from "../../interfaces/Eyescream_Interface";
import { _Raffle_abi } from "../../interfaces/RaffleEscrow_Interface";
import BaseContainer from "../../Containers/BaseContainers/BaseContainer";
import RaffleDeposit from "../../Components/DepositRaffle";
import PlayersList from "../../Components/PlayersList";
import { fetchNFTs, getMetaDataSingle } from "../../utils/HandleNFTs";
import { MetaMaskUserContext } from "../../utils/contexts";
import { FaEthereum } from "react-icons/fa";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Modal,
  Image,
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
} from "@chakra-ui/react"
import { TokenPrice } from "../../utils/Opensea/TokenPrice";
import { TokenMetaData } from "../../utils/Opensea/TokenMetaData";

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
      console.log("GAMETOKEN", gameToken)
      setToken(gameToken[0]);


      const tickets = await contract.getTickets();
      const uniqueAddresses = getUniqueAddresses(tickets);
      getTickets(uniqueAddresses, tickets);
    };



    if (window.ethereum) {
      mountRaffleGameInfo();

    }
  }, []);

  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <BaseContainer>
      <DepositModal token={token} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
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
        <Box>
          <Button onClick={onOpen}>Buy Tickets</Button>
        </Box>
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
  token: any,
  isOpen,
  onOpen,
  onClose
}

  const DepositModal = (props: ModalProps) => {
  const [isDepositOpen, setIsDepositOpen]: any = useState(false);
  const [balance, setBalance]: any = useState(0);
  const {user, networkStats} = useContext(MetaMaskUserContext)
  const [sliderValue, setSliderValue]: any = useState(0.1);
  const [usdValue, setUsdValue]: any = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [txnNumber, setTxnNumber] = useState(0);

  const handleSubmit = async () => {
    if (window.ethereum) {
      const contractAddress = window.location.pathname.split("/").at(-1);
      setTxnNumber(1);
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        _Raffle_abi,
        signer
      );
      let depositTxn = await contract.deposit(parseInt(String(parseFloat(sliderValue) / 0.01)), {
        value: ethers.utils.parseEther(String(parseFloat(sliderValue))),
      });
      console.log(depositTxn);
    }
  };

  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(user);
      setBalance((parseInt(String(balance)) * 0.1 ** 18).toFixed(2));
    };
    if (window.ethereum) {
      getBalance();
    }
  }, []);



  return (
    <Modal 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay
        textAlign="center"
      />
        <ModalContent
          bgColor="#1c191c"
          color="white"
          pt="2%"
          textAlign="center"
          alignContent="center"
        >
          {!isLoading ? (
            <ModalBody>
              {console.log("PROPS", props)}
              <Heading pb="30%">Buy Tickets!</Heading>
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
              {networkStats.ethusd != undefined && 
                <Text width="auto">USD: ${String(parseFloat(String(parseFloat(balance) * parseFloat(networkStats.ethusd))).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> 
              }
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
                <Heading fontSize="20px">${parseFloat(String(sliderValue * parseFloat(networkStats.ethusd))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Heading>
              </Box>
              <Box pt="30%" pb="10%">
                <Button
                  bgColor="green"
                  color="white"
                  onClick={() => handleSubmit()}
                >
                  Join Raffle!
                </Button>
              </Box>
            </ModalBody>
          ) : (
            // LOADING SCREEN
            <ModalBody>
              <Heading>Waiting for Metamask Transaction </Heading>
              {txnNumber === 1 && (
                <Box>
                  <Text>Sending Ethereum to Game</Text>
                  <Spinner size="lg" />
                </Box>
              )}

            </ModalBody>
          )}
        </ModalContent>
    </Modal>
  )
}
