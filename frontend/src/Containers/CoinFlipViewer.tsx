import React from 'react';
import MenuItems from "../Components/MenuItems";
import { ethers } from "ethers";
import { _CoinFlip_abi } from '../interfaces/CoinFlip_Interface';
import TextField from '@mui/material/TextField';
import Messages from "../Components/Messages";
import Button from '@mui/material/Button';
import Footer from '../Components/Footer';
import "./CoinFlipViewer.css";
declare let window: any;

interface GameInfoInterface {
    creatorAddress: string;
    joineeAddress: string;
    winner: string;
    buyInPrice: string;
}

interface Props {
    GameInfo?: GameInfoInterface;
}
export default class CoinFlipViewer extends React.Component<Props>{

    state = {
        coinFlipContractAddress: "",
        gameInfo: this.props.GameInfo,
        account: "",
    }



    async componentDidMount() {
        if (window.ethereum){ 
            const contractAddress = window.location.pathname.split('/').at(-1);
            this.setState({
                coinFlipContractAddress: contractAddress
            })
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const account = accounts.result[0];
            this.setState({account: account});
            console.log(contractAddress);
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(contractAddress, _CoinFlip_abi, signer);
            console.log(contract)
            const gameData = await contract.getGameInfo();
            this.setState({
                gameInfo: gameData
            })
        }
    }


    handleSubmit = async (e: any, contractAddress: any) => {
        e.preventDefault();
        console.log("handle submit ");
        console.log("TESTING", e.target[0].value)
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, _CoinFlip_abi, signer);
            let depositTxn = await contract.deposit({
                value: ethers.utils.parseEther(e.target[0].value).toString()
            })
            console.log(depositTxn);
        }
    }

    render() {
        return (
            <div className="CoinFlipViewer-Div-Main">
                {/* <Header/> */}
                <MenuItems account={this.state.account}/>
                <Messages/>
                <div className="CoinFlip-Game-Container">

                    <h1 className="Coinflip-Main-Title">COIN FLIP</h1>
                    {this.state.gameInfo ?
                        <div>
                            <div className="CoinFlip-GameInfo-Div">

                                <h2>Buy in Price: {parseInt(this.state.gameInfo.buyInPrice) / (10 ** 18)} eth</h2>
                                {this.state.gameInfo.winner !== "0x0000000000000000000000000000000000000000" ?
                                    <h6>Winner: {this.state.gameInfo.winner}</h6>
                                :
                                    <div>
                                        {this.state.gameInfo.joineeAddress !== "0x0000000000000000000000000000000000000000" ?
                                            <div>
                                                <h3>Processing Winner</h3> 
                                                <div>
                                                    <h6 className="CoinFlipViewer-Waiting-h6"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></h6>
                                                </div>
                                            </div>
                                        :
                                            <h6>Waiting for player</h6>
                                        }
                                    </div>
                                }
                            </div>
                            <div className="CoinFlip-Players-Container">


                                <div className="CoinFlip-Players-Creator-Div">
                                    <h3>Creator:</h3>
                                    <h6>{this.state.gameInfo.creatorAddress}</h6>
                                </div>
                                <div className="CoinFlip-VS-Container">
                                    <h3 className="CoinFlip-VS-h3">VS</h3>
                                </div>
                                {this.state.gameInfo.joineeAddress !== "0x0000000000000000000000000000000000000000" ? 
                                    <div className="CoinFlip-Players-Joinee-Div">

                                        <h3>Joinee:</h3>
                                        <h6>{this.state.gameInfo.joineeAddress}</h6>
                                    </div>
                                :
                                    <div className="CoinFlip-Players-Waiting-Div">
                                        <h6>Waiting for player</h6>
                                        <form onSubmit={(e) => this.handleSubmit(e, this.state.coinFlipContractAddress)}>
                                            <TextField value={parseInt(this.state.gameInfo.buyInPrice) / (10 ** 18)}></TextField>
                                            <Button type="submit">Deposit</Button>
                                        </form>
                                    </div>

                                }
                            </div>

                        </div>
                    :
                    "GAME DOESN'T EXIST"
                    }
                </div>
                <Footer/>
            </div>
        )
    }
}