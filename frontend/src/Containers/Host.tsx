import React, { useEffect, useState } from 'react';
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from '../Components/CoinFlipCreator';
import MenuItems from "../Components/MenuItems";
import Messages from "../Components/Messages";
import "./Host.css";
import Footer from '../Components/Footer';


declare let window: any;
const Host = () => {

    const [account, setAccount] = useState('')


    useEffect(() => {
        document.title = "Host - Raffle House"
        const getAccount = async () => {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            setAccount(account);
        }
        if(window.ethereum) {
            getAccount()
        }
    }, [])

    return (
        <div className="Host-Container-Main-Div">
            <MenuItems account={account}/>
            <Messages/>
            <div className="Host-Games-Container-Div">
                <RaffleCreator/>
                <CoinFlipCreator/>
            </div>

            <Footer/>
        </div>
    )
}

export default Host