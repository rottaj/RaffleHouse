import React from 'react';

require('dotenv').config();
const ETHERSCAN_NFT_TXN = process.env.ETHERSCAN_API_NFT_TXN;

/*
process.env.ETHERSCAN_API_NFT_TXN + ${0xB702DC679dCe8d27c77AC49A63B9A138B674929E} + ${&startblock=0&endblock=999999999&sort=asc&apikey=} + process.env.API_KEY
*/


export default class NFTSelector extends React.Component {

    state = {
        tokens: [ ]
    }

    componentDidMount() {
        console.log(ETHERSCAN_NFT_TXN)
        console.log(process.env)
    }

    render() {
        return (
            <div>
                NFT SELECTOR
            </div>
        )
    }
}