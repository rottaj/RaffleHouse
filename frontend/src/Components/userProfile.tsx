import React from 'react';
import MenuItems from "../Components/MenuItems";
import './userProfile.css';
import { ethers } from 'ethers';


export default class Profile extends React.Component {


    // state = {
    //     account: []
    // }

    // getAddress = async () => {
    //     if (window.ethereum) {
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         const signer = provider.getSigner();

    //         const rafflesContract = await new ethers.Contract(RafflesAddress, _abi_raffles, signer);
    //         let rafflesLength = await rafflesContract.getRaffles();
    //         for (let i =0; i<=rafflesLength-1; i++ ) {
    //             let raffle = await rafflesContract.getRaffleByIndex(i);
    //             this.setState({
    //                 account: [...this.state.account, raffle]
    //             })
    //         }
    //     }
    // }

    // omponentDidMount() {
    //     this.getAddress()
    // }



    render() {
        return (
            <div>
                <MenuItems/>
                <div className="profileArea">
                <h1 className="title">Profile</h1>
                <div className="profileCard">
                    <div className="bioCard"></div>
                    <img className="profileAvi" alt=""/>
                    <div className="bioText">
                        {/* <h className="title2">Bio:</h> */}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac ex sit amet mauris lobortis fermentum. 
                        Nam cursus, ligula vel luctus suscipit, mauris nisi bibendum nunc, vehicula dapibus sem urna non erat. Sed a semper
                        dui. Integer congue auctor suscipit. Donec vel nunc est. Cras accumsan imperdiet malesuada. Vivamus sed mauris malesuada, 
                        aliquam neque in, elementum diam. Curabitur hendrerit dictum risus, id rutrum sapien tincidunt et.</p>
                    </div>
                    <div className="profileStats">
                        <h1><u>Raffles Entered</u><br/>12</h1>
                    </div>
                    <div className="profileStatstoo">
                        <h1><u>Wins</u><br/>7</h1>
                    </div>
                    <div className="userCard">
                        <h1 className="username">ahawk<br/></h1>
                        <h1>Joined November 2021</h1>
                    </div>
                    <p className="address">0xF78a6Fb8002a19a500a77Ca89D28a3123E9F6B13</p>
                    <div className="profileNFTs">
                        display of users NFTs*WIP*
                        {/* <button className="" onClick={login}>TEST</button> */}
                    </div>
                
                </div>
            </div>
            </div>
        );
    }
}