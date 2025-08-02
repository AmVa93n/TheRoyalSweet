import ShopPreview from '../../src/components/ShopPreview';
import Testimonials from '../../src/components/Testimonials';
import AboutMe from '../../src/components/AboutMe'
import Contacts from '../../src/components/Contacts'
import HowToOrder from '../components/HowToOrder';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.sectionId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const scrollY = (document.getElementById(location.state.sectionId)?.offsetTop || 0) - 60;
          window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }, 0);
      });
    }
  }, [location.state]);

  return (
    <div className="flex flex-col pt-12">
      <ShopPreview />
      <Testimonials />
      <AboutMe />
      <HowToOrder />
      <Contacts />
    </div>
  );
}

export default HomePage;
