import { ethers } from "ethers";
import { _abi } from '../interfaces/Eyescream_Interface';
import { HighRollersAddress, _HighRollers_abi } from "../interfaces/HighRollers_Interface";
import { _HighRoller_abi } from "../interfaces/HighRoller_Interface";
import React from 'react';
import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import NFTSelector from "../Components/NFTSelector";
import PlayerList from "../Components/PlayersList";
import HighRollerDeposits from "../Components/HighRollerDeposits";
import PastHighRollerGames from "./PastHighRollerGames";
import Footer from "../Components/Footer";
import Button from '@mui/material/Button';
import "./HighRollers.css";
import { listItemSecondaryActionClasses } from "@mui/material";



const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_ABI = 'https://api.etherscan.io/api?module=contract&action=getabi&address='
//&apikey=YourApiKeyToken
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
    endTime: string, 
    winner: string
}



declare let window: any;
export default class HighRollers extends React.Component {

    tokenSelector: any = React.createRef() 

    state = {
        userTokens: [],
        gameTokens: [],
        players: [],
        currentGame: {contractAddress: "", startTime: "", endTime: "", winner: ""},
        account: "",
        minutesLeft: 0,
        secondsLeft: 0
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
            var url = ETHERSCAN_API_NFT_TXN + address + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
            fetch(url).then(res => {
                return res.json();
            })
            .then(data => {
                var tokens: Token[] = []

                for (let i=0; i<=data.result.length; i++ ) {
                    if (tokens.length > 0) {
                        if (data.result[i]) {
                            let index = tokens.findIndex(temp => (temp['tokenID'] === data.result[i]['tokenID']) && (temp['contractAddress'] === data.result[i]['contractAddress']));
                            if (index === -1) {
                                tokens.push(data.result[i])
                            } else {
                                tokens.splice(index, 1)
                            }
                        }
                    }
                    else {
                        tokens.push(data.result[i])
                    }
                }
                this.getMetaData(tokens, stateName);
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
                if (tokens[i]) {
                    //if (String(tokens[i].contractAddress) === '0x8f44a8b9059b2bc914c893eed250a2e1097ee187') { // THIS IS EYESCREAM ADDRESS (UPDATE THIS !!!)
                        let contract = new ethers.Contract(tokens[i].contractAddress, _abi, signer)
                        let metaData = await contract.tokenURI(parseInt(tokens[i].tokenID))
                        fetch(metaData).then(res => {return res.json()}).then(data => {
                            tokens[i]['image'] = data.image
                            if (stateName === "userTokens") {
                                this.setState({
                                    userTokens: [...this.state.userTokens, tokens[i]]
                                })
                            } 
                            else if (stateName === "gameTokens") {
                                this.setState({
                                    gameTokens: [...this.state.gameTokens, tokens[i]]
                                })
                            }
                        }).catch((err) => console.log(err))

                    //}
                }
            }

        }
    }



    // END OF HANDLING USER TOKENS
    // START OF DEPOSITS

    handleDeposit = async () => {
        var provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        var accounts = await window.ethereum.send('eth_requestAccounts');
        const account = accounts.result[0];
        let selectedToken = this.tokenSelector.state.selectedToken;
        const collectionContract = await new ethers.Contract(selectedToken.contractAddress, _abi, signer);
        const sendingTxn = await collectionContract.transferFrom(account, this.state.currentGame.contractAddress, selectedToken.tokenID);
        sendingTxn.wait();
        if (sendingTxn) {
            const requestParameters = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tickets: selectedToken.tokenPrice, playerAddress: account, tokenURI: selectedToken.image }) // CREATE REQUEST BODY ( WILL ADD CONTRACT ADDRESS + TOKEN ID FOR BACKEND AUTH)
            };
            fetch('http://127.0.0.1:8080/submit-tickets-high-rollers', requestParameters).then(res => { // FETCH TO HIGHROLLER API
                return res.json()
            }).then(data => {
                console.log(data)
            })
        }

    }

    // END OF DEPOSITS


    // START OF GAME INFO
    getCountDown = () => {
        let dateString: any = parseInt(this.state.currentGame.endTime);
        var now = new Date().getTime();
        var countDownDate = new Date(dateString).getTime();
        var minutes  = parseInt(String((countDownDate - (now) / 1000) / 60))
        var seconds = parseInt(String(((countDownDate - (now / 1000)) - (parseInt(String(minutes)) * 60))))
        if (minutes <= 0) {
            minutes = 0
        }
        if (seconds <= 0) {
            seconds = 0
        }
        this.setState({
            minutesLeft: minutes,
            secondsLeft: seconds
        })
    }

    // END OF GAME INFO


    getUniqueAddresses(array: any) {
        let unique = array.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i);
        return unique;
    }

    getOccurances(array: any, val: any) {
        let ticketNumber = array.reduce((a: any, v: any) => (v === val ? a + 1 : a), 0);
        return ticketNumber;
    }

    getTickets = async (uniqueAddresses: any, tickets: any) => {
        console.log(tickets)
        for (let i=0; i<=uniqueAddresses.length; i++ ) {
            let ticketNumber = this.getOccurances(tickets, uniqueAddresses[i])
            if (uniqueAddresses[i] !== undefined) {
                console.log("TESTING GET_TICKETS", uniqueAddresses[i], ticketNumber, (ticketNumber).toFixed(2))
                let player = {address: uniqueAddresses[i], tickets: ticketNumber, totalEth: (ticketNumber).toFixed(2), chance: ((ticketNumber / tickets.length) * 100).toFixed(2)}
                this.setState({
                    players: [...this.state.players, player]
                })
            }
        }

    }




    async componentDidMount() {
        document.title = "High Rollers - Raffle House"
        if(window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const HighRollersContract = new ethers.Contract(HighRollersAddress, _HighRollers_abi, signer);
            const currentHighRollerGame: any = await HighRollersContract.getCurrentGame();
            // REFACTOR THIS
            var currentGame: CurrentGame = {contractAddress: currentHighRollerGame['contractAddress'], startTime: currentHighRollerGame.startTime, endTime: currentHighRollerGame.endTime, winner: currentHighRollerGame.winner}
            this.setState({
                currentGame: currentGame
            })
            this.fetchNFTs(account, "userTokens"); // FETCHES USER NFTS
            this.fetchNFTs(currentGame.contractAddress, "gameTokens"); // FETCHES GAME TOKENS
            const currentHighRollerContract = new ethers.Contract(currentGame.contractAddress, _HighRoller_abi, signer);
            const tickets = await currentHighRollerContract.getTickets();
            console.log("TICKETS", tickets)
            const uniqueAddresses = this.getUniqueAddresses(tickets);
            this.getTickets(uniqueAddresses, tickets);
            var interval = setInterval(() => {
                this.getCountDown();
                //console.log("SESSION USERTOKENS", JSON.parse(sessionStorage.userTokens))
            }, 1000)
        }
    }


    render() {
        return (
            <div className="HighRollers-Div-Main">
                <MenuItems account={this.state.account}/>
                <Messages/>
                <h3 className="HighRollers-Current-Game-h3">HIGH ROLLERS</h3>
                {this.state.currentGame.contractAddress ?
                    <div>
                        <h3 className="HighRollers-Current-Game-Address-h3">Current Game: {this.state.currentGame.contractAddress}</h3>
                        {this.state.currentGame.winner !== "0x0000000000000000000000000000000000000000" ?
                            <h3 className="HighRollers-Current-Game-Winner-Address-h3">Winner: {this.state.currentGame.winner}</h3>
                        :    
                            <div> 
                                <h3 className="HighRollers-Current-Game-Winner-Address-h3">Game in Progress</h3>
                                <h6 className="CoinFlip-Waiting-h6"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></h6>
                            </div>
                        }
                        <h3 className="HighRollers-Current-Game-TimeLeft-h3"> {this.state.minutesLeft} Minutes {this.state.secondsLeft} Seconds </h3>
                    </div>
                :
                    <h3 className="HighRollers-Current-Game-Address-h3">No Game</h3>
                }
  
                <div className="HighRollers-GameInfo-Container">
                    <HighRollerDeposits tokens={this.state.gameTokens}/>
                </div>

                <div className="HighRollers-PlayerList-Container">
                    <PlayerList players={this.state.players}/>
                </div>
                <Button onClick={() => this.handleDeposit() }variant="contained" type="submit" style={{maxHeight: '55px'}}>
                    Deposit 
                </Button>
                <NFTSelector tokens={this.state.userTokens}  ref={(tokenSelector) => this.tokenSelector = tokenSelector}/>
                <PastHighRollerGames/>
                <Footer/>
            </div>
        )
    }
}