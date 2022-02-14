import { ethers } from "ethers";
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
import {
  Box,
  Input,
  Button,
  Heading
} from "@chakra-ui/react"

interface Props {
  isDepositOpen: boolean;
  tokenMetaData: any;
  raffleContractAddress: string;
}

declare let window: any;
const RaffleDeposit = (props: Props) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const raffleContract = await new ethers.Contract(
        props.raffleContractAddress,
        _Raffle_abi,
        signer
      );
      console.log(
        "TESTING DEPOSIT>> TICKETS",
        parseInt((parseFloat(e.target[0].value) / 0.01).toString())
      );
      const depositTxn = await raffleContract.deposit(
        parseInt((parseFloat(e.target[0].value) / 0.01).toString()),
        {
          value: ethers.utils.parseEther(e.target[0].value),
        }
      );
    }
  };

  return (
    <Box>
      <Box>
        <Heading 
          color="rgb(255, 242, 145)"
          textShadow="rgb(203, 176, 204) 3px 3px"
          fontSize="20px"
        >
          Deposit to win {props.tokenMetaData.tokenName} #
          {props.tokenMetaData.tokenID}!
        </Heading>
        <form  onSubmit={(e) => handleSubmit(e)}>
          <Input
            defaultValue="0.08"
            id="filled-basic"
            sx={{ input: { color: "white" } }}
          ></Input>
          <Button sx={{maxHeight: '55px'}}>Submit Deposit</Button>
        </form>
        </Box>
    </Box>
  );
};

export default RaffleDeposit;
