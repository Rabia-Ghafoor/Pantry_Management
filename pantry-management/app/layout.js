// /app/layout.js
import React from 'react';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import './globals.css';

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pantry Management
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
  );
};

export default Layout;
