import React from 'react';
import MenuItems from "../Components/MenuItems";
import { ethers } from "ethers";
import { _CoinFlip_abi } from '../interfaces/CoinFlip_Interface';
import "./CoinFlipViewer.css";
import { WindowRounded } from '@mui/icons-material';

declare let window: any;

interface GameInfoInterface {
    creatorAddress: string;
    buyInPrice: string;
}

interface Props {
    GameInfo?: GameInfoInterface;
}
export default class CoinFlipViewer extends React.Component<Props>{

    state = {
        coinFlipContractAddress: "",
        gameInfo: this.props.GameInfo
    }

    async componentDidMount() {
        if (window.ethereum){ 
            const contractAddress = window.location.pathname.split('/').at(-1);
            this.setState({
                coinFlipContractAddress: contractAddress
            })
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
        console.log("handle submit ")
        console.log("TESTING", e.target[0].value)
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, _CoinFlip_abi, signer);
            let depositTxn = await contract.deposit(parseInt(e.target[0].value), {
                value: ethers.utils.parseEther(parseInt(e.target[0].value).toString())
            })
            console.log(depositTxn);
        }
    }

    render() {
        return (
            <div className="CoinFlipViewer-Div-Main">
                <MenuItems/>
                <div className="CoinFlip-Game-Container">
                    {this.state.gameInfo ?
                        <div>
                        <h6>{this.state.gameInfo.creatorAddress}</h6>
                        <h6>{parseInt(this.state.gameInfo.buyInPrice, 16)} eth buy in</h6>
                        <form onSubmit={(e) => this.handleSubmit(e, this.state.coinFlipContractAddress)}>
                            <input value={parseInt(this.state.gameInfo.buyInPrice)}></input>
                            <button type="submit">Deposit</button>
                        </form>
                        </div>
                    :
                    "GAME DOESN'T EXIST"
                    }
                </div>
            </div>
        )
    }
}