import { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../context/cart.context';
import Cart from './Cart'

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDrawerOpen, setIsDrawerOpen } = useContext(CartContext)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = [
    {text: 'Home', route: '/'}, {text: 'About me', route: '/about'}, {text: 'Contact', route: '/contact'}, 
    {text: 'Shop', route: '/shop'}, {text: 'Blog', route: "https://theroyalsweet.com/en/"}
  ];

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
              {navLinks.map((link) => (
                <ListItem key={link.text}>
                  <ListItemText primary={link.text} component={Link} to={link.route} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Cart Drawer */}
        <Cart />

        {/* Logo for Mobile */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          LOGO
        </Typography>

         {/* Navigation Links for Desktop */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          {navLinks.map((link) => (
            <Button key={link.text} sx={{ color: 'white', mx: 1, textTransform: 'none' }} component={Link} to={link.route}>
              {link.text}
            </Button>
          ))}
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="inherit" href="https://www.facebook.com/profile.php?id=100087485048469" target="_blank">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com/theroyalsweetblog/" target="_blank">
            <InstagramIcon />
          </IconButton>
        </Box>

        {/* Cart Button */}
        <IconButton 
          color="inherit" 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          sx={{ml: 2}}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;