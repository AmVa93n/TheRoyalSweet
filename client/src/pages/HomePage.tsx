import { Stack } from '@mui/material';
import ShopPreview from '../../src/components/ShopPreview';
import Testimonials from '../../src/components/Testimonials';
import AboutMe from '../../src/components/AboutMe'
import Contacts from '../../src/components/Contacts'
import HowToOrder from '../components/HowToOrder';

function HomePage() {
  return (
    <Stack sx={{pt: 8}}>
      
      <ShopPreview />

      <Testimonials />

      <HowToOrder />

      <Contacts />
    
      <AboutMe />

    </Stack>
  );
}

export default HomePage;
