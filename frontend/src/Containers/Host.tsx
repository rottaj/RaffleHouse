import React from 'react';
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from '../Components/CoinFlipCreator';
import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import "./Host.css";
import Footer from '../Components/Footer';
import Header from './Header'


declare let window: any;
export default class Host extends React.Component {

    state = {
        account: ""
    }

    async componentDidMount() {
        document.title = "Host - Raffle House"
        if(window.ethereum) {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
        }
    } 

    render() {
        return (
            <div className="Host-Container-Main-Div">
                <MenuItems account={this.state.account}/>
                <Messages/>
                <div className="Host-Games-Container-Div">
                    <RaffleCreator/>
                    <CoinFlipCreator/>
                </div>

                <Footer/>
            </div>
        )
    }
}