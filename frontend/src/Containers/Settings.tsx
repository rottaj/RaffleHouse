import BaseContainer from "./BaseContainers/BaseContainer"
import {
    Box,
    Heading
} from "@chakra-ui/react"
const Settings = () => {
    return (
        <BaseContainer>
            <Box textAlign="center" color="white">
                <Heading>Settings</Heading>
            </Box>
        </BaseContainer>
    )
}

export default Settings;