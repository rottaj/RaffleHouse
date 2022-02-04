import React from 'react';
import './NFT.css';


const OPENSEA_CONTRACT_URL = "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/" // ContractAddress + '/' + id


interface Props {
    token: any;
}


export default class NFT extends React.Component<Props> {


    state = {
        tokenPrice: "0"
    }


    getOpenSeaPrice = async (token: any) => {
        let i =0;
        var interval = setInterval(() => {
            if (token !== undefined && token !== 'undefined' && i ===0) {
                //let tokens = [...this.state.userTokens];
                if (token !== undefined && token !== 'undefined') {
                    console.log(token)
                    let url = OPENSEA_ASSET_URL + token.contractAddress + '/' + token.tokenID
                    fetch(url).then(res => {
                        return res.json();
                    }).then((data) => {
                        if (data !== undefined && data !== 'undefined' && token != undefined) {
                            if (data.collection !== undefined && data.collection !== 'undefined' && data.collection['payment_tokens'].length !== 0) {
                                let price = String(data['collection']['payment_tokens'][0]['eth_price']);
                                this.setState({
                                    tokenPrice: price
                                })
                            }

                        }

                    })
                }
            } else {
                clearInterval(interval)
            }
            i++;
        }, 3000)

    }

    componentDidMount() {
        this.getOpenSeaPrice(this.props.token)
    }

    render() {
        return (
            <div className="NFT-Main-Container">
                <img className="NFT-Img"src={this.props.token.image}></img>
                <h5 className="NFT-Price">Price: {this.state.tokenPrice} eth</h5>
            </div>
        )
    }
}