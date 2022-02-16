import { ethers, ContractFactory } from "ethers";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../interfaces/CoinFlip_Interface";
import {
  CoinFlipAddress,
  _CoinFlips_abi,
} from "../interfaces/CoinFlips_Interface";
const CreateCoinFlipGame = async (buyInPrice: number) => {
    if (window.ethereum) {
      var accounts = await window.ethereum.send("eth_requestAccounts");
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const CoinFlipFactory = new ContractFactory(
        _CoinFlip_abi,
        _CoinFlip_bytecode,
        signer
      ); 
      const coinFlipsContract = await new ethers.Contract(
        CoinFlipAddress,
        _CoinFlips_abi,
        signer
      ); 
      // DEPLOY CONTRACT
      const account = accounts.result[0];
      const contract = await CoinFlipFactory.deploy(
        ethers.utils.parseEther(buyInPrice.toFixed(2))
      ); 
      await contract.deployed().then(async function (data) {
        console.log(data);
        const depositTxn = contract
          .deposit({
            value: ethers.utils.parseEther(buyInPrice.toFixed(2).toString()),
          })
          .then(async function () {
            const addCoinFlipsTxn = coinFlipsContract.addCoinFlip(
              contract.address,
              ethers.utils.parseEther(buyInPrice.toFixed(2))
            );
            console.log("COINFLIPS TXN", addCoinFlipsTxn);
          });
      });
    }
}

export default CreateCoinFlipGame