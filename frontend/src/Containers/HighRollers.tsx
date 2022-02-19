import { ethers } from "ethers";
import { _abi } from "../interfaces/Eyescream_Interface";
import { _HighRoller_abi } from "../interfaces/HighRoller_Interface";
import { useState, useEffect, useContext } from "react";
import {
  HighRollersAddress,
  _HighRollers_abi,
} from "../interfaces/HighRollers_Interface";
import { Link, NavLink } from "react-router-dom";
import { fetchNFTs } from "../utils/HandleNFTs";
import NFTSelector from "../Components/NFTSelector";
import PlayerList from "../Components/PlayersList";
import HighRollersPot from "../Components/HighRollerPot";
import BaseContainer from "./BaseContainers/BaseContainer";
import "../styles/HighRollers/HighRollers.scss";
import { Box, Heading, Flex, Text, Skeleton } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { MetaMaskUserContext } from "../utils/contexts";

interface CurrentGame {
  contractAddress: string;
  startTime: string;
  endTime: string;
  winner: string;
}

const HighRollers = () => {
  const { user: account, isLoadingUser } = useContext(MetaMaskUserContext);

  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const handleDeposit = async (selectedToken: any) => {
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const collectionContract = new ethers.Contract(
      selectedToken.contractAddress,
      _abi,
      signer
    );
    const sendingTxn = await collectionContract.transferFrom(
      account,
      data?.currentGame.contractAddress,
      selectedToken.tokenID
    );
    sendingTxn.wait();
    if (sendingTxn) {
      const requestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tickets: selectedToken.tokenPrice,
          playerAddress: account,
          tokenURI: selectedToken.image,
        }), // CREATE REQUEST BODY ( WILL ADD CONTRACT ADDRESS + TOKEN ID FOR BACKEND AUTH)
      };
      fetch(
        "http://127.0.0.1:8080/submit-tickets-high-rollers",
        requestParameters
      )
        .then((res) => {
          // FETCH TO HIGHROLLER API
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
  };

  // START OF GAME INFO
  const getCountDown = () => {
    let dateString: any = parseInt(data?.currentGame.endTime);
    var now = new Date().getTime();
    var countDownDate = new Date(dateString).getTime();
    var minutes = parseInt(String((countDownDate - now / 1000) / 60));
    var seconds = parseInt(
      String(countDownDate - now / 1000 - parseInt(String(minutes)) * 60)
    );
    if (minutes <= 0) {
      minutes = 0;
    }
    if (seconds <= 0) {
      seconds = 0;
    }
    setMinutesLeft(minutes);
    setSecondsLeft(seconds);
  };

  // END OF GAME INFO

  const getUniqueAddresses = (array: any) => {
    const unique = array.filter(
      (item: any, i: any, ar: any) => ar.indexOf(item) === i
    );
    return unique;
  };

  const getOccurances = (array: any, val: any) => {
    const ticketNumber = array.reduce(
      (a: any, v: any) => (v === val ? a + 1 : a),
      0
    );
    return ticketNumber;
  };

  const getTickets = async (uniqueAddresses: any, tickets: any) => {
    const tempPlayers = [];
    for (let i = 0; i <= uniqueAddresses.length; i++) {
      const ticketNumber = getOccurances(tickets, uniqueAddresses[i]);
      if (uniqueAddresses[i] !== undefined) {
        const player = {
          address: uniqueAddresses[i],
          tickets: ticketNumber,
          totalEth: ticketNumber.toFixed(2),
          chance: ((ticketNumber / tickets.length) * 100).toFixed(2),
        };
        tempPlayers.push(player);
      }
    }
    return tempPlayers;
  };

  useEffect(() => {
    document.title = "High Rollers - Raffle House";
    // var interval = setInterval(() => {
    //   getCountDown();
    // }, 1000);
  }, []);

  const getGameData = async () => {
    // game data arrays
    const tempGameTokens = [];
    const tempUserTokens = [];
    const tempPlayers = [];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const HighRollersContract = new ethers.Contract(
      HighRollersAddress,
      _HighRollers_abi,
      signer
    );
    const currentHighRollerGame: any =
      await HighRollersContract.getCurrentGame();
    const currentGameInstance: CurrentGame = {
      contractAddress: currentHighRollerGame["contractAddress"],
      startTime: currentHighRollerGame.startTime,
      endTime: currentHighRollerGame.endTime,
      winner: currentHighRollerGame.winner,
    };

    const userToks = await fetchNFTs(account);

    tempUserTokens.push(userToks);
    await fetchNFTs(currentGameInstance.contractAddress).then((data) => {
      tempGameTokens.push(data);
    }); // FETCHES GAME TOKENS
    const currentHighRollerContract = new ethers.Contract(
      currentGameInstance.contractAddress,
      _HighRoller_abi,
      signer
    );
    const tickets = await currentHighRollerContract.getTickets();
    const uniqueAddresses = await getUniqueAddresses(tickets);
    const players = await getTickets(uniqueAddresses, tickets);
    tempPlayers.push(players);

    return {
      currentGame: currentGameInstance,
      gameTokens: tempGameTokens,
      userTokens: tempUserTokens,
      players: tempPlayers,
    };
  };

  const { data, isLoading, isSuccess } = useQuery(
    `${account}high-rollers`,
    () => getGameData(),
    {
      enabled: !isLoadingUser && Boolean(account),
      staleTime: Infinity,
    }
  );

  console.log("MY DATA", data);

  return (
    <BaseContainer>
      <Box mt={6} textAlign="center">
        <Flex w="100%" justify="center">
          <Heading color="white" fontSize="40px">
            High&nbsp;
          </Heading>
          <Heading color="green" fontSize="40px">
            Roller
          </Heading>
        </Flex>

        {/* {!isLoading && isSuccess && ( */}
        <>
          {isLoading || !isSuccess ? (
            <Flex flexDir="column" align="center">
              <Skeleton h="24px" mb="4px">
                <Text color="white" fontSize="20px">
                  Game Address: loading game dddress
                </Text>
              </Skeleton>

              <Skeleton h="24px" mb="4px">
                <Text color="#31B67E" fontSize="20px">
                  Game in Progress
                </Text>
              </Skeleton>

              <Skeleton h="24px">
                <Text color="white">0 Minutes 0 Seconds</Text>
              </Skeleton>
            </Flex>
          ) : (
            <>
              {data?.currentGame.contractAddress ? (
                <Box>
                  <Heading color="white" fontSize="20px" mb={1}>
                    Game Address: {data?.currentGame.contractAddress}
                  </Heading>
                  {data?.currentGame.winner !==
                  "0x0000000000000000000000000000000000000000" ? (
                    <Heading color="#FDCFF3" fontSize="20px">
                      Winner: {data?.currentGame.winner}
                    </Heading>
                  ) : (
                    <Heading color="#31B67E" fontSize="20px">
                      Game in Progress
                    </Heading>
                  )}
                  <Text color="white" mt={1}>
                    {minutesLeft} Minutes {secondsLeft} Seconds{" "}
                  </Text>
                </Box>
              ) : (
                <Heading color="#FDCFF3" fontSize="20px">
                  No Game
                </Heading>
              )}
            </>
          )}

          <Flex justify="center" pt={6} pb={4}>
            <Box
              width="800px"
              height="300px"
              borderRadius="200px"
              bgColor="#c1121f"
              borderWidth="2px"
            >
              <HighRollersPot tokens={data?.gameTokens[0] || []} />
            </Box>
          </Flex>

          {/* <Button
          onClick={() => handleDeposit()}
          variant="contained"
          type="submit"
          style={{ maxHeight: "55px" }}
        >
          Deposit
        </Button> */}

          <Box px="120px">
            <NFTSelector
              tokens={data?.userTokens[0] || []}
              handleDeposit={handleDeposit}
              game={"highrollers"}
            />
          </Box>

          <PlayerList players={data?.players[0] || []} />

          <PastHighRollerGames />
        </>
        {/* )} */}
      </Box>
    </BaseContainer>
  );
};

export default HighRollers;

const PastHighRollerGames = () => {
  const [pastGames, setPastGames]: any = useState([]);

  const getPastGames = async () => {
    if (window.ethereum) {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const HighRollersContract = new ethers.Contract(
        HighRollersAddress,
        _HighRollers_abi,
        signer
      );
      const pastGames = await HighRollersContract.getPastGames();
      const tempGames = [];
      for (let i = 0; i <= parseInt(pastGames) - 1; i++) {
        const tempGame = await HighRollersContract.getPastGameByIndex(i);
        tempGames.push(tempGame);
      }
      setPastGames(tempGames);
    }
  };

  useEffect(() => {
    getPastGames();
  }, []);

  return (
    <Flex py="80px" px="60px" flexDir="column" align="flex-start">
      <Text color="white" fontSize="30px">
        Past Games
      </Text>
      {pastGames.length !== 0 ? (
        <Box>
          {pastGames.map((game: any, index) => {
            return (
              <Link key={index} to={`high-roller/${game["contractAddress"]}`}>
                <HighRollerGame
                  winner={game.winner}
                  tickets={parseInt(game.tickets)}
                  contractAddress={game.contractAddress}
                />
              </Link>
            );
          })}
        </Box>
      ) : (
        <Heading color="#FDCFF3" fontSize="30px">
          No Games
        </Heading>
      )}
    </Flex>
  );
};

type HighRollerGameProps = {
  winner: string;
  tickets: number;
  contractAddress: string;
};

const HighRollerGame = (props: HighRollerGameProps) => {
  return (
    <Flex
      flexDir="column"
      borderRadius="20px"
      color="white"
      align="flex-start"
      p={4}
      bgColor="#3a0ca3"
      _hover={{ bgColor: "#4361ee" }}
      _active={{ bgColor: "#390099" }}
    >
      <Text fontSize="16px">Winner: {props.winner}</Text>
      <Text fontSize="16px">Tickets: {props.tickets}</Text>
      <Text fontSize="20px">Contract: {props.contractAddress}</Text>
    </Flex>
  );
};
