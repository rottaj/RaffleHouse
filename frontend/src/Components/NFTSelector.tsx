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



    getOpenSeaPrice = async (tokens: any) => {
        const updateTokensState = (tokens: any) => {
            this.setState({
                tokens: tokens
            })
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
                        if (token.image) {
                            token['price'] = String(data.collection.payment_tokens[0].eth_price);
                            tokens[i] = token;
                            updateTokensState(tokens)
                        }
                    })
                } else {
                    clearInterval(interval)
                    updateTokensState(tokens[i]);
                }
                i++;
            }, 3000)

        }
    }


    handleClick = (e: any) => {
        this.setState({
            selectedToken: e
        })
        console.log(e)
    }

    componentDidMount() {
        if (this.props.tokens) {
            //this.getOpenSeaPrice(this.props.tokens)
        }
    }


    render() {
        return (
            <div className="NFT-Selector-Main">
                {/*this.state.tokens.map(token => {this.getMetaData(token)})*/}
                {/*<Grid className="NFTSelector-Grid-Container" container spacing={2}> */}
                {console.log(this.state.tokens)}
                { this.props.tokens ?
                    this.props.tokens.map(token => {return (<div className="NFT-Div-Container" onClick={() => this.handleClick(token)}><NFT token={token}></NFT></div>)})
                    :
                    <h5>No Tokens</h5>
                }
                {/*</Grid> */}
            </div>
        )
    }
}