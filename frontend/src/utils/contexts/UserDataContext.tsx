import { ethers } from "ethers";
import { useEffect } from "react";
import { createContext, useState, Dispatch, SetStateAction } from "react";

type MetaMaskUserContextType = {
    user: any;
    provider: any;
    isLoadingUser: boolean;
    connectWallet: any
    isLoadingConnect: any

    //setUser: Dispatch<SetStateAction<any>>;
    //setProvider: Dispatch<SetStateAction<any>>;
    //setIsLoadingUser: Dispatch<SetStateAction<boolean>>;

  };

export const MetaMaskDataContext = createContext<MetaMaskUserContextType>({
    user: '',
    provider: {},
    isLoadingUser: false,
    isLoadingConnect: false,
    connectWallet() {},
});

export const MetaMaskDataProvider = ({children}) => {
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [isLoadingConnect, setIsLoadingConnect] = useState(false)
    const [user, setUser]: any = useState();
    const [provider, setProvider]:any = useState();

    const connectWallet = async () => {
        if (window.ethereum) {
            setIsLoadingConnect(true);
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            const account = accounts.result[0];
            setUser(account)
            setIsLoadingUser(false);
        }
    }

    const checkConnectedUser = async () => {
        console.log("CHECKING CONNECT USER")
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
        console.log("TESTING")
        if (window.ethereum) {
            checkConnectedUser();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider)
        }
    }, [])
   
    
    return (
        <MetaMaskDataContext.Provider
            value={{
                connectWallet,
                user,
                provider,
                isLoadingUser,
                isLoadingConnect
            }}
        >
            {children}
        </MetaMaskDataContext.Provider>
    )
}