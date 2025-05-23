import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText, Badge, ToggleButtonGroup,
  ToggleButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../store';
import Cart from './Cart'
import { theme } from '../style';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { language, setLanguage, cart, isCartOpen, setIsCartOpen } = useStore()

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = [
    {text: language === 'en' ? 'Shop' : 'Loja', route: '/shop'}, 
    {text: language === 'en' ? 'Orders' : 'Encomendas', route: '/', sectionId: 'orders'},
    {text: language === 'en' ? 'Contacts' : 'Contactos', route: '/', sectionId: 'contacts'}, 
    {text: language === 'en' ? 'About me' : 'Sobre mim', route: '/', sectionId: 'aboutme'}, 
    {text: 'Menu', route: '/menu'}, 
    {text: language === 'en' ? 'Blog' : 'Blogue', route: "https://theroyalsweet.com/en/"}
  ];

  function scrollToSection(sectionId?: string) {
    const section = document.getElementById(sectionId || '');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="fixed" sx={{bgcolor: theme.primary_bg}}>
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
                <ListItem 
                  key={link.text}
                  component={Link} 
                  to={link.route} 
                  onClick={() => scrollToSection(link.sectionId)}
                  >
                  <ListItemText primary={link.text} />
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
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 2 }}>
          {navLinks.map((link) => (
            <Button 
              key={link.text} 
              sx={{ color: theme.primary_text, fontFamily: 'Montserrat' }}
              component={Link} 
              to={link.route}
              onClick={() => scrollToSection(link.sectionId)}
            >
              {link.text}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={(e) => setLanguage((e.target as HTMLInputElement).value as 'en' | 'pt')}
            aria-label="language switch"
            sx={{ borderRadius: 25, mr: 2 }}
          >
            <ToggleButton 
              value="en" 
              aria-label="English" 
              sx={{ padding: '5px', textTransform: 'none', color: theme.primary_text, fontFamily: 'Montserrat',
                '&.Mui-selected': { color: theme.primary_text }
               }}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/gb.png 2x`}
                src={`https://flagcdn.com/w20/gb.png`}
                alt=""
                style={{marginRight: 5}}
              /> EN
            </ToggleButton>

            <ToggleButton 
              value="pt" 
              aria-label="Portuguese" 
              sx={{ padding: '5px', textTransform: 'none', color: theme.primary_text, fontFamily: 'Montserrat',
                '&.Mui-selected': { color: theme.primary_text }
               }}
            >
              <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/pt.png 2x`}
                  src={`https://flagcdn.com/w20/pt.png`}
                  alt=""
                  style={{marginRight: 5}}
                /> PT
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        

        {/* Social Media Icons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit" href="https://www.facebook.com/profile.php?id=100087485048469" target="_blank">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com/theroyalsweetblog/" target="_blank">
            <InstagramIcon />
          </IconButton>
        </Box>

        {/* Cart Button */}
        <IconButton 
          onClick={() => setIsCartOpen(!isCartOpen)}
          sx={{ml: 2, color: theme.primary_text}}
        >
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;