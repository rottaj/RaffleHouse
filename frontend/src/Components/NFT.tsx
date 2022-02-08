import React from 'react';
import './NFT.css';


const OPENSEA_CONTRACT_URL = "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/" // ContractAddress + '/' + id


interface Props {
    token: any;
}


export default class NFT extends React.Component<Props> {


    state = {
        tokenPrice: "Loading"
    }


    getOpenSeaPrice = async (token: any) => {
        let i =0;
        console.log("TOKEN", token)

        var interval = setInterval(() => {
            if (token !== undefined && token !== 'undefined' && i >=0) {
                //let tokens = [...this.state.userTokens];
                if (token !== undefined && token !== 'undefined') {
                    //console.log(token)
                    let url = OPENSEA_ASSET_URL + token.contractAddress + '/' + token.tokenID
                    try {
                    fetch(url).then(res => {
                        return res.json();
                    }).then((data) => {
                        if (data !== undefined && data !== 'undefined' && token != undefined) {
                            if (data.collection !== undefined && data.collection !== 'undefined' && data.collection['payment_tokens'].length !== 0) {
                                //console.log(data)
                                let price = String(data['collection']['payment_tokens'][0]['eth_price']);
                                this.setState({
                                    tokenPrice: price
                                })
                                //if (JSON.parse(sessionStorage.userTokens).hasOwnProperty(`token_${token.contractAddress}_${token.tokenID}`) !== true) {
                                    /*
                                    console.log("HELLLLO")
                                    let userTokens = JSON.parse(sessionStorage.userTokens)
                                    console.log("TESTING", userTokens)
                                    */
                                    //userTokens[`token_${token.contractAddress}_${token.tokenID}`] = `${price}`;
                                    //console.log(userTokens)
                                    //sessionStorage.setItem('userTokens', userTokens)
                                    //sessionStorage.setItem('userTokens', `{"token_${token.contractAddress}_${token.tokenID}": ${price}}`)
                                //}
                                i = -1;
                            }

                        }

                    })
                    } catch(err) {}
                } else if (i >= 5) {
                    i = -1; // pretty shitty way but whatever ( will prob delete later )
                }
                i++;
            } else {
                clearInterval(interval)
            }
        }, 3000)

    }

    componentDidMount() {
        this.getOpenSeaPrice(this.props.token)
    }

    render() {
        return (
            <div className="NFT-Main-Container">
                <img className="NFT-Img"src={this.props.token.image}></img>
                {this.state.tokenPrice != "Loading" ?
                    <h5 className="NFT-Price">Price: {this.state.tokenPrice} eth</h5>
                :
                    <h5 className="NFT-Price">{this.state.tokenPrice} Price </h5>
                }
            </div>
        )
    }
}