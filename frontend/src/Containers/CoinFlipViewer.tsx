import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { _CoinFlip_abi } from "../interfaces/CoinFlip_Interface";
import Messages from "../Components/Messages";
import Footer from "../Components/Footer";

import {
  Box,
  Flex,
  Heading,
  Input,
  Button
} from "@chakra-ui/react"
import "../styles/CoinFlips/CoinFlipViewer.scss";
import BaseContainer from "../Components/BaseContainers/BaseContainer";

declare let window: any;
const CoinFlipViewer = () => {
  const [coinFlipContractAddress, setCoinFlipContractAddress] = useState("");
  const [gameInfo, setGameInfo]: any = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const mountCoinFlipGame = async () => {
      const contractAddress = window.location.pathname.split("/").at(-1);
      setCoinFlipContractAddress(contractAddress);
      var accounts = await window.ethereum.send("eth_requestAccounts");
      const account = accounts.result[0];
      setAccount(account);
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
        contractAddress,
        _CoinFlip_abi,
        signer
      );
      console.log(contract);
      const gameData = await contract.getGameInfo();
      setGameInfo(gameData);
    };

    if (window.ethereum) {
      mountCoinFlipGame();
    }
  }, []);

  const handleSubmit = async (e: any, contractAddress: any) => {
    e.preventDefault();
    if (window.ethereum) {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        _CoinFlip_abi,
        signer
      );
      let depositTxn = await contract.deposit({
        value: ethers.utils.parseEther(e.target[0].value).toString(),
      });
      console.log(depositTxn);
    }
  };

  return (
    <BaseContainer>
      <Box textAlign="center" alignItems="center">
        <Messages />
        <Box>
          <Heading color="rgb(255, 242, 145)" textShadow="rgb(203, 176, 204) 3px 3px" fontSize="40px">COIN FLIP</Heading>
          {gameInfo ? (
            <Box>
              <Box 
                color="white"
                background="#40434E"
                border="1px solid black"
                mx="30%"
                my={"5%"}
                borderRadius="md"
              >
                <Heading>
                  Buy in Price: {parseInt(gameInfo.buyInPrice) / 10 ** 18} eth
                </Heading>
                {gameInfo.winner !==
                "0x0000000000000000000000000000000000000000" ? (
                  <Heading>Winner: {gameInfo.winner}</Heading>
                ) : (
                  <Box>
                    {gameInfo.joineeAddress !==
                    "0x0000000000000000000000000000000000000000" ? (
                      <Box>
                        <Heading fontSize="md">Processing Winner</Heading>
                        <Box>
                          <Heading className="CoinFlipViewer-Waiting-h6">
                            <div className="lds-ellipsis">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </Heading>
                        </Box>
                      </Box>
                    ) : (
                      <Heading>Waiting for player</Heading>
                    )}
                  </Box>
                )}
              </Box>
              <Flex justifyContent="center">
                <Box 
                  px="1%"
                  color="white"
                  border="1px wolid black"
                  background="#40434E"
                  borderRadius="10px"
                >
                  <Heading fontSize="sl">Creator:</Heading>
                  <Heading fontSize="sl">{gameInfo.creatorAddress}</Heading>
                </Box>
                <Box >
                  <Heading color="white">VS</Heading>
                </Box>
                {gameInfo.joineeAddress !==
                "0x0000000000000000000000000000000000000000" ? (
                  <Box 
                    px="1%"
                    color="white"
                    background="#40434E"
                    mx="5%"
                    borderRadius="md"
                  >
                    <Heading fontSize="sl">Joinee:</Heading>
                    <Heading fontSize="sl">{gameInfo.joineeAddress}</Heading>
                  </Box>
                ) : (
                  <Box 
                    border="1px solid black"
                    background="#40434E"
                    borderRadius="md"
                  >
                    <Heading>Waiting for player</Heading>
                    <form
                      onSubmit={(e) => handleSubmit(e, coinFlipContractAddress)}
                    >
                      <Input
                        value={parseInt(gameInfo.buyInPrice) / 10 ** 18}
                      ></Input>
                      <Button type="submit">Deposit</Button> 
                    </form>
                  </Box>
                )}
              </Flex>
            </Box>
          ) : (
            "GAME DOESN'T EXIST"
          )}
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default CoinFlipViewer;
