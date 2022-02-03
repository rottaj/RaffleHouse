import React from 'react';
import { ethers } from 'ethers';
import { _abi, address} from '../interfaces/Eyescream_Interface'; // FOR TESTING
import { Grid } from "@mui/material";
import NFT from '../Components/NFT';
import './NFTSelector.css';


const OPENSEA_CONTRACT_URL = "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/" // ContractAddress + '/' + id


interface Props {
    tokens: Array<any>;
}


declare let window:any;
export default class NFTSelector extends React.Component <Props>{
    
    state = {
        tokens: [],
        selectedToken: {}
    }



    handleClick = (e: any) => {
        this.setState({
            selectedToken: e
        })
        console.log(e)
    }


    getOpenSeaPrice = async (tokens: any) => {

        let i =0;
        var interval = setInterval(() => {
            if (tokens[i] != undefined && i<= tokens.length) {
                //let tokens = [...this.state.userTokens];
                let url = OPENSEA_ASSET_URL + tokens[i].contractAddress + '/' + tokens[i].tokenID
                fetch(url).then(res => {
                    return res.json();
                }).then((data) => {
                    if (data) {
                        let token = tokens[i];
                        token['price'] = String(data.collection.payment_tokens[0].eth_price);
                        tokens[i] = token;
                        console.log("TESTING TOKEN UPDATE", tokens[i])
                        this.setState({
                            tokens: [...this.state.tokens, token]
                        })
                    }

                })
            } else {
                clearInterval(interval)
            }
            i++;
        }, 3000)

    }

    componentDidMount() {
        this.getOpenSeaPrice(this.props.tokens)
    }

    render() {
        return (
            <div className="NFT-Selector-Main">
                {/*this.state.tokens.map(token => {this.getMetaData(token)})*/}
                {/*<Grid className="NFTSelector-Grid-Container" container spacing={2}> */}
                { this.props.tokens ?
                    this.state.tokens.map(token => {return (<div className="NFT-Div-Container" onClick={() => this.handleClick(token)}><NFT token={token}></NFT></div>)})
                    :
                    <h5>No Tokens</h5>
                }
                {/*</Grid> */}
            </div>
        )
    }
}