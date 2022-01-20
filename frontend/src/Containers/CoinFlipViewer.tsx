import React from 'react';
import MenuItems from "../Components/MenuItems";
import { ethers } from "ethers";
import { _CoinFlip_abi } from '../interfaces/CoinFlip_Interface';
import "./CoinFlipViewer.css";

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

    render() {
        return (
            <div className="CoinFlipViewer-Div-Main">
                <MenuItems/>
                {this.state.gameInfo ?
                    <div>
                    <h6>{this.state.gameInfo.creatorAddress}</h6>
                    <h6>{parseInt(this.state.gameInfo.buyInPrice, 16)} eth buy</h6>
                    </div>
                :
                "NOT GAMES"
                }
            </div>
        )
    }
}