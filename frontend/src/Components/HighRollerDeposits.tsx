import { ethers } from "ethers";
import React from 'react';
import NFT from "./NFT";
interface Props {
    tokens: any
}


const OPENSEA_CONTRACT_URL = "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/" // ContractAddress + '/' + id

declare let window: any;
export default class HighRollerDeposits extends React.Component <Props>{


    render() {
        return (
            <div className="HighRollerDeposits-Main-Div">
                {this.props.tokens.length != 0 ?
                this.props.tokens.map((token:any) => {return (<div className="NFT-Div-Container" ><NFT token={String(token.image)}></NFT></div>)})
                :
                <h5>No Tokens</h5>
                }
            </div>
        )
    }
}