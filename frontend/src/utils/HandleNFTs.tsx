import { ethers } from "ethers";
import { _abi } from "../interfaces/Eyescream_Interface";

const ETHERSCAN_API_NFT_TXN =
  "https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=";
const ETHERSCAN_API_ABI =
  "https://api.etherscan.io/api?module=contract&action=getabi&address=";
//&apikey=YourApiKeyToken
const ETHERSCAN_API_KEY = "FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI";

interface Token {
  blockHash: string;
  blockNumber: number;
  confirmations: number;
  contractAddress: string;
  cumulativeGasUsed: number;
  from: string;
  gas: number;
  gasPrice: number;
  gasUsed: number;
  hash: string;
  image: string;
  input: string;
  nonce: number;
  timeStamp: number;
  to: string;
  tokenDecimal: number;
  tokenID: number;
  tokenName: string;
  tokenSymbol: string;
  transactionIndex: number;
}

declare let window: any;

const fetchNFTs = async (address: string) => {
  const url =
    ETHERSCAN_API_NFT_TXN +
    address +
    "&startblock=0&endblock=999999999&sort=asc&apikey=" +
    ETHERSCAN_API_KEY;
  var tokens: Token[] = [];
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i = 0; i <= data.result.length; i++) {
        if (tokens.length > 0) {
          if (data.result[i]) {
            let index = tokens.findIndex(
              (temp) =>
                temp["tokenID"] === data.result[i]["tokenID"] &&
                temp["contractAddress"] === data.result[i]["contractAddress"]
            );
            if (index === -1) {
              tokens.push(data.result[i]);
            } else {
              tokens.splice(index, 1);
            }
          }
        } else {
          tokens.push(data.result[i]);
        }
      }
    });

  const data = await getMetaData(tokens);

  return data;
};

const getMetaData = async (tokens: any) => {
  var provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  for (let i = 0; i <= tokens.length; i++) {
    if (tokens[i]) {
      const contract = new ethers.Contract(
        tokens[i].contractAddress,
        _abi,
        signer
      );
      const metaData = await contract.tokenURI(parseInt(tokens[i].tokenID));
      await fetch(metaData)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.image.startsWith("ipfs://")) {
            tokens[i]["image"] = "https://ipfs.io/ipfs" + data.image.slice(6);
            console.log(tokens[i]["image"]);
          } else {
            tokens[i]["image"] = data.image;
          }
        })
        .catch((err) => console.log(err));
    }
  }
  return tokens;
};

export default fetchNFTs;

export const fetchHighRollersPot = async (address: string) => {
  const url =
    ETHERSCAN_API_NFT_TXN +
    address +
    "&startblock=0&endblock=999999999&sort=asc&apikey=" +
    ETHERSCAN_API_KEY;
  var tokens: Token[] = [];
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i = 0; i <= data.result.length; i++) {
        if (tokens.length > 0) {
          if (data.result[i]) {
            let index = tokens.findIndex(
              (temp) =>
                temp["tokenID"] === data.result[i]["tokenID"] &&
                temp["contractAddress"] === data.result[i]["contractAddress"]
            );
            if (index === -1) {
              tokens.push(data.result[i]);
            }
          }
        } else {
          tokens.push(data.result[i]);
        }
      }
    });

  const data = await getMetaData(tokens);

  return data;
};

