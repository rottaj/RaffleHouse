import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Containers/Home";
import Raffles from "./Components/Games/Raffles/Raffles";
import CoinFlips from "./Components/Games/CoinFlip/CoinFlips";
import HighRollers from "./Components/Games/HighRollers/HighRollers";
import HighRollerViewer from "./Containers/HighRollerViewer";
import CoinFlipViewer from "./Components/Games/CoinFlip/CoinFlipViewer";
import RaffleViewer from "./Containers/RaffleViewer";
import FAQ from "./Containers/FAQ";
import TOS from "./Containers/TOS";
import Profile from "./Containers/Profile";
import { MetaMaskUserContext } from "./utils/contexts";
import { useToast, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ethers } from "ethers";
import { QueryClient, QueryClientProvider } from "react-query";
import { db } from "./firebase-config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getCurrentEthereumGasPrice,
  getCurrentEthereumPrice,
} from "./utils/EthereumStats";
import { getDoc, setDoc, doc } from "firebase/firestore";

import MyHistory from "./Containers/MyHistory";
import Settings from "./Containers/Settings";
import { AppRoutePaths } from "./utils/constants/routes";
declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [user, setUser] = useState<string>(null);
  const [userProfile, setUserProfile]: any = useState({});
  const [network, setNetwork] = useState("");
  const [networkStats, setNetworkStats]: any = useState();
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [provider, setProvider] = useState<any>(null);
  const queryClient = new QueryClient();
  const storage = getStorage();

  const value = {
    user,
    setUser,
    networkStats,
    setNetworkStats,
    userProfile,
    setUserProfile,
    provider,
    setProvider,
    isLoadingUser,
    setIsLoadingUser,
    queryClient,
  };

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

  useEffect(() => {
    const mountNetworkStats = async () => {
      const ethereumPrice = await getCurrentEthereumPrice();
      const ethereumGasPrice = await getCurrentEthereumGasPrice();
      console.log("HELLO", ethereumGasPrice);
      const ethereumStats = {
        ...ethereumPrice.result,
        ...ethereumGasPrice.result,
      };
      console.log("FOOOBAR", ethereumStats);
      setNetworkStats(ethereumStats);
    };

    if (typeof window.ethereum != undefined) {
      checkConnectedUser();
      const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(etherProvider);
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setUser(accounts[0]);
      });
      mountNetworkStats();
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
    fetchUserProfile();
  }, [user]);

  const theme = extendTheme({
    colors: {
      greyIsh: {
        100: "#696969",
        900: "#1c191c",
      },
    },
  });

  const fetchUserProfile = async () => {
    if (user) {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      //const userImage = '';
      getDownloadURL(ref(storage, `${String(user)}`))
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          docSnap["profileImage"] = url;
        })
        .catch((error) => {
          // Handle any errors
        });
      if (docSnap.exists()) {
        // Should store profile image from storage in users doc to avoid unecessary fetching
        setUserProfile(docSnap);
      } else {
        await setDoc(doc(db, "users", user), {
          //profileImage: url,
          id: user,
          totalWinnings: 0,
          totalDeposited: 0,
          gamesWon: 0,
          gamesLost: 0,
        });
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MetaMaskUserContext.Provider value={value}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path={AppRoutePaths.Root} element={<Home />} />
              <Route path={AppRoutePaths.Raffles} element={<Raffles />} />
              <Route path={AppRoutePaths.CoinFlips} element={<CoinFlips />} />
              <Route
                path={AppRoutePaths.HighRollers}
                element={<HighRollers />}
              />
              <Route path={AppRoutePaths.Profile} element={<Profile />} />
              <Route path={AppRoutePaths.History} element={<MyHistory />} />
              <Route path={AppRoutePaths.FAQ} element={<FAQ />} />
              <Route path={AppRoutePaths.Settings} element={<Settings />} />
              <Route path={AppRoutePaths.TOS} element={<TOS />} />
              <Route
                path={AppRoutePaths.RaffleViewer}
                element={<RaffleViewer />}
              />
              {/* <Route
              path="/coin-flip/:contractAddress"
              element={<CoinFlipViewer />}
            /> */}
              {/* <Route
                path="/high-roller/:contractAddress"
                element={<HighRollerViewer />}
              /> */}
              <Route
                path="*"
                element={<Navigate replace to={AppRoutePaths.Root} />}
              />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </MetaMaskUserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
