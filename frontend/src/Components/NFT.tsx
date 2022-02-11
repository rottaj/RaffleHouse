import React, { useState, useEffect } from 'react';
import './NFT.css';


const OPENSEA_CONTRACT_URL = "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/" // ContractAddress + '/' + id
const OPENSEA_COLLECTION_URL = "https://testnets-api.opensea.io/api/v1/collection/" // collection-name + '/stats'

interface Props {
    token: any;
}


const NFT = (props:Props) => {

    const [tokenPrice, setTokenPrice] = useState("Loading");

    const getOpenSeaPrice = async (token: any) => {
        let i =0;
        console.log("TOKEN", token)

        var interval = setInterval(() => {
            if (token !== undefined && token !== 'undefined' && i >=0) {
                //let tokens = [...this.state.userTokens];
                if (token !== undefined && token !== 'undefined') {
                    //console.log(token)
                    let assetUrl = OPENSEA_ASSET_URL + token.contractAddress + '/' + token.tokenID
                    let collectionUrl = OPENSEA_COLLECTION_URL + token.tokenName + '/stats' 
                    try {
                    fetch(assetUrl).then(res => {
                        return res.json();
                    }).then((data) => {
                        if (data !== undefined && data !== 'undefined' && token != undefined) {
                            if (data.collection !== undefined && data.collection !== 'undefined' && data.collection['payment_tokens'].length !== 0) {
                                console.log(data)
                                let price = String(data['collection']['stats']['average_price'].toFixed(2));
                                setTokenPrice(price);
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

    useEffect(() => {
        getOpenSeaPrice(props.token);
    }, [])


    return (
        <div className="NFT-Main-Container">
            {props.token ?
                <img className="NFT-Img"src={props.token.image}></img>
                :
                undefined
            }
            {tokenPrice != "Loading" ?
                <h5 className="NFT-Price">Price: {tokenPrice} eth</h5>
            :
                <h5 className="NFT-Price">{tokenPrice} Price </h5>
            }
        </div>
    )
}

export default NFT;