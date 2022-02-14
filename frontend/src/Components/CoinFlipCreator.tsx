import { ethers, ContractFactory } from "ethers";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../interfaces/CoinFlip_Interface";
import {
  CoinFlipAddress,
  _CoinFlips_abi,
} from "../interfaces/CoinFlips_Interface";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button
} from "@chakra-ui/react"

declare let window: any;
const CoinFlipCreator = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("HANDLE SUBMIT", e.target);
    if (window.ethereum) {
      var accounts = await window.ethereum.send("eth_requestAccounts");
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const CoinFlipFactory = new ContractFactory(
        _CoinFlip_abi,
        _CoinFlip_bytecode,
        signer
      ); // Initialize new Raffle
      const coinFlipsContract = await new ethers.Contract(
        CoinFlipAddress,
        _CoinFlips_abi,
        signer
      ); // connect to Raffles Contract
      // DEPLOY CONTRACT
      const account = accounts.result[0];
      const contract = await CoinFlipFactory.deploy(
        ethers.utils.parseEther(parseFloat(e.target[0].value).toFixed(1))
      ); // FIX THIS not parseInt
      await contract.deployed().then(async function (data) {
        console.log(data);
        const depositTxn = contract
          .deposit({
            value: ethers.utils.parseEther(e.target[0].value.toString()),
          })
          .then(async function () {
            const addCoinFlipsTxn = coinFlipsContract.addCoinFlip(
              contract.address,
              ethers.utils.parseEther(parseFloat(e.target[0].value).toFixed(1))
            );
            console.log("COINFLIPS TXN", addCoinFlipsTxn);
          });
      });
    }
  };

  return (
    <Box height="auto" width="auto">
      <Box 
        height="100%"
        width="70%"
        marginTop="5%"
        marginLeft="10%"
        borderRadius="20px"
        background="#40434E"
        overflowY="scroll"
      >
        <Heading 
          paddingLeft="1%;"
          color="rgb(255, 242, 145)"
          textShadow="rgb(203, 176, 204) 3px 3px"
          fontSize="40px" 
        >
          Host a CoinFlip Game!
        </Heading>
        <Flex >
          <Heading 
            paddingLeft="1%;"
            color="rgb(255, 242, 145)"
            textShadow="rgb(203, 176, 204) 3px 3px"
            fontSize="40px" 
          >
            Minimum Buy in: 
          </Heading>
          <form
            className="CreateCoinFlip-Form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              defaultValue="0.08"
            ></Input> 
            <Button type="submit">Create Game</Button>
          </form>
        </Flex>
      </Box>
    </Box>
  );
};

export default CoinFlipCreator;
