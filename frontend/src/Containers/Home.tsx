import React from 'react';
import EnterApp from "../Components/EnterApp";
import RaffleCreator from "../Components/RaffleCreator";
import MenuItems from "../Components/MenuItems";
import Footer from "../Components/Footer";
import CoinFlipCreator from '../Components/CoinFlipCreator';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends React.Component {

    state = {
        RaffleFormOpen: false,
        CoinFlipFormOpen: false
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


    render() {
        return (
            <div className="main-container">
            <MenuItems/>
                <div className="home-title-container">
                    <h1 className="Header-Token-Lotto-h1">Raffle House!</h1>
                    <h3>Win big with the fastest growing crypto Raffle!</h3>
                    <h4>Fully decentralized and transparent, operated on the Ethereum blockchain.</h4>
                    <EnterApp/>
                    <Link to="/raffles">
                        <button>Join Pool!</button>
                    </Link>
                    {/* <div>
                        <button onClick={this.handleRaffleForm}>Create Raffle!</button>
                    </div>
                    <div>
                        <button onClick={this.handleCoinFlipForm}> Create Coin Flip </button>
                    </div> */}
                     <div><button><a href="/host">Host</a></button></div>

                </div>
                {/* <RaffleCreator isOpen={this.state.RaffleFormOpen}/> */}
                {/* <CoinFlipCreator isOpen={this.state.CoinFlipFormOpen}/> */}
                <Footer/>
            </div>
        )
    }
}