import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { _abi } from "../interfaces/Eyescream_Interface";
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
import BaseContainer from "./BaseContainers/BaseContainer";
import RaffleDeposit from "../Components/DepositRaffle";
import PlayersList from "../Components/PlayersList";
import Messages from "../Components/Messages";
import {
  Box,
  Heading,
  Flex,
  Image
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
  const [isDepositOpen, setIsDepositOpen]: any = useState(false);
  const [raffleContractAddress, setRaffleContractAddress]: any = useState("");
  const [raffleBalance, setRaffleBalance]: any = useState("");
  const [players, setPlayers]: any = useState([]);
  const [gameInfo, setGameInfo]: any = useState([]);
  const [account, setAccount]: any = useState("");

  const fetchNFTs = async (contractAddress: any) => {
    if (window.ethereum) {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
      //var abi = fetch (url) // get verified contract abi
      // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
      //console.log(token.contractAddress, address)
      var url =
        ETHERSCAN_API_NFT_TXN +
        contractAddress +
        "&startblock=0&endblock=999999999&sort=asc&apikey=" +
        ETHERSCAN_API_KEY;
      console.log(url);
      fetch(url)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          getMetaData(data.result[0]); // POTENTIAL FIX IS PROBALY GOOD
        });
    }
  };

  const getMetaData = async (token: any) => {
    console.log(token);
    if (window.ethereum) {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
      //var abi = fetch (url) // get verified contract abi
      // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
      //console.log(token.contractAddress, address)
      try {
        if (
          String(token.contractAddress) ===
          "0x8f44a8b9059b2bc914c893eed250a2e1097ee187"
        ) {
          // THIS IS EYESCREAM ADDRESS (UPDATE THIS !!!)
          let contract = new ethers.Contract(
            token.contractAddress,
            _abi,
            signer
          );
          console.log(token.contractAddress);
          let metaData = await contract.tokenURI(parseInt(token.tokenID));
          fetch(metaData)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              token["image"] = data.image;
              setTokenMetaData(token);
            });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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

  const handleDepositClicked = () => {
    setIsDepositOpen(!isDepositOpen);
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
      const gameInfo = await contract.getGameInfo();
      fetchNFTs(contractAddress); // refactor (can do this later)

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
            <Heading fontSize="sl">{gameInfo.winner}</Heading>
          ) : (
            <Heading fontSize="sl">Winner not picked</Heading>
          )}
        </Flex>
        <Flex mx="3%" marginTop="5%">
          <Box height="25%" width="25%" px="1%">
            <Image borderRadius="20px" src={tokenMetaData.image}></Image>
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
