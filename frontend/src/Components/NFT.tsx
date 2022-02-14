import { useState, useEffect } from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';


const OPENSEA_CONTRACT_URL = "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/" // ContractAddress + '/' + id
const OPENSEA_COLLECTION_URL = "https://testnets-api.opensea.io/api/v1/collection/" // collection-name + '/stats'

type Props = {
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
        <Box height="100%" width="100%">
            {props.token ?
                <Image 
                    borderRadius="20px"
                    padding="5px"
                    width="100%"
                    height="100%"
                    src={props.token.image}
                >
                </Image>
                :
                undefined
            }
            {tokenPrice != "Loading" ?
                <Heading color="white" fontSize="md">Price: {tokenPrice} eth</Heading>
            :
                <Heading color="white" fontSize="md">{tokenPrice} Price </Heading>
            }
        </Box>
    )
}

export default NFT;