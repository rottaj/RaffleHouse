import { ethers, ContractFactory } from "ethers";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../interfaces/CoinFlip_Interface";
import {
  CoinFlipAddress,
  _CoinFlips_abi,
} from "../interfaces/CoinFlips_Interface";


export const createCoinFlipGame = async (buyInPrice: number) => {
  var provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const CoinFlipFactory = new ContractFactory(
    _CoinFlip_abi,
    _CoinFlip_bytecode,
    signer
  ); 
  // DEPLOY CONTRACT
  const contract = await CoinFlipFactory.deploy(
    ethers.utils.parseEther(buyInPrice.toFixed(2))
  ); 
  await contract.deployed()
  return contract;
}

export const sendTransactionToCoinFlips = async (contract, buyInPrice) => {
  const depositTxn = await contract.deposit({
      value: ethers.utils.parseEther(buyInPrice.toFixed(2).toString()),
    })

}

export const addCoinFlipToGames = async (contract, buyInPrice) => {
  var provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const coinFlipsContract = await new ethers.Contract(
    CoinFlipAddress,
    _CoinFlips_abi,
    signer
  ); 
  const addCoinFlipsTxn = coinFlipsContract.addCoinFlip(
    contract.address,
    ethers.utils.parseEther(buyInPrice.toFixed(2))
  );
  console.log("COINFLIPS TXN", addCoinFlipsTxn);

}

//export default CreateCoinFlipGame
