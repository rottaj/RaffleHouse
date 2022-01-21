import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";


export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <Box>
                    <Container maxWidth="lg">
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1}>Test</Box>
                                <Box>
                                    <Link href="/" color="inherit">Test</Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </footer>
        )
    }
}