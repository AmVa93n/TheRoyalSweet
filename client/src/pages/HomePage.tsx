import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, IconButton, Stack } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ShopPreview from '../../src/components/ShopPreview';
import Testimonials from '../../src/components/Testimonials';
import AboutMe from '../../src/components/AboutMe'
import Contacts from '../../src/components/Contacts'
import Orders from '../../src/components/Orders';
import Footer from '../../src/components/Footer';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';

const images = [
  './carousel1.jpg',
  './carousel2.jpg',
  './carousel3.jpg',
];

function HomePage() {
  const theme = useContext(ThemeContext);

  return (
    <Stack>
      <Box sx={{mt: 8}} id='carousel'>
        <Carousel 
          showThumbs={false} 
          showStatus={false} 
          infiniteLoop 
          autoPlay
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <IconButton
                onClick={onClickHandler}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 10,
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  color: 'white',
                }}
                aria-label={label}
              >
                <ArrowBackIos />
              </IconButton>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <IconButton
                onClick={onClickHandler}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 10,
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  color: 'white',
                }}
                aria-label={label}
              >
                <ArrowForwardIos />
              </IconButton>
            )
          }
          >
          {images.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`Slide ${index + 1}`} style={{ height: '600px', objectFit: 'cover' }}/>
            </div>
          ))}
        </Carousel>
      </Box>

      <Box id='shop' sx={{bgcolor: theme.secondary_bg2}}>
        <ShopPreview />
      </Box>

      <Box id='testimonials' sx={{bgcolor: theme.secondary_bg1}}>
        <Testimonials />
      </Box>

      <Box id='orders' sx={{bgcolor: theme.secondary_bg2}}>
        <Orders />
      </Box>

      <Box id='contacts' sx={{bgcolor: theme.secondary_bg1}}>
        <Contacts />
      </Box>

      <Box id='aboutme' sx={{bgcolor: theme.secondary_bg2}}>
        <AboutMe />
      </Box>

      <Footer />
    </Stack>
  );
}

export default HomePage;
