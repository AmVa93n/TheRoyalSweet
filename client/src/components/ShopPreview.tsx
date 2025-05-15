import { useState, useEffect } from 'react';
import { Grid as Grid2, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import appService from '../services/app.service'
import { useNavigate, Link } from "react-router-dom";
import type { Product } from '../types';
import { calculatePrice } from '../utils';
import { useStore } from '../store';

function ShopPreview() {
    const [products, setProducts] = useState([] as Product[]);
    const { language } = useStore()
    const navigate = useNavigate();

    useEffect(() => {
        async function init() {
          try {
            const products = await appService.getProducts()
            const preview = products.sort(() => 0.5 - Math.random()).slice(0, 4);
            setProducts(preview)
          } catch (error) {
            alert(`Error fetching products: ${error}`)
          }
        }
        init()
    }, [])

    function handleCardClick(event: React.MouseEvent) {
        const productId = (event.target as HTMLElement).id
        navigate(`/product/${productId}`);
    }

    return (
        <Box my={2}>
            <Typography variant="h4" textAlign={'center'} fontFamily={'Montserrat'} fontStyle={'italic'}>
                {language === 'en' ? 'Our Dessers' : 'Os Nossos Doces'}
            </Typography>

            <Grid2 container spacing={3} sx={{ p: 4, justifyContent: 'center' }}>
                {products.map((product) => (
                <Grid2 columns={{xs: 12, sm: 6, md: 4}} key={product._id}>
                    <Card sx={{width: 340}}>
                        <CardMedia
                            component="img"
                            alt={product._id}
                            height="250"
                            image={product.images[0]}
                            sx={{ objectFit: 'cover', cursor: 'pointer' }}
                            onClick={handleCardClick}
                            id={product._id}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name[language]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {language === 'en' ? 'from' : 'A partir de '} €{calculatePrice(product).price}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                ))}
            </Grid2>
            
            <Button
                variant="contained"
                sx={{ 
                    textTransform: 'none', 
                    borderRadius: 25, 
                    width: 180, 
                    display: 'block', 
                    mx: 'auto', 
                    textAlign: 'center', 
                    bgcolor: 'transparent',
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat',
                    fontStyle: 'italic',
                }}
                disableElevation
                component={Link}
                to="/shop"
            >
                {language === 'en' ? 'See more...' : 'Ver Mais...'}
            </Button>
            
        </Box>
    );
}

export default ShopPreview;