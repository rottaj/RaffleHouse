import React, { useEffect, useState } from 'react';
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
const NFTSelector = (props:Props) => {


    const [selectedToken, setSelectedToken]: any = useState({});



    const handleClick = (e: any) => { // Prob need to fix this.. whatever
        console.log("TESTING TOKEN PRICE", selectedToken.tokenPrice);
        e.tokenPrice = selectedToken.tokenPrice;
        setSelectedToken(e);
        console.log(e)
    }



    return (
        <div className="NFT-Selector-Main">
            {/*this.state.tokens.map(token => {this.getMetaData(token)})*/}
            {/*<Grid className="NFTSelector-Grid-Container" container spacing={2}> */}
            {console.log(props.tokens) /* for some reason this doesn't work without this... oh well*/} 
            { props.tokens ?
                props.tokens.map(token => {return (<div className="NFT-Div-Container" onClick={() => handleClick(token)}><NFT token={token}></NFT></div>)})
                :
                <h5>No Tokens</h5>
            }
            {/*</Grid> */}
        </div>
    )
}

export default NFTSelector;