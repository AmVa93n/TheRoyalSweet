import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListIcon, ShoppingBagIcon, CakeIcon, EggIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import { useStore, useAdminStore } from '../store';
import Logo from '../assets/the-royal-sweet-high-resolution-logo-transparent.png';
import adminService from '../service';

function AdminNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setProducts, setCakeComponents, setIngredients, setOrders } = useAdminStore();
  const { language, setLanguage } = useStore();

  const navLinks = [
    { text: language === 'en' ? 'Ingredients' : 'Ingredientes', route: '/ingredients', icon: <EggIcon size={24} /> },
    { text: language === 'en' ? 'Products' : 'Produtos', route: '/products', icon: <CakeIcon size={24} /> },
    { text: language === 'en' ? 'Cake Components' : 'Componentes de Bolo', route: '/cake-components', icon: <CakeIcon size={24} /> },
    { text: language === 'en' ? 'Orders' : 'Encomendas', route: '/orders', icon: <ShoppingBagIcon size={24} /> },
    { text: language === 'en' ? 'Grocery List' : 'Lista de Compras', route: '/grocery-list', icon: <ShoppingCartIcon size={24} /> },
  ];

  useEffect(() => {
    adminService.getProducts().then(setProducts);
    adminService.getCakeComponents().then(setCakeComponents);
    adminService.getIngredients().then(setIngredients);
    adminService.getOrders().then(setOrders);
  }, []);

  return (
    <header className="fixed w-full bg-[#593b3e] shadow z-50">
      <div className="container mx-auto px-3 py-2 flex items-center justify-between">
        {/* Mobile menu icon */}
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
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
                className="text-gray-800 hover:text-primary flex items-center gap-1 hover:bg-pink-100 hover:text-[#593b3e] px-2 py-1 rounded transition-colors rounded-full text-white"
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

        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;