import { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import NFT from "../../NFT";
import { ethers, ContractFactory } from "ethers";
import { _abi } from "../../../interfaces/Eyescream_Interface";
import {
  _Raffle_abi,
  _Raffle_bytecode,
} from "../../../interfaces/RaffleEscrow_Interface";
import { fetchNFTs } from "../../../utils/HandleNFTs";
import {
  Box, 
  Flex,
  Heading, 
  SimpleGrid, 
  Input, 
  Button,
  Skeleton } from "@chakra-ui/react";
import { db } from "../../../firebase-config";
import {
  setDoc,
  doc,
} from "firebase/firestore";
import { MetaMaskUserContext } from "../../../utils/contexts";

declare let window: any;
const RaffleCreator = () => {
  const [tokens, setTokens]: any = useState([]);
  const {user: account, isLoadingUser } = useContext(MetaMaskUserContext);


  useEffect(() => {
    const mountTokenData = async () => {

    };
    if (window.ethereum) {
      mountTokenData();
    }
  }, []);

  const getUserData = async () => {
      const userToks = await fetchNFTs(account);
      return {userTokens: userToks}

  }

  const { data, isLoading, isSuccess }: any = useQuery(
    `${account}raffles`,
    () => getUserData(),
    {
      enabled: !isLoadingUser && Boolean(account),
      staleTime: Infinity,
    }
  );

  const handleDeposit = async ( selectedToken: any, buyInPrice: any, reservePrice: any ) => {
    if (window.ethereum) {
      var accounts = await window.ethereum.send("eth_requestAccounts");
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const raffleFactory = new ContractFactory(
        _Raffle_abi,
        _Raffle_bytecode,
        signer
      ); // Initialize new Raffle
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
        {isLoading || !isSuccess ? 
            <Box>
              <Skeleton w="200px" h="30px">
                Loading
              </Skeleton>
            </Box>
          :
          <SimpleGrid minChildWidth="90px" spacing="8px" px="20px">
            {console.log(data?.userTokens)}
            {data?.userTokens.map((token, index) => (
              <Box key={index}>
                <NFT
                  token={token}
                  handleDeposit={handleDeposit}
                  game={"raffles"}
                />
              </Box>
            ))}
          </SimpleGrid>
        }
      </Box>
    </Flex>
  );
};

export default RaffleCreator;
