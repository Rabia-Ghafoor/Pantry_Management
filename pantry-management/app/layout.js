'use client'
import React from 'react';
import {Container, AppBar, Toolbar, Typography, Box, } from '@mui/material';
import { FirebaseAppProvider } from 'reactfire';



const Layout = ({ children }) => {
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={2}>
          {children}
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