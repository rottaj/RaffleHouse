import { ethers } from "ethers";
import { _abi } from "../../../interfaces/Eyescream_Interface";
import { _HighRoller_abi } from "../../../interfaces/HighRoller_Interface";
import { useState, useEffect, useContext } from "react";
import {
  HighRollersAddress,
  _HighRollers_abi,
} from "../../../interfaces/HighRollers_Interface";
import { Link } from "react-router-dom";
import { fetchNFTs } from "../../../utils/HandleNFTs";
import BaseContainer from "../../../Containers/BaseContainers/BaseContainer";
import "../../../styles/HighRollers/HighRollers.scss";
import {
  Box,
  Heading,
  Flex,
  Text,
  Skeleton,
  Tooltip,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import {
  BaseContainerContext,
  MetaMaskUserContext,
} from "../../../utils/contexts";
import HighRollersGameBoard from "./HighRollersGameBoard";
import PlayerPanels from "./PlayerPanels";
import { useMemo } from "react";
import { groupBy, mapValues } from "lodash";
import NFT from "../../NFT";
import { db } from "../../../firebase-config";
import {
  collection,
  query,
  doc,
  where,
  getDocs,
  setDoc,
  increment,
  updateDoc,
  getDoc,
} from "firebase/firestore";

interface CurrentGame {
  contractAddress: string;
  startTime: string;
  endTime: string;
  winner: string;
}

const ETHERSCAN_URL = 'https://rinkeby.etherscan.io/address/'

const HighRollers = () => {
  return (
    <BaseContainer>
      <HighRollersGame />
    </BaseContainer>
  );
};

export default HighRollers;

const HighRollersGame = () => {
  const { user: account, isLoadingUser } = useContext(MetaMaskUserContext);

  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const highRollersCollectionRef = collection(db, "highrollers");
  // // START OF GAME INFO
  // const getCountDown = () => {
  //   let dateString: any = parseInt(data?.currentGame.endTime);
  //   var now = new Date().getTime();
  //   var countDownDate = new Date(dateString).getTime();
  //   var minutes = parseInt(String((countDownDate - now / 1000) / 60));
  //   var seconds = parseInt(
  //     String(countDownDate - now / 1000 - parseInt(String(minutes)) * 60)
  //   );
  //   if (minutes <= 0) {
  //     minutes = 0;
  //   }
  //   if (seconds <= 0) {
  //     seconds = 0;
  //   }
  //   setMinutesLeft(minutes);
  //   setSecondsLeft(seconds);
  // };

  // END OF GAME INFO

  useEffect(() => {
    document.title = "High Rollers - Raffle House";
  }, []);

  const getGameData = async () => {
    // game data arrays

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const gamesQuery = query(
      highRollersCollectionRef,
      where("winner", "==", "0")
    ); // using winner for now... will add times later.
    const querySnapshot = await getDocs(gamesQuery);
    console.log("QUERY SNAPSHOT", querySnapshot.docs[0]);
    const currentHighRollerGame = querySnapshot.docs[0].data();
    const currentGameRef = doc(
      highRollersCollectionRef,
      currentHighRollerGame.contractAddress
    );
    const currentGameSnap = await getDoc(currentGameRef);

    //const gameToks = await fetchNFTs(currentHighRollerGame.contractAddress); // FETCHES GAME TOKENS
    const players = currentGameSnap.data()["players"];
    const gameToks = currentGameSnap.data()["gameTokens"];
    const userToks = await fetchNFTs(account);

    /*
    const currentHighRollerContract = new ethers.Contract(
      currentHighRollerGame.contractAddress,
      _HighRoller_abi,
      signer
    );
    
    console.log("TESTING CURRENT GAME", currentHighRollerGame)
    //const tickets = await currentHighRollerContract.getTickets();
    
    // TODO : requests not working
    //console.log("ticks", tickets);
    */

    return {
      currentGame: currentHighRollerGame,
      gameTokens: gameToks,
      userTokens: userToks,
      players: players,
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

  // TODO : replace token id with token value
  const totalEthInGame = data?.gameTokens.reduce(
    (previousValue, currentValue) =>
      previousValue + parseFloat(currentValue.tokenPrice),
    0
  );

  const usersWithData = useMemo(() => {
    const groupByUser = mapValues(groupBy(data?.gameTokens, "from"));
    let tempUsers = [];
    for (const user in groupByUser) {
      const totalEthForUser = groupByUser[user].reduce(
        (previousValue, currentValue) =>
          previousValue + parseFloat(currentValue.tokenPrice),
        0
      );
      tempUsers.push({
        totalEth: totalEthForUser,
        address: user,
        numTokens: groupByUser[user].length,
      });
    }
    return tempUsers;
  }, [data?.gameTokens]);

  const handleContractRedirect = () => {
    window.open(ETHERSCAN_URL + data?.currentGame.contractAddress)
  }

  const { isSidebarOpen } = useContext(BaseContainerContext);
  return (
    <Flex
      pl={isSidebarOpen && [0, 0, 0, "80px"]}
      transition="padding-left 0.2s ease-out"
      flexDir="column"
      align="center"
      justify="center"
      w="100%"
      h="100%"
    >
      <Box>
        <Flex>
          <Text color="white" fontSize="48px">
            High&nbsp;
          </Text>
          <Text color="green" fontSize="48px">
            Roller
          </Text>
        </Flex>
        <Flex color="white" flexDir="column">
          <Box>
            <Stack
              spacing="40px"
              direction={["column", null, null, null, "row"]}
            >
              <Box>
                <Flex fontSize="34px" justify="center" pb="12px">
                  <Text>Game ID:</Text>
                  <>
                    {isLoading || !isSuccess ? (
                      <Flex align="center">
                        <Skeleton w="200px" h="30px">
                          loading
                        </Skeleton>
                      </Flex>
                    ) : (
                      <Tooltip
                        fontSize="22px"
                        hasArrow
                        label={data?.currentGame.contractAddress}
                      >
                        <Text cursor="pointer" maxW="200px" noOfLines={1} onClick={handleContractRedirect}>
                          {data?.currentGame.contractAddress}
                        </Text>
                      </Tooltip>
                    )}
                  </>
                </Flex>
                <HighRollersGameBoard
                  contractAddress={data?.currentGame?.contractAddress}
                  usersWithData={usersWithData}
                  totalEthInGame={totalEthInGame}
                  userTokens={data?.userTokens || []}
                />
              </Box>
              <PlayerPanels players={data?.players} />
            </Stack>
            <Box
              w="480px"
              mt="18px"
              minH="200px"
              borderTopRadius="md"
              borderRightWidth="4px"
              borderLeftWidth="4px"
              borderTopWidth="4px"
              borderBottomWidth="4px"
              borderColor="white"
            >
              <Flex justify="center">
                <Text fontSize="32px">Game Pot</Text>
              </Flex>

              {isLoading ? (
                <Flex pt="22px" justify="center">
                  <Text fontSize="3xl">Loading NFTS ...</Text>
                </Flex>
              ) : data?.gameTokens.length === 0 ? (
                <Flex pt="22px" justify="center">
                  <Text fontSize="3xl">Pot is empty ...</Text>
                </Flex>
              ) : (
                <SimpleGrid minChildWidth="90px" spacing="8px" px="20px">
                  {data?.gameTokens.map((token, index) => (
                    <Box key={index}>
                      <NFT
                        token={token}
                        handleDeposit={null}
                        game={"highrollers-pot"}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

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
