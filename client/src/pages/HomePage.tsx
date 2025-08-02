import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Stack } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ShopPreview from '../../src/components/ShopPreview';
import Testimonials from '../../src/components/Testimonials';
import AboutMe from '../../src/components/AboutMe'
import Contacts from '../../src/components/Contacts'
import HowToOrder from '../components/HowToOrder';
import { theme } from '../style';

function HomePage() {
  return (
    <Stack sx={{pt: 8}}>
      
      <Box id='shop' sx={{bgcolor: theme.secondary_bg2}}>
        <ShopPreview />
      </Box>

      <Box id='testimonials' sx={{bgcolor: theme.secondary_bg1}}>
        <Testimonials />
      </Box>

      <HowToOrder />

      <Contacts />
    
      <AboutMe />

    </Stack>
  );
}

export default HomePage;
