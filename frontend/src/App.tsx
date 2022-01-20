import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import Home  from './Containers/Home';
import Raffles from './Containers/Raffles'
import CoinFlips from "./Containers/CoinFlips";
import RaffleViewer from './Containers/RaffleViewer';
import userProfile from "./Components/userProfile";
import RaffleCreator from "./Components/RaffleCreator";
import CoinFlipViewer from "./Containers/CoinFlipViewer";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/raffles" component = {Raffles}/>
        <Route exact path="/coin-flips" component = {CoinFlips}/>
        <Route exact path = "/profile" component = {userProfile} />
        <Route exact path = "/host" component = {RaffleCreator} />
        <Route path = "/raffle/:contractAddress" component = {RaffleViewer}/>
        <Route path = "/coin-flip/:contractAddress" component = {CoinFlipViewer}/>
      </BrowserRouter>
    )
  }
}