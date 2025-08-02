import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, ListIcon, StorefrontIcon, ShoppingBagIcon, PhoneIcon, ChefHatIcon, ForkKnifeIcon, PencilCircleIcon } from '@phosphor-icons/react';
import { useStore } from '../store';
import Cart from './Cart';
import FacebookLogo from '../assets/icons8-facebook.svg';
import InstagramLogo from '../assets/icons8-instagram-logo.svg';
import Logo from '../assets/the-royal-sweet-high-resolution-logo-transparent.png';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { language, setLanguage, cart, isCartOpen, setIsCartOpen } = useStore();
  const location = useLocation();

  const navLinks = [
    { text: language === 'en' ? 'Shop' : 'Loja', route: '/shop', icon: <StorefrontIcon size={24} /> },
    { text: language === 'en' ? 'Orders' : 'Encomendas', route: '/', sectionId: 'how-to-order', icon: <ShoppingBagIcon size={24} /> },
    { text: language === 'en' ? 'Contacts' : 'Contactos', route: '/', sectionId: 'contacts', icon: <PhoneIcon size={24} /> },
    { text: language === 'en' ? 'About me' : 'Sobre mim', route: '/', sectionId: 'aboutme', icon: <ChefHatIcon size={24} /> },
    { text: 'Menu', route: '/menu', icon: <ForkKnifeIcon size={24} /> },
    { text: language === 'en' ? 'Blog' : 'Blogue', route: `https://theroyalsweet.com/${language === 'en' ? 'en/' : ''}`, external: true, icon: <PencilCircleIcon size={24} /> },
  ];

  function scrollToSection(sectionId?: string) {
    if (!sectionId || location.pathname !== '/') return;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header className="fixed w-full bg-[#643843] shadow z-50">
      <div className="container mx-auto px-3 py-2 flex items-center justify-between">
        {/* Mobile menu icon */}
        <button onClick={() => setDrawerOpen(!drawerOpen)} className="md:hidden">
          <ListIcon size={28} className='text-white' />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="The Royal Sweet Logo" className="w-12 h-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.route}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-gray-800 hover:text-primary flex items-center gap-1 hover:bg-pink-100 hover:text-[#643843] px-2 py-1 rounded transition-colors rounded-full text-white"
                target={link.external ? '_blank' : undefined}
              >
                {link.icon}
                {link.text}
              </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex border border-[#e6dcd5] rounded-full overflow-hidden text-sm">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 flex items-center gap-1 ${language === 'en' ? 'bg-[#e6dcd5]' : 'cursor-pointer text-white'}`}
            >
              <img src="https://flagcdn.com/w20/gb.png" alt="EN" /> EN
            </button>
            <button
              onClick={() => setLanguage('pt')}
              className={`px-2 py-1 flex items-center gap-1 ${language === 'pt' ? 'bg-[#e6dcd5]' : 'cursor-pointer text-white'}`}
            >
              <img src="https://flagcdn.com/w20/pt.png" alt="PT" /> PT
            </button>
          </div>

          {/* Social Icons */}
          <a href="https://www.facebook.com/profile.php?id=100087485048469" target="_blank" rel="noopener noreferrer">
            <img src={FacebookLogo} alt="Facebook" className="w-8 h-8" />
          </a>
          <a href="https://www.instagram.com/theroyalsweetblog/" target="_blank" rel="noopener noreferrer">
            <img src={InstagramLogo} alt="Instagram" className="w-8 h-8" />
          </a>

          {/* Cart Icon */}
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative cursor-pointer">
            <ShoppingCartIcon size={24} className='text-white' />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden bg-[#e6dcd5] border-t shadow p-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.text}
                  href={link.route}
                  target="_blank"
                  className="text-[#643843]"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.text}
                </a>
              ) : (
                <Link
                  key={link.text}
                  to={link.route}
                  onClick={() => {
                    scrollToSection(link.sectionId);
                    setDrawerOpen(false);
                  }}
                  className="text-[#643843]"
                >
                  {link.text}
                </Link>
              )
            ))}
          </nav>
        </div>
      )}

      {/* Cart Drawer */}
      <Cart />
    </header>
  );
}

export default Navbar;