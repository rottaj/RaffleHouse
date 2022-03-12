import { useState, useEffect, useContext } from "react";
import BaseContainer from "./BaseContainers/BaseContainer";
import CoinFlip from "../Components/Games/CoinFlip/CoinFlip";
import {
  Box,
  Flex,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  increment,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { MetaMaskUserContext } from "../utils/contexts";
import { FaEthereum } from "react-icons/fa";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

const MyHistory = () => {
  const [coinFlips, setCoinFlips]: any = useState([]);
  const coinflipsCollectionRef = collection(db, "coinflips");

  const { user, userProfile } = useContext(MetaMaskUserContext);

  useEffect(() => {
    const getGameData = async () => {
      const coinFlipsQuery = query(
        coinflipsCollectionRef,
        where("creatorAddress", "==", user),
        where("joineeAddress", "==", user)
      );
      const coinFlipsData = await getDocs(coinFlipsQuery);
      coinFlipsData.docs.map((doc) => {
        setCoinFlips((coinFlips) => [...coinFlips, doc.data()]);
      });
    };

    getGameData();
  }, []);

  return (
    <BaseContainer>
      <Box textAlign="center" color="white">
        <Flex>
          <Heading> My </Heading>
          <Heading pl="1%" color="green">
            {" "}
            History{" "}
          </Heading>
        </Flex>
        <Flex ml="35%" pt="5%">
          <Box px="5%" borderRight="1px solid white" py="3%">
            <Heading fontSize="55px" color="green">
              Wins: {userProfile.data().gamesWon}
            </Heading>
          </Box>
          <Box px="5%" py="3%">
            <Heading fontSize="55px" color="red">
              Losses: {userProfile.data().gamesLost}
            </Heading>
          </Box>
        </Flex>
        <Flex ml="31%">
          <Flex mr="7%">
            <Heading fontSize="35px" pr="5%">
              Profits:
            </Heading>
            <Box>
              <Flex>
                <Heading>{userProfile.data().totalWinnings}</Heading>
                <FaEthereum size={35} />
              </Flex>
              {parseFloat(userProfile.data().totalDeposited) >=
              parseFloat(userProfile.data().totalWinnings) ? (
                <Flex>
                  <Heading color="red" fontSize={15}>
                    (
                    {(parseFloat(userProfile.data().totalDeposited) /
                      parseFloat(userProfile.data().totalWinnings)) *
                      100}{" "}
                    %)
                  </Heading>
                  <Box pt="1.5%">
                    <BiDownArrowAlt color="red" />
                  </Box>
                </Flex>
              ) : (
                <Flex>
                  <Heading color="green" fontSize={15}>
                    (
                    {(parseFloat(userProfile.data().totalDeposited) /
                      parseFloat(userProfile.data().totalWinnings)) *
                      100}{" "}
                    %)
                  </Heading>
                  <Box pt="1.5%">
                    <BiUpArrowAlt color="green" />
                  </Box>
                </Flex>
              )}
            </Box>
          </Flex>
          <Flex ml="7%">
            <Heading fontSize="35px" pr="5%">
              Wagered:
            </Heading>
            <Flex>
              <Heading>{userProfile.data().totalDeposited}</Heading>
              <FaEthereum size={35} />
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Heading color="green">Games</Heading>
        </Flex>

        <Box ml="22%" width="60%">
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <Flex>
                    <Heading fontSize="25px" color="white">
                      NFT /
                    </Heading>
                    <Box pl="1%" pt="1.5%">
                      <FaEthereum color="white" size={25} />
                    </Box>
                  </Flex>
                </Th>
                <Th>
                  <Heading fontSize="25px" color="white">
                    Game
                  </Heading>
                </Th>
                <Th>
                  <Heading fontSize="25px" color="white">
                    Outcome
                  </Heading>
                </Th>
                <Th>
                  <Heading fontSize="25px" color="white">
                    P/L
                  </Heading>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {coinFlips.map((coinFlip) => {
                console.log("Coinflip", coinFlip);
                return (
                  <Tr>
                    <Th>
                      <Flex>
                        <Text color="white">{coinFlip.buyInPrice * 2}</Text>
                        <Text>
                          <FaEthereum color="white" />
                        </Text>
                      </Flex>
                    </Th>
                    <Th color="white">Coin Flip</Th>
                    {coinFlip.winner == user.toUpperCase ? (
                      <Th color="green">Win</Th>
                    ) : (
                      <Th color="red">Loss</Th>
                    )}
                    {coinFlip.winner == user.toUpperCase ? (
                      <Th color="green">{coinFlip.buyInPrice}</Th>
                    ) : (
                      <Th color="red">{coinFlip.buyInPrice}</Th>
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default MyHistory;
