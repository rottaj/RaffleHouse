import { BrowserRouter, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Containers/Home";
import Raffles from "./Containers/Raffles";
import CoinFlips from "./Containers/CoinFlips";
import HighRollers from "./Containers/HighRollers";
import Host from "./Containers/Host";

import { MetaMaskUserContext } from "./utils/contexts";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [user, setUser] = useState<string>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [signer, setSigner] = useState<any>(null);

  const value = { user, setUser, signer, isLoadingUser, setIsLoadingUser };
  const toast = useToast();

  const checkConnectedUser = async () => {
    const provider = window.ethereum;
    const accounts = await provider.request({
      method: "eth_accounts",
    });
    if (accounts.length > 0) {
      const account = accounts[0];
      setUser(account);
    }
    setIsLoadingUser(false);
  };

  useEffect(() => {
    if (typeof window.ethereum != undefined) {
      checkConnectedUser();
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setUser(accounts[0]);
      });
    } else {
      toast({
        title: "Metamask is not installed",
        description: "Please install metamask in your browser!.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const sign = provider.getSigner();
      setSigner(sign);
      toast({
        title: "Metamask is connected",
        description: "Enjoy our games",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [user]);

  return (
    <MetaMaskUserContext.Provider value={value}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/raffles" component={Raffles} />
        <Route exact path="/coin-flips" component={CoinFlips} />
        <Route exact path="/high-rollers" component={HighRollers} />
        <Route exact path="/host" component={Host} />
        {/*         
        <Route path="/raffle/:contractAddress" component={RaffleViewer} />
        <Route path="/coin-flip/:contractAddress" component={CoinFlipViewer} />
        <Route
          path="/high-roller/:contractAddress"
          component={HighRollerViewer}
        /> */}
      </BrowserRouter>
    </MetaMaskUserContext.Provider>
  );
}

export default App;
