'use client'
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import SignIn from '../navbar/signin'; // Adjusted import path
import { auth, signOut } from './firebase'; // Correct import path

const Layout = ({ children }) => {
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
    <html>
      <body>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pantry Management
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Demo
              </Typography>
              <Button color="inherit" onClick={user ? handleSignOut : () => setUser({})}>
                {user ? 'Logout' : 'Login'}
              </Button>
            </Toolbar>
          </AppBar>
          <Container>
            <Box my={2}>
              {user ? children : <SignIn user={user} />}
            </Box>
          </Container>
          <footer>
            <Box mt={4} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                © 2024 Rabia Ghafoor. All rights reserved.
              </Typography>
            </Box>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
