import { ethers } from "ethers";
import React from 'react';
import NFT from "./NFT";
interface Props {
    tokens: any
}


const OPENSEA_CONTRACT_URL = "https://api.opensea.io/api/v1/asset_contract/";

declare let window: any;
export default class HighRollerDeposits extends React.Component <Props>{

    async componentDidMount() {
        if (window.ethereum) {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            this.getOpenSeaData(this.props.tokens[0])
        }
    }

    getOpenSeaData = async(token: any) => {
        if (token !== undefined) {
            console.log(token)
            let url = OPENSEA_CONTRACT_URL + token.contractAddress
            console.log(url)
            fetch(url).then(res => {
                return res.json();
            }).then((data) => {
                console.log("TOKEN OPENSEA DATA", data)
            })
        }
    }


    render() {
        return (
            <div className="HighRollerDeposits-Main-Div">
                {this.props.tokens.map((token:any) => {return (<div className="NFT-Div-Container" ><NFT token={String(token.image)}></NFT></div>)})}
            </div>
        )
    }
}