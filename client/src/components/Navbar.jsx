import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = ['Home', 'Shop', 'About me', 'Contact'];

  return (
    <AppBar position="static" sx={{bgcolor: 'rgb(253, 33, 155)'}}>
      <Toolbar>
        {/* Logo for Desktop */}
        <Typography variant="h6" noWrap sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0 }}>
          LOGO
        </Typography>

        {/* Hamburger Icon for Mobile */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for Mobile Navigation */}
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
          >
            <List>
              {navLinks.map((text) => (
                <ListItem key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Logo for Mobile */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          LOGO
        </Typography>

         {/* Navigation Links for Desktop */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          {navLinks.map((text) => (
            <Button key={text} sx={{ color: 'white', mx: 1, textTransform: 'none' }}>
              {text}
            </Button>
          ))}
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="inherit" href="https://facebook.com" target="_blank">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://instagram.com" target="_blank">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;