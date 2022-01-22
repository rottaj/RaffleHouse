import React from 'react';
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
                    <div className="sign">
                    <span className="fast-flicker">Raffle House</span>
                    </div>
                </div>
            </div>
        )
    }
}