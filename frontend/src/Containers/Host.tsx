import React from 'react';
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from '../Components/CoinFlipCreator';
import MenuItems from "../Components/MenuItems";
import "./Host.css";
import Footer from '../Components/Footer';

export default class Host extends React.Component {

    state = {
        account: ""
    }

    async componentDidMount() {
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
                <RaffleCreator/>
                <CoinFlipCreator/>
                <Footer/>
            </div>
        )
    }
}