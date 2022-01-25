import React from 'react';
import RaffleCreator from "../Components/RaffleCreator";
import MenuItems from "../Components/MenuItems";
import Footer from "../Components/Footer";
import CoinFlipCreator from '../Components/CoinFlipCreator';
import { Link } from 'react-router-dom';
import './Home.css';


declare let window: any;
export default class Home extends React.Component {

    state = {
        RaffleFormOpen: false,
        CoinFlipFormOpen: false,
        account: ""
    }

    async componentDidMount() {
        if(window.ethereum) {

            document.title = "Welcome to Raffle House"
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
        }
    }  
    
    handleRaffleForm = () => {
        this.setState({
          RaffleFormOpen: !this.state.RaffleFormOpen
        })
    }

    handleCoinFlipForm = () => {
        this.setState({
            CoinFlipFormOpen: !this.state.CoinFlipFormOpen
        })
    }

    componentDidUpdate() {
        console.log(this.state, "oogabooga")
    }
    
    render() {
        return (
            <div className="main-container">
                <MenuItems account={this.state.account}/>
                    <div className="home-title-container">
                        <div className="sign">
                        <span className="fast-flicker">Raffle House</span>
                        </div>
                    </div>
                <Footer/>
            </div>
        )
    }
}