import React from 'react';
import HighRollerDeposits from '../Components/HighRollerDeposits';
import PlayersList from '../Components/PlayersList';
import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import { _abi } from '../interfaces/Eyescream_Interface';
import { _HighRoller_abi } from '../interfaces/HighRoller_Interface';
import { ethers } from 'ethers';
import "./HighRollerViewer.css";




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



declare let window: any;
export default class HighRollerViewer extends React.Component {

    state = {
        account: "",
        userTokens: [],
        gameTokens: [],
        players: []
    }


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
        if (window.ethereum){ 
            const contractAddress = window.location.pathname.split('/').at(-1);
            this.setState({
                coinFlipContractAddress: contractAddress
            })
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
            console.log(contractAddress);
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(contractAddress, _HighRoller_abi, signer);
            console.log(contract)
            const gameData = await contract.getGameInfo();
            this.setState({
                gameInfo: gameData
            })

            this.fetchNFTs(account, "userTokens"); // FETCHES USER NFTS
            this.fetchNFTs(contractAddress, "gameTokens"); // FETCHES GAME TOKENS
            const currentHighRollerContract = new ethers.Contract(contractAddress, _HighRoller_abi, signer);
            const tickets = await currentHighRollerContract.getTickets();
            console.log("TICKETS", tickets)
            const uniqueAddresses = this.getUniqueAddresses(tickets);
            this.getTickets(uniqueAddresses, tickets);
        }
    }


    render() {
        return (
            <div className="HighRollerViewer-Main-Container">
                <MenuItems account={this.state.account}/>
                <Messages/>
                <div className="HighRollers-GameInfo-Container">
                    <HighRollerDeposits tokens={this.state.gameTokens}/>
                </div>

                <div className="HighRollers-PlayerList-Container">
                    <PlayersList players={this.state.players}/>
                </div>
            </div>
        )
    }
}