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
import FAQ from "./Containers/FAQ";
import Profile from "./Containers/Profile";
import { MetaMaskUserContext } from "./utils/contexts";
import {
  StylesProvider,
  useToast,
  useStyles,
  ChakraProvider,
  extendTheme,
  useControllableProp,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext } from "react";
import { MetaMaskDataContext } from "./utils/contexts/UserDataContext";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { db } from "./firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getCurrentEthereumGasPrice, getCurrentEthereumPrice } from "./utils/EthereumStats";
import {
  collection,
  getDoc,
  setDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { url } from "node:inspector";
import { CgArrowsExpandDownLeft } from "react-icons/cg";
import MyHistory from "./Containers/MyHistory";
import Settings from "./Containers/Settings";
declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [user, setUser] = useState<string>(null);
  const [userProfile, setUserProfile]: any = useState({})
  const [network, setNetwork] = useState("")
  const [networkStats, setNetworkStats]:any = useState();
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
        console.log("HELLO", ethereumGasPrice)
        const ethereumStats = {...ethereumPrice.result, ...ethereumGasPrice.result}
        console.log("FOOOBAR", ethereumStats)
        setNetworkStats(ethereumStats)
    }

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

  const fetchUserProfile = async() => {
    if (user) {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    //const userImage = '';
    getDownloadURL(ref(storage, `${String(user)}`))
    .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        docSnap['profileImage'] = url

    })
    .catch((error) => {
        // Handle any errors
    });
      if (docSnap.exists()) {
        // Should store profile image from storage in users doc to avoid unecessary fetching
        setUserProfile(docSnap)
      }
      else {
        await setDoc(doc(db, "users", user), {
          //profileImage: url,
          id: user,
          totalWinnings: 0,
          totalDeposited: 0,
          gamesWon: 0,
          gamesLost: 0
        });
      }
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MetaMaskUserContext.Provider value={value}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/raffles" component={Raffles} />
            <Route exact path="/coin-flips" component={CoinFlips} />
            <Route exact path="/high-rollers" component={HighRollers} />
            <Route exact path="/host" component={Host} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/history" component={MyHistory}/>
            <Route path="/FAQ" component={FAQ}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/raffle/:contractAddress" component={RaffleViewer} />
            <Route
              path="/coin-flip/:contractAddress"
              component={CoinFlipViewer}
            />
            <Route
              path="/high-roller/:contractAddress"
              component={HighRollerViewer}
            />
          </BrowserRouter>
        </ChakraProvider>
      </MetaMaskUserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
