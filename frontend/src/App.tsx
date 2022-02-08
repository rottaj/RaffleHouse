import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import Home  from './Containers/Home';
import Raffles from './Containers/Raffles'
import CoinFlips from "./Containers/CoinFlips";
import RaffleViewer from './Containers/RaffleViewer';
import HighRollers from "./Containers/HighRollers";
import Host from "./Containers/Host";
import CoinFlipViewer from "./Containers/CoinFlipViewer";
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        sessionStorage.setItem("userTokens", {})
        <BrowserRouter>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/raffles" component = {Raffles}/>
          <Route exact path="/coin-flips" component = {CoinFlips}/>
          <Route exact path = "/host" component = {Host} />
          <Route exact path = "/high-rollers" component = {HighRollers} />
          <Route path = "/raffle/:contractAddress" component = {RaffleViewer}/>
          <Route path = "/coin-flip/:contractAddress" component = {CoinFlipViewer}/>
        </BrowserRouter>
      </div>
    )
  }
}