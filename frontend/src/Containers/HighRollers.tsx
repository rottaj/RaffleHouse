import { ethers } from "ethers";
import { _abi } from '../interfaces/Eyescream_Interface';
import React from 'react';
import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import NFTSelector from "../Components/NFTSelector";
import Button from '@mui/material/Button';
import "./HighRollers.css";



const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI';


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
export default class HighRollers extends React.Component {

    tokenSelector: any = React.createRef() 

    state = {
        tokens: [],
        account: ""
    }



    fetchNFTs = async () => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            var accounts = await window.ethereum.send('eth_requestAccounts');
            console.log(accounts.result[0])
            var url = ETHERSCAN_API_NFT_TXN + accounts.result[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
            fetch(url).then(res => {
                return res.json();
            })
            .then(data => {
                var tokens: Token[] = []

                for (let i=0; i<=data.result.length; i++ ) {
                    if (tokens.length > 0) {
                        try {
                            //let x: any = tokens.find(token => token['tokenID'] !== data.result[i]['tokenID'])
                            let index = tokens.findIndex(temp => temp['tokenID'] === data.result[i]['tokenID']);
                            if (index === -1) {
                                tokens.push(data.result[i])
                            } else {
                                tokens.splice(index, 1)
                            }
                        } 
                        catch(err) {
                            console.log(err)
                        }
                    }
                    else {
                        tokens.push(data.result[i])
                    }
                }
                console.log("TOKENS", tokens)
                this.getMetaData(tokens)
            })
            

        }
    }

    getMetaData = async (tokens: any) => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            for (let i=0; i<=tokens.length; i++ ) {
                try {
                    if (String(tokens[i].contractAddress) === '0x8f44a8b9059b2bc914c893eed250a2e1097ee187') { // THIS IS EYESCREAM ADDRESS (UPDATE THIS !!!)
                        let contract = new ethers.Contract(tokens[i].contractAddress, _abi, signer)
                        let metaData = await contract.tokenURI(parseInt(tokens[i].tokenID))
                        console.log("METADATA", metaData)
                        fetch(metaData).then(res => {return res.json()}).then(data => {
                            tokens[i]['image'] = data.image
                            this.setState({
                                //tokens: this.state.tokens.filter(tempToken => tempToken['tokenID'] !== tokens[i].tokenID)
                                tokens: [...this.state.tokens, tokens[i]]
                            })
                        })
                    }
                }
                catch(err) {
                    console.log(err)
                }
            }

        }
    }

    handleSubmit = () => {
        console.log("handle submit")
        console.log(this.tokenSelector.state.selectedToken)
    }




    async componentDidMount() {
        document.title = "High Rollers - Raffle House"
        if(window.ethereum) {
            this.fetchNFTs();
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
        }
    }  

    render() {
        return (
            <div className="HighRollers-Div-Main">
                <MenuItems account={this.state.account}/>
                <Messages/>
                <h3 className="HighRollers-Current-Game-h3">Current Game</h3>
                <div className="HighRollers-GameInfo-Container">

                </div>

                <Button onClick={() => this.handleSubmit() }variant="contained" type="submit" style={{maxHeight: '55px'}}>
                    Deposit 
                </Button>
                <NFTSelector tokens={this.state.tokens}  ref={(tokenSelector) => this.tokenSelector = tokenSelector}/>
            </div>
        )
    }
}