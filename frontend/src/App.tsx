import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import { Home } from './Containers/Home';
import { Pools } from './Containers/Pools'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/pools" component = {Pools}/>
      </BrowserRouter>
    )
  }
}