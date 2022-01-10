import React from 'react';

require('dotenv').config();
const ETHERSCAN_NFT_TXN = process.env.ETHERSCAN_API_NFT_TXN;
// 
/*
process.env.ETHERSCAN_API_NFT_TXN + ${0xB702DC679dCe8d27c77AC49A63B9A138B674929E} + ${&startblock=0&endblock=999999999&sort=asc&apikey=} + process.env.API_KEY
*/
const ETHERSCAN_API_NFT_TXN = 'api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=';
const ETHERSCAN_API_KEY = 'JPARDRW9CAVF9ZKISWVC3YYM6RP93JNQUC';

interface Props {
    address: string;
}

declare let window:any;
export default class NFTSelector extends React.Component {

    state = {
        tokens: [ ]
    }

    fetchNFTs = async () => {
        var accounts = await window.ethereum.send('eth_requestAccounts');
        console.log(accounts.result[0])
        var url = ETHERSCAN_API_NFT_TXN + accounts.result[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=' + ETHERSCAN_API_KEY
        console.log(url)
        fetch(url)
        .then(res => {
            console.log(res)
            res.json();
        })
        .then(data => console.log(data))
    }

    componentDidMount() {
        this.fetchNFTs()
        //fetch(REACT_APP_ETHERSCAN_API_NFT_TXN + this.props.address)
    }

    render() {
        return (
            <div>
                NFT SELECTOR
            </div>
        )
    }
}