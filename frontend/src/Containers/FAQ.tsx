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
                                    To play, it's required you own tokens on at least 1 of the 4 networks we host our service. These include: Ethereum, Polygon, Avalance,
                                        and Binance Smart Chain. If you want to play one of our NFT dependant games (Raffles / HighRollers) it's required you own a verifiable NFT on the 
                                        ethereum blockchain. Fancy a game, anon?
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
                                    Our contracts use Chainlink VRF to generate a verifiable random number for all
                                    the games we have. This is the safest, most verifiable way to prove randomness on the blockchain. 
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
                                    We're a small team working remotely from Texas 
                                    and New York City.
                                    <HStack pt="10px" justify="center" spacing="60px">
                                        <Box>
                                            <Image borderRadius="180px" boxSize="200px" src={ape} alt="error"/>
                                            <Heading color="teal" pt="5px" size="md">ahawk.eth</Heading>
                                            <Heading pt="5px" size="sm">Co-Founder</Heading>
                                            <Heading py="5px" size="sm">Head of Design</Heading>
                                        </Box>
                                        <Box>
                                            <Image borderRadius="180px" boxSize="200px" src={ape} alt="error"/>
                                            <Heading color="yellow" pt="5px" size="md">phyllis.eth</Heading>
                                            <Heading pt="5px" size="sm">Founder</Heading>
                                            <Heading py="5px" size="sm">Head of Development</Heading>
                                        </Box>
                                        <Box>
                                            <Image borderRadius="180px" boxSize="200px" src={ape} alt="error"/>
                                            <Heading color="pink" pt="5px" size="md">blake.eth</Heading>
                                            <Heading pt="5px" size="sm">Co-Founder</Heading>
                                            <Heading py="5px" size="sm">Development</Heading>
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