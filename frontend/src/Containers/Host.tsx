import React, { useEffect, useState } from "react";
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from "../Components/CoinFlipCreator";
import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import "./Host.css";
import Footer from "../Components/Footer";
import BaseContainer from "../Components/BaseContainers/BaseContainer";

const Host = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    document.title = "Host - Raffle House";
  }, []);

  return (
    <BaseContainer>
      <div className="Host-Container-Main-Div">
        <Messages />
        <div className="Host-Games-Container-Div">
          <RaffleCreator />
          <CoinFlipCreator />
        </div>

        {/* <Footer /> */}
      </div>
    </BaseContainer>
  );
};

export default Host;
