import BaseContainer from "./BaseContainers/BaseContainer"
import {
    Box,
    Heading
} from "@chakra-ui/react";


const MyHistory = () => {
    return (
        <BaseContainer>
            <Box textAlign="center" color="white">
                <Heading> Game History </Heading>
                <Box>
                    <Heading>CoinFlips</Heading>
                </Box>
                <Box>
                    <Heading>Raffles</Heading>
                </Box>
                <Box>
                    <Heading>High Rollers</Heading>
                </Box>
            </Box>
        </BaseContainer>
    )
}


export default MyHistory