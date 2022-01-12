import React from 'react';
import { ethers } from 'ethers';
import { _abi, address} from '../interfaces/Eyescream_Interface'; // FOR TESTING


interface Props {
    tokens: Array<Object>;
}

declare let window:any;
export default class NFTSelector extends React.Component <Props>{

    render() {
        return (
            <div>
                {console.log('PROPS', this.props)}
                NFT SELECTOR
                {/*this.state.tokens.map(token => {this.getMetaData(token)})*/}
                {this.props.tokens.map(imageSrc => {return (<img src={String(imageSrc)}></img>)})}
            </div>
        )
    }
}