import NFT from "./NFT";
import { Grid, GridItem, Heading } from "@chakra-ui/react"


interface Props {
    tokens: any
}

const HighRollersPot = (props:Props) => {


    return (
        <Grid
            templateColumns='repeat(5, 1fr)' 
            gap={2} 
            width="75%" 
            borderRadius="20px"
            mx="15%"
        >

            {props.tokens.length != 0 ?

            props.tokens.map((token:any) => {return (<GridItem className="NFT-Div-Container" ><NFT token={token}></NFT></GridItem>)})
            :
            <Heading color="white" fontSize="30px">No Tokens</Heading>
            }
        </Grid>
    )
}

export default HighRollersPot;