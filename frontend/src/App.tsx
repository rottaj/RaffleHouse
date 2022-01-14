import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import Home  from './Containers/Home';
import Raffles from './Containers/Raffles'
import RaffleViewer from './Containers/RaffleViewer';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/raffles" component = {Raffles}/>
        <Route path = "raffle/:id" component = {RaffleViewer}/>
      </BrowserRouter>
    )
  }
}