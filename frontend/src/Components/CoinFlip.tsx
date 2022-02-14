import BaseContainer from "./BaseContainers/BaseContainer"
import {
    Box,
    Flex,
    Heading
} from "@chakra-ui/react"
import "../styles/CoinFlips/CoinFlip.scss"

interface Props {
    coinFlip: any
}

const CoinFlip = (props: Props) => {
    return (
        <BaseContainer>
            <Flex 
                overflow="auto"
                border="1px solid black"
                background="#40434E"
                color="white"
                mx="20%"
                borderRadius="20px" 
            >
                <Heading mx="5%">{props.coinFlip.creatorAddress}</Heading>
                {props.coinFlip.winner !== "0x0000000000000000000000000000000000000000" ?
                <Heading >{props.coinFlip.winner}</Heading>
                :
                    <Box>
                    {props.coinFlip.joineeAddress !== "0x0000000000000000000000000000000000000000" ? 
                        <Heading className="CoinFlip-Waiting-h6"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></Heading>
                    :
                        <Heading className="CoinFlip-Waiting-h6">Waiting for player</Heading>
                    }
                    </Box>
                }
                <Heading className="CoinFlip-BuyIn-h6">{props.coinFlip.buyInPrice} eth </Heading>
            </Flex>
        </BaseContainer>
    )
}

export default CoinFlip;