import PhyllisToken from "../images/my_fucking_mayc.png";
import {
    Box,
    Container,
    Text
} from "@chakra-ui/react"
import './Footer.css';


const Footer = () => {
    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'transparent',
                }}
            >
                <Container>
                <Text variant="body1" color="white" textAlign="center">

                    <p>© 2022 Raffle House, Inc</p>
                    <img className="Phyllis-token" src={PhyllisToken}></img>
                    {/*<TwitterIcon sx={{float: "right"}}><a href="https://twitter.com/0xahawk"/></TwitterIcon> */}
                </Text>

                </Container>
            </Box>
        </Box>
    )
}

export default Footer