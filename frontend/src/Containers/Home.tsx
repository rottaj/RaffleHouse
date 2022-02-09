import React, { useEffect, useState } from 'react';
import MenuItems from "../Components/MenuItems";
import Footer from "../Components/Footer";
import './Home.css';


declare let window: any;
const Home = () => {

    const [RaffleFormOpen, setRaffleFormOpen] = useState(false);
    const [CoinFlipFormOpen, setCoinFlipFormOpen] = useState(false);
    const [account, setAccount] = useState('');

    
    useEffect(() => {
        document.title = "Welcome to Raffle House"
        const getAccount = async () => {
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            setAccount(account);
        }
        if(window.ethereum) {
            getAccount();
        }       
    }, [])
    
    const handleRaffleForm = () => {
        setRaffleFormOpen(!RaffleFormOpen);
    }

    const handleCoinFlipForm = () => {
        setCoinFlipFormOpen(!CoinFlipFormOpen);
    }

    return (
        <div className="main-container">
            <MenuItems account={account}/>
                <div className="home-title-container">
                    <div className="sign">
                    <span className="fast-flicker">Raffle House</span>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Home;