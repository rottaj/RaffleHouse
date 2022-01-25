import { ethers } from 'ethers';
import { _abi } from "../interfaces/Eyescream_Interface";
import { _Raffle_abi } from '../interfaces/RaffleEscrow_Interface';
import React from 'react';
import MenuItems from '../Components/MenuItems';
import Deposit from "../Components/Deposit";
import PlayersList from "../Components/PlayersList";
import WinnerBox from "../Components/WinnerBox";
import Messages from "../Components/Messages";
import Button from '@mui/material/Button';
import Header from './Header';
import Footer from '../Components/Footer';


import "./RaffleViewer.css";
const ETHERSCAN_API_NFT_TXN = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'JPARDRW9CAVF9ZKISWVC3YYM6RP93JNQUC';

/*
            The reason for this shenanigans is RaffleViewer is not a child component.. so no props. ( getting contract address from path :shit: )
            We are fetching all token info... again.
*/


declare let window: any;
export default class RaffleViewer extends React.Component {


    state: any = {
        tokenMetaData: {},
        isDepositOpen: false,
        raffleContractAddress: "",
        raffleBalance: 0,
        players: [],
        gameInfo: [],
        account: ""
    }

    fetchNFTs = async (contractAddress: any) => {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            var url = ETHERSCAN_API_NFT_TXN + contractAddress + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
            console.log(url)
            fetch(url)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(data => {
                this.getMetaData(data.result[0]) // POTENTIAL FIX IS PROBALY GOOD
            })

        }
    }

    getMetaData = async (token: any) => {
        console.log(token)
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // var url = ETHERSCAN_API_ABI + token.address + ABI_KEY
            //var abi = fetch (url) // get verified contract abi
            // PERFORM FETCH ABI REQUEST ON VERIFIED CONTRACT
            //console.log(token.contractAddress, address)
            try {
                if (String(token.contractAddress) === '0x8f44a8b9059b2bc914c893eed250a2e1097ee187') { // THIS IS EYESCREAM ADDRESS (UPDATE THIS !!!)
                    let contract = new ethers.Contract(token.contractAddress, _abi, signer)
                    console.log(token.contractAddress)
                    let metaData = await contract.tokenURI(parseInt(token.tokenID))
                    fetch(metaData).then(res => {return res.json()}).then(data => {
                        token['image'] = data.image
                        this.setState({
                            tokenMetaData: token
                        })
                    })
                }
            }
            catch(err) {
                console.log(err)
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
                console.log("TESTING GET_TICKETS", uniqueAddresses[i], ticketNumber, (ticketNumber * 0.01).toFixed(2))
                let player = {address: uniqueAddresses[i], tickets: ticketNumber, totalEth: (ticketNumber * 0.01).toFixed(2), chance: ((ticketNumber / tickets.length) * 100).toFixed(2)}
                this.setState({
                    players: [...this.state.players, player]
                })
            }
        }

    }

    handleDepositClicked = () => {
        this.setState({
            isDepositOpen: !this.state.isDepositOpen
        })
    }


    async componentDidMount() {
        const contractAddress = window.location.pathname.split('/').at(-1);
        this.setState({
            raffleContractAddress: contractAddress
        })
        console.log(contractAddress);
        this.fetchNFTs(contractAddress); // refactor (can do this later)

        var provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(contractAddress, _Raffle_abi, signer);
        const gameInfo = await contract.getGameInfo()
        this.setState({
            gameInfo: gameInfo
        })
        const tickets = await contract.getTickets();
        const uniqueAddresses = this.getUniqueAddresses(tickets);
        this.getTickets(uniqueAddresses, tickets);
        if(window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
        }
    }


    render() {
        return (
            <div className="RaffleViewer-Div-Main">
                {/* <Header/> */}
                <MenuItems account={this.state.account}/>
                <Messages/>
                <WinnerBox winner={this.state.gameInfo.winner}/>
                {console.log("GAME INNFO", this.state.gameInfo)}
                <div className="RaffleViewer-Viewer-Container">
                    <div className="Token-Image-Div">
                        <img className="Token-Image"src={this.state.tokenMetaData.image}></img>
                        <Button onClick={this.handleDepositClicked} variant="contained" type="submit" style={{maxHeight: '55px'}}>
                            Deposit
                        </Button>
                        <Deposit tokenMetaData={this.state.tokenMetaData} isDepositOpen={this.state.isDepositOpen} raffleContractAddress={this.state.raffleContractAddress}/>
                    </div>

                    <PlayersList players={this.state.players}/>
                </div>
                <Footer/>
            </div>
        )
    }
}
