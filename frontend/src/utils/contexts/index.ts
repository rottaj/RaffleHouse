import { createContext, Dispatch, SetStateAction } from "react";

type MetaMaskUserContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  provider: any;
  setProvider: Dispatch<SetStateAction<any>>;
  isLoadingUser: boolean;
  setIsLoadingUser: Dispatch<SetStateAction<boolean>>;
  queryClient: any;
};
export const MetaMaskUserContext =
  createContext<MetaMaskUserContextType | null>(null);
