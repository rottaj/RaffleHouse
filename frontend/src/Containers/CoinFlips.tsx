import { useState, useEffect } from "react";
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
          setPastCoinFlips((pastCoinFlips: any) => [
            ...pastCoinFlips,
            tempCoinFlip,
          ]);
        } else {
          setCurrentCoinFlips((currentCoinFlips: any) => [
            ...currentCoinFlips,
            tempCoinFlip,
          ]);
        }
      }
    }
  };

  return (
    <BaseContainer>
      <Messages />
      <Box pb="100px">
        <Box 
          width="65%"
          //border="1px solid red"
          background="#141414"
          my="5%"

        >
          <Box 
            alignItems="center"
            borderBottom="4px dotted green"
          >
            <Flex>
              <Heading 
                //border="1px solid blue"
                marginBottom="2%"
                color="white"
                fontSize="30px"
                //py="2%"
                paddingLeft="3%"
              >
                ACTIVE
              </Heading>
              <Heading 
                //border="1px solid blue"
                marginBottom="2%"
                color="green"
                fontSize="30px"
                //py="2%"
                paddingLeft="6px"
              >
                GAMES
              </Heading>
            </Flex>
          </Box>
          <Flex 
              overflow="auto"
              border="1px solid black"
              color="white"
              my="1%"
              py="1%"
          >
            <Flex flexGrow="1" paddingLeft="12%">
              <Heading fontSize="md" >Player</Heading>
            </Flex>
            <Flex flexGrow="1" paddingLeft="5%">
                <Heading fontSize="md">Status</Heading>
            </Flex>
              <Heading fontSize="md" paddingRight="3%"> Buy In</Heading>
          </Flex>

            {currentCoinFlips.map((coinFlip: any) => {
              return (
                <Link to={`coin-flip/${coinFlip["contractAddress"]}`}>
                  <CoinFlip coinFlip={coinFlip}></CoinFlip>
                </Link>
              );
            })}
          </Box>
          <Box
            width="65%"
            //border="1px solid red"
            //my="5%"
          >
            <Box 
              alignItems="center"
              borderBottom="4px dotted green"
            >
            <Flex>
              <Heading 
                //border="1px solid blue"
                marginBottom="2%"
                color="white"
                fontSize="30px"
                //py="2%"
                paddingLeft="3%"
              >
                PAST
              </Heading>
              <Heading 
                //border="1px solid blue"
                marginBottom="2%"
                color="green"
                fontSize="30px"
                //py="2%"
                paddingLeft="6px"
              >
                GAMES
              </Heading>
            </Flex>
            </Box>
            <Flex 
                overflow="auto"
                border="1px solid black"
                color="white"
                my="1%"
                py="1%"
            >
              <Flex flexGrow="1" paddingLeft="12%">
                <Heading fontSize="md" >Creator</Heading>
              </Flex>
              <Flex flexGrow="1" paddingLeft="5%">
                  <Heading fontSize="md">Winner</Heading>
              </Flex>
                <Heading fontSize="md" paddingRight="3%"> Buy In</Heading>
            </Flex>
              {pastCoinFlips.map((coinFlip: any) => {
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
interface Props {
  coinFlip: any
}

const CoinFlip = (props: Props) => {
  return (
      <Flex 
          overflow="auto"
          border="1px solid black"
          background="#16120F"
          color="white"
          my="1%"
          py="1%"
      >
        <Flex flexGrow="1" paddingLeft="1%">
          <Heading fontSize="md" >{props.coinFlip.creatorAddress.slice(0, 23) + '...'}</Heading>
        </Flex>
          {props.coinFlip.winner !== "0x0000000000000000000000000000000000000000" ?
          <Flex flexGrow="1">
            <Heading fontSize="md">{props.coinFlip.winner.slice(0, 23) + '...'}</Heading>
          </Flex>
          :
              <Flex flexGrow="1" paddingRight="4%">
              {props.coinFlip.joineeAddress !== "0x0000000000000000000000000000000000000000" ? 
                  <Heading fontSize="md" >In Progress</Heading>
              :
                  <Heading 
                    color="green" 
                    fontSize="md" 
                    paddingRight="25px"
                  >
                    Joinable
                  </Heading>
              }
              </Flex>
          }
          <Heading fontSize="md" paddingRight="1%">{props.coinFlip.buyInPrice} eth </Heading>
      </Flex>
  )
}

                  /*<Heading className="CoinFlip-Waiting-h6"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></Heading> */