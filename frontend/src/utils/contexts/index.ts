import { createContext, Dispatch, SetStateAction } from "react";

type MetaMaskUserContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  signer: any;
  isLoadingUser: boolean;
  setIsLoadingUser: Dispatch<SetStateAction<boolean>>;
};
export const MetaMaskUserContext =
  createContext<MetaMaskUserContextType | null>(null);
