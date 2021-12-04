import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { Link } from 'react-router-dom';

import './navbar.css';

const NavBar = ({ isLoggedIn, logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    logoutUser();
    setAnchorEl(null);
  };

  // Menu when user is logged in
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      // id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <a href="/" className="favicon">
            <img
              src="../../logo.png"
              alt="favicon"
              className="navbar__favicon"
            />
          </a>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <a href="/" className="logotext">
              Tracker
            </a>
          </Typography>

          {isLoggedIn && (
            <div>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <Button color="inherit" component={Link} to="/login">
                <span className="button">Login</span>
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                <span className="button">Signup</span>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default NavBar;
