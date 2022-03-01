import BaseContainer from "./BaseContainers/BaseContainer"
import {
    Box,
    Heading
} from "@chakra-ui/react"
const FAQ = () => {
    return (
        <BaseContainer>
            <Box textAlign="center" color="white">
                <Heading> FAQ </Heading> 
            </Box>
        </BaseContainer>
    )
}

export default FAQ;