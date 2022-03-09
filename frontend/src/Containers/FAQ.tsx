import BaseContainer from "./BaseContainers/BaseContainer"
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Image,
    HStack,
} from "@chakra-ui/react"
import ape from "../images/my_fucking_mayc.png";
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
                                    RaffleHouse is the First-ever NFT Raffle House, secured with blockchain 
                                    technology.Our website uses completely transparent random generation algorithms 
                                    to ensure our site’s winners are truly random on all of our raffles. Players 
                                    can sign up with just a metamask and can start entering as many raffles as 
                                    they would like at no cost, besides the slot price and any gas fees associated 
                                    with the transactions. Hosts can set up a raffle for any NFT they own* and 
                                    choose their own slot price and amount of slots, with a 10% commission fee 
                                    towards the website.
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
                                    RaffleHouse currently features 3 different game modes. Raffles feature 
                                    a 100% random winner chosen through oracle RNG. Coin Flips is a game of Bears
                                    V Bulls as we like to call it. It's our 1v1/winner takes all mode (user pots 
                                    must be within ~3% in value). High Roller is your classic winner takes all
                                    in the ultimate game of chance. Fancy a game, anon?
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
                                    *Network dependant...not solid here yet*
                                    *currently experimenting with ways of getting oracle result the fastest&cheapest.
                                    might utilise cross chain and send to mainnet for finality of game??*

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
                                    Our site uses Chainlink VRF in order to generate a truely random number for all
                                    of our games. More can be read here...
                                </AccordionPanel>
                            </AccordionItem>
                        </Box>

                        <Box py="1%">
                            <AccordionItem py="1%">
                                <AccordionButton>
                                    <Box>
                                        Are there any fees?
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel>
                                    ...
                                </AccordionPanel>
                            </AccordionItem>
                        </Box>

                        <Box py="1%">
                            <AccordionItem py="1%">
                                <AccordionButton>
                                    <Box>
                                        Who created this?
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel>
                                    Raffle House is created by a small team of three working remotely from Texas 
                                    and New York
                                    <HStack justify="center">
                                        <Box>
                                            <Image borderRadius="20px" boxSize="200px" src={ape} alt="error"/>
                                            <Heading size="md">Developer/Co-Founder</Heading>
                                            <Heading size="md">ahawk.eth</Heading>
                                        </Box>
                                        <Box>
                                            <Image borderRadius="20px" boxSize="200px" src={ape} alt="error"/>
                                            <Heading size="md">Developer/Co-Founder</Heading>
                                            <Heading size="md">phyllis.eth</Heading>
                                        </Box>
                                        <Box>
                                            <Image borderRadius="20px" boxSize="200px" src={ape} alt="error"/>
                                            <Heading size="md">Developer/Co-Founder</Heading>
                                            <Heading size="md">blake.eth</Heading>
                                        </Box>
                                    </HStack>
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