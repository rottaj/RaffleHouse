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

    componentDidMount() {
        console.log("HIGHROLLERDEPOSIT MOUNTED");
        console.log(this.props.tokens)
        //this.getOpenSeaPrice(this.props.tokens);
    }




    getOpenSeaPrice = async (tokens: any) => {
        const updateTokensState = (token: any, i:number) => {
            console.log(token)
            this.props.tokens[i] = token;
            /*
            this.setState({
                tokens: tokens
            })
            */
        }

        if (window.ethereum) {
            let i =0;
            var interval = setInterval(function() {
                if (tokens[i] != undefined && i<= tokens.length) {
                    //let tokens = [...this.state.userTokens];
                    let url = OPENSEA_ASSET_URL + tokens[i].contractAddress + '/' + tokens[i].tokenID
                    fetch(url).then(res => {
                        return res.json();
                    }).then((data) => {
                        let token = {...tokens[i]};
                        token['price'] = String(data.collection.payment_tokens[0].eth_price);
                        tokens[i] = token;
                        console.log("TESTING TOKEN UPDATE", tokens[i])
                        updateTokensState(tokens[i], i)
                    })
                } else {
                    clearInterval(interval)
                    updateTokensState(tokens[i], i);
                }
                i++;
            }, 3000)

        }
    }


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