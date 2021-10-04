import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
export default class Home extends React.Component {

    onClickPool = () => {

    }
    render() {
        return (
            <div className="main-container">
                <div className="title-container">
                    <h1>Token Lotto!</h1>
                    <h3>Win big with the fastest growing crypto lottery!</h3>
                    <h4>Fully decentralized and transparent, operated on the Ethereum blockchain.</h4>
                    <Link to="/pools">
                        <button>Join Pool!</button>
                    </Link>
                </div>
            </div>
        )
    }
}