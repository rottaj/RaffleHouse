import React from 'react';
import PoolComponent from '../Components/PoolComponent';
import './Pools.css';
export function Pools() {
    return (
        <div className="pool-container">
            <div className="pool-title-container">
                <h2>Current Pools</h2>
                {<PoolComponent maxTokens={10000} tokens={0}/>}
            </div> 
        </div>
    )
}