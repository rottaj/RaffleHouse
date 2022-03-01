import { useState, useEffect } from "react";
import NFTSelector from "./NFTSelector";
import { ethers, ContractFactory } from "ethers";
import { _abi } from "../interfaces/Eyescream_Interface";
import {
  _Raffle_abi,
  _Raffle_bytecode,
} from "../interfaces/RaffleEscrow_Interface";
import { fetchNFTs } from "../utils/HandleNFTs";
import { RafflesAddress, _abi_raffles } from "../interfaces/Raffles_Interface";
import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  increment,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

declare let window: any;
const RaffleCreator = () => {
  const [tokens, setTokens]: any = useState([]);
  const [RaffleFormOpen, setRaffleFormOpen] = useState(false);

  const handleRaffleForm = () => {
    setRaffleFormOpen(!RaffleFormOpen);
  };

  useEffect(() => {
    const mountTokenData = async () => {
      var accounts = await window.ethereum.send("eth_requestAccounts");
      const account = accounts.result[0];
      fetchNFTs(account).then((data) => {
        setTokens(data);
      });
    };
    if (window.ethereum) {
      mountTokenData();
    }
  }, []);

  const handleDeposit = async ( selectedToken: any, buyInPrice: any, reservePrice: any ) => {
    if (window.ethereum) {
      console.log("BIIIITCH", selectedToken, parseFloat(buyInPrice).toFixed(2), parseFloat(reservePrice).toFixed(2))
      var accounts = await window.ethereum.send("eth_requestAccounts");
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const raffleFactory = new ContractFactory(
        _Raffle_abi,
        _Raffle_bytecode,
        signer
      ); // Initialize new Raffle
      const rafflesContract = await new ethers.Contract(
        RafflesAddress,
        _abi_raffles,
        signer
      ); // connect to Raffles Contract
      // DEPLOY CONTRACT
      const account = accounts.result[0];
      const contract = await raffleFactory.deploy(
        ethers.utils.parseEther(String((buyInPrice))),
        ethers.utils.parseEther(String((reservePrice))),
        selectedToken.contractAddress,
        selectedToken.tokenName,
        selectedToken.tokenID
      );
      await contract
        .deployed()
        .then(async function (data) {
          console.log(data);
          const collectionContract = await new ethers.Contract(
            selectedToken.contractAddress,
            _abi,
            signer
          );
          const sendingTxn = await collectionContract.transferFrom(
            account,
            contract.address,
            selectedToken.tokenID
          );
        })
        .then(async function (dataTwo) {
          console.log(dataTwo);
          await setDoc(doc(db, "raffles", contract.address), {
            creatorAddress: account, 
            contractAddress: contract.address,
            collectionAddress: selectedToken.contractAddress,
            collectionName: selectedToken.tokenName,
            tokenImage: selectedToken.image,
            tokenID: selectedToken.tokenID,
            buyInPrice: parseFloat(buyInPrice).toFixed(2),
            rservePrice: parseFloat(reservePrice).toFixed(2),
            winner: "0",
          });
        });
    }
  };



  return (
    <Flex height="100%" width="100%" justify="center">
      <Box
        height="100%"
        width="60%"
        borderRadius="20px"
        background="#161719"
        pb="60px"
        pt="40px"
        border="2px solid #31343B"
        dropShadow="2xl"
      >
        <Heading fontSize="40px" color="white">
          Create your Raffle!
        </Heading>
        <NFTSelector tokens={tokens} handleDeposit={handleDeposit} game={"raffles"}/>
      </Box>
    </Flex>
  );
};

export default RaffleCreator;
