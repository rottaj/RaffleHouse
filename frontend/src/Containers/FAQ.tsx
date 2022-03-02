import BaseContainer from "./BaseContainers/BaseContainer"
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading
} from "@chakra-ui/react"
const FAQ = () => {
    return (
        <BaseContainer>
            <Box textAlign="center" color="white">

                <Heading> FAQ </Heading> 
                <Box width="60%" ml="20%">
                    <Accordion allowMultiple>

                        <Box py="1%">
                            <AccordionItem py="1%">
                                <AccordionButton>
                                    <Box>
                                        How does it work?
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        </Box>

                        <Box py="1%">
                            <AccordionItem py="1%">
                                <AccordionButton>
                                    <Box>
                                        How do I play?
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        </Box>

                        <Box py="1%">
                            <AccordionItem py="1%">
                                <AccordionButton>
                                    <Box>
                                        How long do games take to process?
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        </Box>

                        <Box py="1%">
                            <AccordionItem py="1%">
                                <AccordionButton>
                                    <Box>
                                        How do you determine randomess?
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        </Box>

                    </Accordion>
                </Box>
            </Box>
        </BaseContainer>
    )
}

export default FAQ;