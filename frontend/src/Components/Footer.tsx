import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhyllisToken from "../images/my_fucking_mayc.png";
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
                component="footer"
                sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'transparent',
                }}
            >
                <Container>
                <Typography variant="body1" color="white" textAlign="center">

                    <p>© 2022 Raffle House, Inc</p>
                    <img className="Phyllis-token" src={PhyllisToken}></img>
                    <TwitterIcon sx={{float: "right"}}><a href="https://twitter.com/0xahawk"/></TwitterIcon>
                </Typography>

                </Container>
            </Box>
        </Box>
    )
}

export default Footer