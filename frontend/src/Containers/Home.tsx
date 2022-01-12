import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import EnterApp from "../Components/EnterApp";
import RaffleCreator from "../Components/RaffleCreator"



export default class Home extends React.Component {

    state = {
        RaffleFormOpen: false
      }
    
    handleRaffleForm = () => {
        this.setState({
          RaffleFormOpen: !this.state.RaffleFormOpen
        })
      }

    render() {
        return (
            <div className="main-container">
                <div className="home-title-container">
                    <h1>Token Lotto!</h1>
                    <h3>Win big with the fastest growing crypto lottery!</h3>
                    <h4>Fully decentralized and transparent, operated on the Ethereum blockchain.</h4>
                    <EnterApp/>
                    <Link to="/pools">
                        <button>Join Pool!</button>
                    </Link>
                    <div>
                        <button onClick={this.handleRaffleForm}>Create Raffle!</button>
                    </div>

                </div>
                <RaffleCreator isOpen={this.state.RaffleFormOpen}/>
            </div>
        )
    }
}