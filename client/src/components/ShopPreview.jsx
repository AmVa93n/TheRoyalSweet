import { useState, useEffect, useContext } from 'react';
import { Grid2, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import appService from '../services/app.service'
import { LanguageContext } from '../context/language.context';
import { useNavigate, Link } from "react-router-dom";

function ShopPreview() {
    const [products, setProducts] = useState([])
    const { language } = useContext(LanguageContext)
    const navigate = useNavigate();

    useEffect(() => {
        async function init() {
          try {
            const products = await appService.getProducts()
            const preview = products.sort(() => 0.5 - Math.random()).slice(0, 4);
            setProducts(preview)
          } catch (error) {
            const errorDescription = error.response.data.message;
            alert(errorDescription);
          }
        }
        init()
    }, [])

    function handleCardClick(event) {
        const productId = event.target.id
        navigate(`/product/${productId}`);
    }

    return (
        <Box>
            <Typography variant="h4" textAlign={'center'}>
                {language === 'en' ? 'Our Products' : 'Os nossos produtos'}
            </Typography>

            <Grid2 container spacing={3} sx={{ p: 4, justifyContent: 'center' }}>
                {products.map((product) => (
                <Grid2 xs={12} sm={6} md={4} key={product._id}>
                    <Card sx={{width: 340}}>
                        <CardMedia
                            component="img"
                            alt={product.title}
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
                                {language === 'en' ? 'from' : 'A partir de '} €{product.price.small}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                ))}
            </Grid2>
            
            <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none', borderRadius: 25, width: 180, display: 'block', mx: 'auto', textAlign: 'center' }}
                component={Link}
                to="/shop"
            >
                {language === 'en' ? 'See all' : 'Ver todos'}
            </Button>
            
        </Box>
    );
}

export default ShopPreview;