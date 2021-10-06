import React from 'react';
import PoolComponent from '../Components/PoolComponent';
import './Pools.css';
export default class Pools extends React.Component {
    render() {
        return (
            <div className="pool-container">
                <div className="pool-title-container">
                    <h2>Current Pools</h2>
                    {<PoolComponent maxTickets={10000}/>}
                </div> 
            </div>
        )
    }
}