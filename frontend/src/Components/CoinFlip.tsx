import BaseContainer from "../Containers/BaseContainers/BaseContainer"
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
        <Flex 
            overflow="auto"
            border="1px solid black"
            background="#40434E"
            color="white"
            mx="20%"
            my="1%"
            py="1%"
            borderRadius="20px" 
        >
            <Heading fontSize="md" >{props.coinFlip.creatorAddress}</Heading>
            {props.coinFlip.winner !== "0x0000000000000000000000000000000000000000" ?
            <Heading fontSize="md" px="5%">{props.coinFlip.winner}</Heading>
            :
                <Box>
                {props.coinFlip.joineeAddress !== "0x0000000000000000000000000000000000000000" ? 
                    <Heading className="CoinFlip-Waiting-h6"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></Heading>
                :
                    <Heading fontSize="md" px="15%">Waiting for player</Heading>
                }
                </Box>
            }
            <Heading fontSize="md">{props.coinFlip.buyInPrice} eth </Heading>
        </Flex>
    )
}

export default CoinFlip;