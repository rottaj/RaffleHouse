import React from 'react';
import { ethers } from 'ethers';
import { _abi, address} from '../interfaces/Eyescream_Interface'; // FOR TESTING
import { Grid } from "@mui/material";
import NFT from '../Components/NFT';
import './NFTSelector.css';

interface Props {
    tokens: Array<any>;
}


declare let window:any;
export default class NFTSelector extends React.Component <Props>{
    
    state = {
        selectedToken: {},
    }



    handleClick = (e: any) => {
        this.setState({
            selectedToken: e
        })
        console.log(e)
    }


    render() {
        return (
            <div className="NFT-Selector-Main">
                {/*this.state.tokens.map(token => {this.getMetaData(token)})*/}
                {/*<Grid className="NFTSelector-Grid-Container" container spacing={2}> */}
                    {this.props.tokens.map(token => {return (<div className="NFT-Div-Container" onClick={() => this.handleClick(token)}><NFT token={String(token.image)}></NFT></div>)})}
                {/*</Grid> */}
            </div>
        )
    }
}