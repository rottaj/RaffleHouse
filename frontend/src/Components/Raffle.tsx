import React from 'react';
import { ethers } from 'ethers';
import "./Raffle.css"

interface Props {
    token: any;
}

declare let window: any;
export default class Raffle extends React.Component<Props> {

    handleClick = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
        }
    }

    render() {
        return (
            <div className="Raffle-Div-Main" onClick={this.handleClick}>
                {console.log(this.props)}
                <img className="Raffle-Img"src={this.props.token.tokenImage}></img>
            </div>
        )
    }
}