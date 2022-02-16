import { BrowserRouter, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Containers/Home";
import Raffles from "./Containers/Raffles";
import CoinFlips from "./Containers/CoinFlips";
import HighRollers from "./Containers/HighRollers";
import Host from "./Containers/Host";
import HighRollerViewer from "./Containers/HighRollerViewer";
import CoinFlipViewer from "./Containers/CoinFlipViewer";
import RaffleViewer from "./Containers/RaffleViewer";
import { MetaMaskUserContext } from "./utils/contexts";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext } from "react";
import { MetaMaskDataContext } from "./utils/contexts/UserDataContext";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [user, setUser] = useState<string>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [provider, setProvider] = useState<any>(null);

  const value = { user, setUser, provider, setProvider, isLoadingUser, setIsLoadingUser }; 

  const toast = useToast();

  const checkConnectedUser = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length > 0) {
      const account = accounts[0];
      setUser(account);
    }
    setIsLoadingUser(false);
  };

  //const { user } = useContext(MetaMaskDataContext);

  useEffect(() => {
    if (typeof window.ethereum != undefined) {
      checkConnectedUser();
      const etherProvider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(etherProvider);
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setUser(accounts[0]);
      });

    console.log(user)
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
        <Route path="/raffle/:contractAddress" component={RaffleViewer} />
        <Route path="/coin-flip/:contractAddress" component={CoinFlipViewer} />
        <Route
          path="/high-roller/:contractAddress"
          component={HighRollerViewer}
        /> 
      </BrowserRouter>
    </MetaMaskUserContext.Provider> 
  );
}

export default App;
