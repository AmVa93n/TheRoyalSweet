import ShopPreview from '../../src/components/ShopPreview';
import Testimonials from '../../src/components/Testimonials';
import AboutMe from '../../src/components/AboutMe'
import Contacts from '../../src/components/Contacts'
import HowToOrder from '../components/HowToOrder';

function HomePage() {
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
