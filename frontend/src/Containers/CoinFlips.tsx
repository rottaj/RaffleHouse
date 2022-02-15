import { useState, useEffect } from "react";
import CoinFlip from "../Components/CoinFlip";
import Messages from "../Components/Messages";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import {
  CoinFlipAddress,
  _CoinFlips_abi,
} from "../interfaces/CoinFlips_Interface";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../interfaces/CoinFlip_Interface";
import Footer from "../Components/Footer";
import BaseContainer from "./BaseContainers/BaseContainer";
import {
  Box,
  Flex,
  Heading
} from '@chakra-ui/react'

declare let window: any;
const CoinFlips = () => {
  const [currentCoinFlips, setCurrentCoinFlips]: any = useState([]);
  const [pastCoinFlips, setPastCoinFlips]: any = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    document.title = "Coin Flips - Raffle House";

    const mountCoinFlipData = async () => {
      var accounts = await window.ethereum.send("eth_requestAccounts");
      const account = accounts.result[0];
      setAccount(account);
      getCoinFlips();
    };
    if (window.ethereum) {
      mountCoinFlipData();
    }
  }, []);

  const getCoinFlips = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coinFlipContract = await new ethers.Contract(
        CoinFlipAddress,
        _CoinFlips_abi,
        signer
      );
      let coinFlipLength = await coinFlipContract.getCoinFlips();
      for (let i = 0; i <= coinFlipLength - 1; i++) {
        var tempCoinFlip: any = {};
        var coinFlip = await coinFlipContract.getCoinFlipByIndex(i);
        const coinFlipInstance = await new ethers.Contract(
          coinFlip.contractAddress,
          _CoinFlip_abi,
          signer
        );
        const gameInfo = await coinFlipInstance.getGameInfo();
        tempCoinFlip["contractAddress"] = coinFlip["contractAddress"];
        tempCoinFlip["buyInPrice"] =
          parseInt(gameInfo["buyInPrice"]) / 10 ** 18;
        tempCoinFlip["creatorAddress"] = gameInfo["creatorAddress"];
        tempCoinFlip["joineeAddress"] = gameInfo["joineeAddress"];
        tempCoinFlip["winner"] = gameInfo["winner"];
        if (gameInfo.winner !== "0x0000000000000000000000000000000000000000") {
          setCurrentCoinFlips((currentCoinFlips: any) => [
            ...currentCoinFlips,
            tempCoinFlip,
          ]);
        } else {
          setPastCoinFlips((pastCoinFlips: any) => [
            ...pastCoinFlips,
            tempCoinFlip,
          ]);
        }
      }
    }
  };

  return (
    <BaseContainer>
      <Box textAlign='center'>
        <Messages />
        <Box textAlign="center">
          <Heading 
            marginBottom="2%"
            color="#DE89BE"
            textShadow="rgb(203, 176, 204) 3px 3px"
            fontSize="40px"
            paddingTop="5%"
          >
            ACTIVE GAMES
          </Heading>
          <Flex
            my="md"
          >
            <Heading
              paddingLeft="25%"
              color="#DE89BE"
              fontSize="30px"
            >
              Creator
            </Heading>
            <Heading 
              paddingLeft="30%"
              color="#DE89BE"
              fontSize="30px"
            >
              Buy in Price
            </Heading>
          </Flex>
          {pastCoinFlips.map((coinFlip: any) => {
            return (
              <Link to={`coin-flip/${coinFlip["contractAddress"]}`}>
                <CoinFlip coinFlip={coinFlip}></CoinFlip>
              </Link>
            );
          })}
          <Heading
            marginBottom="2%"
            color="#DE89BE"
            textShadow="rgb(203, 176, 204) 3px 3px"
            fontSize="40px"
          >
            PAST GAMES
          </Heading>
          {currentCoinFlips.map((coinFlip: any) => {
            return (
              <Link to={`coin-flip/${coinFlip["contractAddress"]}`}>
                <CoinFlip coinFlip={coinFlip}></CoinFlip>
              </Link>
            );
          })}
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default CoinFlips;
