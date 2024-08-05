// navbar.js
'use client';
import './globals.css'; 
import { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import SignIn from './signin'; 
import { auth, signOut } from './firebase'; 
import Head from './head';

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut().then(() => setUser(null));
  };

  return (
    <>
      <Head />
      <AppBar position="static" className="header">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref> {/* Link to the home page*/}
              <Button color="inherit">Pantry Management</Button>
            </Link>
          </Typography>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link href="/demo" passHref> {/* Line 27: Added a Link to the Demo page */}
              <Button color="inherit">Demo</Button>
            </Link>
          </Typography>

          <Box>
            {user ? (
              <Button color="inherit" onClick={handleSignOut}>
                Logout
              </Button>
            ) : (
              <SignIn user={user} />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container className="mainContent">
        <Box my={2}>{children}</Box>
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
