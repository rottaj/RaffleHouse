import { createContext, Dispatch, SetStateAction } from "react";

type MetaMaskUserContextType = {
  user: any;
  userProfile: any;
  networkStats: any;
  setNetworkStats: Dispatch<SetStateAction<any>>;
  setUserProfile: Dispatch<SetStateAction<any>>;
  setUser: Dispatch<SetStateAction<any>>;
  provider: any;
  setProvider: Dispatch<SetStateAction<any>>;
  isLoadingUser: boolean;
  setIsLoadingUser: Dispatch<SetStateAction<boolean>>;
  queryClient: any;
};

type BaseContainerContextType = {
  isSidebarOpen: boolean;
};

export const MetaMaskUserContext =
  createContext<MetaMaskUserContextType | null>(null);

export const BaseContainerContext =
  createContext<BaseContainerContextType | null>(null);
