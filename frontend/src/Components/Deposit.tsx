import React from "react";
import { ethers } from "ethers";
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Deposit.css";

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
    <div className="Deposit-Container-Main">
      {props.isDepositOpen && (
        <div className="Deposit-PopUp-Form">
          <h3 className="Deposit-To-Win-h3">
            Deposit to win {props.tokenMetaData.tokenName} #
            {props.tokenMetaData.tokenID}!
          </h3>
          <form className="Deposit-Form" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              defaultValue="0.08"
              id="filled-basic"
              label="Deposit"
              variant="outlined"
              sx={{ input: { color: "white" } }}
            ></TextField>
            {/* <Button variant="contained" type="submit" style={{maxHeight: '55px'}}>
                            Submit Deposit
                        </Button> */}
          </form>
        </div>
      )}
    </div>
  );
};

export default RaffleDeposit;
