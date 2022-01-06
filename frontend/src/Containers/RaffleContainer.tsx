import React from 'react';
import Raffle from '../Components/Raffle';
import './Pools.css';

export default class RaffleContainer extends React.Component {
    render() {
        return (
            <div className="pool-container">
                <div className="pool-title-container">
                    <h2>Current Raffles</h2>
                    {<Raffle maxTokens={10000} tokens={0}/>}
                </div> 
            </div>
        )
    }
}