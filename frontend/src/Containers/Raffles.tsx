import React, { useEffect, useState } from "react";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { RafflesAddress, _abi_raffles } from "../interfaces/Raffles_Interface";
import { _Raffle_abi } from "../interfaces/RaffleEscrow_Interface";
// import { Grid } from "@mui/material";
import MenuItems from "../Components/MenuItems";
import Footer from "../Components/Footer";
import Messages from "../Components/Messages";

import "./Raffles.css";
import BaseContainer from "../Components/BaseContainers/BaseContainer";

declare let window: any;
const Raffles = () => {
  const [currentRaffles, setCurrentRaffles]: any = useState([]);
  const [pastRaffles, setPastRaffles]: any = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    document.title = "Raffles - Raffle House";
    // const getAccount = async () => {
    //   var accounts = await window.ethereum.send("eth_requestAccounts");
    //   const account = accounts.result[0];
    //   setAccount(account);
    // };
    // if (window.ethereum) {
    //   getAccount();
    //   getRaffles();
    // }
  }, []);

  const getRaffles = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const rafflesContract = await new ethers.Contract(
        RafflesAddress,
        _abi_raffles,
        signer
      );
      let rafflesLength = await rafflesContract.getRaffles();
      for (let i = 0; i <= rafflesLength - 1; i++) {
        let raffle = await rafflesContract.getRaffleByIndex(i);
        const raffleInstance = await new ethers.Contract(
          raffle.contractAddress,
          _Raffle_abi,
          signer
        );
        const gameInfo = await raffleInstance.getGameInfo();
        var tempRaffle: any = {
          contractAddress: raffle.contractAddress,
          tokenImage: raffle.tokenImage,
          creatorAddress: gameInfo.creatorAddress,
          buyInPrice: parseInt(gameInfo.buyInPrice, 16),
          winner: gameInfo.winner,
          collectionName: gameInfo.collectionName,
          tokenID: parseInt(gameInfo.tokenID, 16),
        };
        if (gameInfo.winner === "0x0000000000000000000000000000000000000000") {
          // Will update when refactor Raffles contract
          setCurrentRaffles((currentRaffles: any) => [
            ...currentRaffles,
            tempRaffle,
          ]);
        } else {
          setPastRaffles((pastRaffles: any) => [...pastRaffles, tempRaffle]);
        }
      }
    }
  };

  return (
    <BaseContainer>
      <div className="Raffles-container-main">
        {/* <Header/> */}
        {console.log("TESTING", currentRaffles.length)}
        {/* <MenuItems account={account} /> */}
        <Messages />
        <div className="Raffles-title-container">
          <h1 className="Raffles-Title-h1">Current Raffles</h1>
        </div>
        <div className="Raffles-Viewer-Main">
          {/* <Grid container spacing={2}> */}
          {currentRaffles.map((raffle: any) => {
            return (
              <Link to={`raffle/${raffle["contractAddress"]}`}>
                <div className="Raffle-Div-Main-Container">
                  {/* <Grid item xs={8}> */}
                  {/* <Raffle token={raffle} /> */}
                  {/* </Grid> */}
                </div>
              </Link>
            );
          })}
          {/* </Grid> */}
        </div>
        <div></div>
        <div className="PastRaffles-Viewer-Main">
          <div className="PastRaffles-title-container">
            <h1 className="PastRaffles-Title-h1">Past Raffles</h1>
          </div>
          {/* <Grid className="PastRaffles-Grid-Container" container spacing={2}> */}
          {pastRaffles.map((raffle: any) => {
            return (
              <Link to={`raffle/${raffle["contractAddress"]}`}>
                <div className="PastRaffle-Div-Main-Container">
                  {/* <Grid className="PastRaffle-Grid-Item" item xs={8}> */}
                  <Raffle token={raffle} />
                  {/* </Grid> */}
                </div>
              </Link>
            );
          })}
          {/* </Grid> */}
        </div>
        {/* <Footer /> */}
      </div>
    </BaseContainer>
  );
};
export default Raffles;

interface Props {
  token: any;
}

const Raffle = (props: Props) => {
  return (
    <div className="Raffle-Div-Main">
      <img className="Raffle-Img" src={props.token.tokenImage}></img>
      <div className="Raffle-Div-Info">
        <div className="Raffle-Collection-Div">
          <h3 className="Raffle-CollionName-h3">
            {props.token.collectionName}
          </h3>
          <h3> #</h3>
          <h3>{props.token.tokenID}</h3>
          {/* <CheckCircleIcon className="Verified-Icon" /> */}
        </div>
        <h5>BUY IN PRICE: {props.token.buyInPrice} eth</h5>
      </div>
    </div>
  );
};
