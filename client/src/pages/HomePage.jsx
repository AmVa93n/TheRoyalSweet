import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  './carousel1.jpg',
  './carousel2.jpg',
  './carousel3.jpg',
];

function HomePage() {
  return (
    <Box>
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
  );
}

export default HomePage;
