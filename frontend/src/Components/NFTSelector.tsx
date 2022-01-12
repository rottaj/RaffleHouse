import React from 'react';
import { ethers } from 'ethers';
import { _abi, address} from '../interfaces/Eyescream_Interface'; // FOR TESTING
import NFT from '../Components/NFT';

interface Props {
    tokens: Array<any>;
}

declare let window:any;
export default class NFTSelector extends React.Component <Props>{

    state = {
        selectedToken: {}
    }

    handleClick = (e: any) => {
        console.log(e)
        this.setState({
            selectedToken: e
        })
    }

    render() {
        return (
            <div className="NFT-Selector-Main">
                NFT SELECTOR
                {/*this.state.tokens.map(token => {this.getMetaData(token)})*/}
                {this.props.tokens.map(token => {return (<div onClick={() => this.handleClick(token)}><NFT token={String(token.image)}></NFT></div>)})}
            </div>
        )
    }
}