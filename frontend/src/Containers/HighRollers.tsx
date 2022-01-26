import { ethers } from "ethers";
import { _abi } from '../interfaces/Eyescream_Interface';
import { HighRollersAddress, _HighRollers_abi } from "../interfaces/HighRollers_Interface";
import React from 'react';
import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import NFTSelector from "../Components/NFTSelector";
import HighRollerDeposits from "../Components/HighRollerDeposits";
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

interface CurrentGame {
    contractAddress: string,
    startTime: string,
    timeLimit: string 
}



declare let window: any;
export default class HighRollers extends React.Component {

    tokenSelector: any = React.createRef() 

    state = {
        userTokens: [],
        gameTokens: [],
        currentGame: {contractAddress: "", startTime: "", timeLimit: ""},
        account: "",
        minutesLeft: "",
        secondsLeft: ""
    }

    // HANDLE USER TOKENS

    fetchNFTs = async (address: string, stateName: string) => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            var accounts = await window.ethereum.send('eth_requestAccounts');
            console.log(accounts.result[0])
            var url = ETHERSCAN_API_NFT_TXN + address + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
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
                this.getMetaData(tokens, stateName)
            })
            

        }
    }

    getMetaData = async (tokens: any, stateName: string) => {
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
                                [stateName]: ["...this.state." + stateName, tokens[i]]
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

    // END OF HANDLING USER TOKENS
    // START OF DEPOSITS

    handleDeposit = async () => {
        console.log("handle submit")
        var provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        var accounts = await window.ethereum.send('eth_requestAccounts');
        const account = accounts.result[0];
        let selectedToken = this.tokenSelector.state.selectedToken;
        const collectionContract = await new ethers.Contract(selectedToken.contractAddress, _abi, signer);
        const sendingTxn = await collectionContract.transferFrom(account, this.state.currentGame.contractAddress, selectedToken.tokenID);
    }

    // END OF DEPOSITS


    // START OF GAME INFO
    getCountDown = () => {
        let dateString: any = this.state.currentGame.startTime + this.state.currentGame.timeLimit;
        var now = new Date().getTime();
        var countDownDate = new Date(dateString).getTime();
        let distance = dateString - now;
        //console.log("NOW", now)
        //console.log("DATE STRING", dateString)
        //console.log("COUNTDOWN DATE", countDownDate)

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        //console.log("MINUTES", minutes, "SECONDS", seconds)
        this.setState({
            minutesLeft: minutes,
            secondsLeft: seconds
        })
    }

    // END OF GAME INFO


    async componentDidMount() {
        document.title = "High Rollers - Raffle House"
        if(window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.fetchNFTs(account, "userTokens"); // FETCHES USER NFTS

            this.setState({account: account});
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const HighRollersContract = new ethers.Contract(HighRollersAddress, _HighRollers_abi, signer);
            const currentHighRollerGame: any = await HighRollersContract.getCurrentGame();
            console.log("CURRENT HIGH ROLLERS GAME", currentHighRollerGame);
            // REFACTOR THIS
            var currentGame: CurrentGame = {contractAddress: currentHighRollerGame['contractAddress'], startTime: currentHighRollerGame.startTime, timeLimit: currentHighRollerGame.timeLimit}
            this.setState({
                currentGame: currentGame
            })
            this.fetchNFTs(currentGame.contractAddress, "gameTokens");
            setInterval(() => {
                this.getCountDown();
            }, 1000)
        }
    }  

    render() {
        return (
            <div className="HighRollers-Div-Main">
                <MenuItems account={this.state.account}/>
                <Messages/>
                <h3 className="HighRollers-Current-Game-h3">Current Game</h3>
                {this.state.currentGame.contractAddress ?
                    <div>
                        <h3 className="HighRollers-Current-Game-Address-h3">Contract Address: {this.state.currentGame.contractAddress}</h3>
                        <h3 className="HighRollers-Current-Game-TimeLeft-h3"> Minutes: {this.state.minutesLeft} Seconds: {this.state.secondsLeft}</h3>
                    </div>
                :
                    <h3 className="HighRollers-Current-Game-Address-h3">No Game</h3>
                }
                <div className="HighRollers-GameInfo-Container">
                    <HighRollerDeposits tokens={this.state.gameTokens}/>
                </div>

                <Button onClick={() => this.handleDeposit() }variant="contained" type="submit" style={{maxHeight: '55px'}}>
                    Deposit 
                </Button>
                <NFTSelector tokens={this.state.userTokens}  ref={(tokenSelector) => this.tokenSelector = tokenSelector}/>
            </div>
        )
    }
}