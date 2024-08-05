// demo.js
'use client';
import './globals.css'; 
import { AppBar, Toolbar, Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import Head from './head';

export default function Demo() {
    return (
        <>
            <Head>
                <title>Demo Page</title>
            </Head>
            <AppBar position="static" className="header">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" passHref>
                            <Button color="inherit">Pantry Management</Button>
                        </Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Link href="/demo" passHref>
                            <Button color="inherit">Demo</Button>
                        </Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/signin" passHref>
                            <Button color="inherit">Sign In</Button>
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className="mainContent">
                <Box my={2} className="content">
                    <Typography variant="h3" component="h3">
                        Welcome to the Demo Page
                    </Typography>
                    <Box my={2}>
                        <video className="video" width="800" controls>
                            <source src="/spruce.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                </Box>
            </Container>
            <footer>
                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        © 2024 Rabia Ghafoor. All rights reserved.
                    </Typography>
                </Box>
            </footer>
        </>
    );
}
