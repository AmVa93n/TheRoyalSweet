import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const reviews = [
    {name: 'Francisca X.', text: 'Fiz a encomenda de uma Pavlova de Framboesa que estava absolutamente divinal. Simpatia no atendimento e sabor 5*'},
    {name: 'João A.', text: 'Já tinha ouvido boas recomendações e decidimos encomendar uma pavlova grande, com frutos vermelhos, para fazer a vez dos típicos bolos de batizado. E era divinal! Um saborzinho a leite condensado maravilhoso. Aquela montra dá vontade de trazer um de cada. Atendimento muito simpático. Vou fazer mais encomendas certamente.'},
    {name: 'Beatriz B.', text: 'Só conheci pelo meu bolo de aniversário e foi absolutamente perfeito! Bolo de chocolate com bolinhas de caramelo salgado. Recomendo e vou querer conhecer mais!'},
    {name: 'Ricardo L.', text: 'Encomendei uma delícia de chocolate grande e superou as expectativas... dos melhores bolos de chocolate que já comi. Sabor intenso e denso. Comprei também um de noz individual e também gostei muito. Recomendo e espero voltar em breve para poder experimentar todas as outras especialidades.'},
];

function Testimonials() {
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
            {reviews.map((review, index) => (
                <Box 
                    key={index} 
                    sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'start', 
                        py: 3, px: 25,
                        minHeight: '300px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Background styling
                    }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontStyle: 'italic',
                      textAlign: 'left',
                      mb: 2,
                      fontFamily: 'Montserrat'
                    }}
                  >
                    "{review.text}"
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold', 
                      fontSize: '1rem',
                      fontFamily: 'Montserrat'
                    }}
                  >
                    - {review.name}
                  </Typography>
              </Box>
            ))}
            </Carousel>
        </Box>
  );
}

export default Testimonials;