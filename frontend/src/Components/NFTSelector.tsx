import { useEffect, useState } from 'react';
import { _abi, address} from '../interfaces/Eyescream_Interface'; // FOR TESTING
import NFT from '../Components/NFT';
import { Grid, GridItem, Heading } from '@chakra-ui/react';

type Props  = {
    tokens: Array<any>;
}

const NFTSelector = (props:Props) => {

    const [selectedToken, setSelectedToken]: any = useState({});

    
    const handleClick = (e: any) => { // Prob need to fix this.. whatever
        console.log("TESTING TOKEN PRICE", selectedToken.tokenPrice);
        e.tokenPrice = selectedToken.tokenPrice;
        setSelectedToken(e);
        console.log(e)
    }


    return (
        <Grid 
          templateColumns='repeat(8, 1fr)' 
          gap={2}
          mx="15%"
        >
            { props.tokens ?
                props.tokens.map(token => {return (<GridItem className="NFT-Div-Container" onClick={() => handleClick(token)}><NFT token={token}></NFT></GridItem>)})
                :
                <Heading fontSize="md">No Tokens</Heading>
            }
        </Grid>
    )
}

export default NFTSelector;