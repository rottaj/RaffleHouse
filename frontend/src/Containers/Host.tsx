import React from 'react';
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from '../Components/CoinFlipCreator';
import MenuItems from "../Components/MenuItems";
import "./Host.css";
import Footer from '../Components/Footer';

export default class Host extends React.Component {
    render() {
        return (
            <div className="Host-Container-Main-Div">
                <MenuItems/>
                <RaffleCreator/>
                <CoinFlipCreator/>
                <Footer/>
            </div>
        )
    }
}