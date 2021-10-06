import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { ChainId, DAppProvider, useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'


function onClickPool() {

}

export function Home() {

    const { activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)
    return (
        <div className="main-container">
            <div className="home-title-container">
                <h1>Token Lotto!</h1>
                <h3>Win big with the fastest growing crypto lottery!</h3>
                <h4>Fully decentralized and transparent, operated on the Ethereum blockchain.</h4>
                <Link to="/pools">
                    <button>Join Pool!</button>
                </Link>
                <div>
                    <button onClick={() => activateBrowserWallet()}>Connect</button>
                </div>
                {account && <p>Account: {account}</p>}
                {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
            </div>
        </div>
    )
}