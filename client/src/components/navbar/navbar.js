import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

import './navbar.css';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src="../../logo.png" alt="favicon" className="navbar__favicon" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tracker
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
