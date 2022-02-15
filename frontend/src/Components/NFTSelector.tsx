import { useEffect, useState } from 'react';
import { _abi, address} from '../interfaces/Eyescream_Interface'; // FOR TESTING
import NFT from '../Components/NFT';
import { 
    Grid, 
    GridItem, 
    Heading,
    Box,
    Modal,
    Image,
    ModalOverlay,
    ModalBody,
    ModalContent,
    useDisclosure,
} from '@chakra-ui/react';

type Props  = {
    tokens: Array<any>;
    tokenHandler: any
}

const NFTSelector = (props:Props) => {

    return (
        <Grid 
          templateColumns='repeat(8, 1fr)' 
          gap={2}
          mx="15%"
        >
            { props.tokens ?
                props.tokens.map(token => {return (<GridItem className="NFT-Div-Container" onClick={() => props.tokenHandler(token)}><NFT token={token}></NFT></GridItem>)})
                :
                <Heading fontSize="md">No Tokens</Heading>
            }
        </Grid>
    )
}

export default NFTSelector;
