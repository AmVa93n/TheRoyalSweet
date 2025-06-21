import { Grid as Grid2, Typography, Box, Button } from '@mui/material';
import { Link } from "react-router-dom";
import { useStore } from '../store';
import ProductCard from './ProductCard';

function ShopPreview() {
    const { language, products } = useStore()
    const preview = products.sort(() => 0.5 - Math.random()).slice(0, 4);

    return (
        <Box my={2}>
            <Typography variant="h4" textAlign={'center'} fontFamily={'Montserrat'} fontStyle={'italic'}>
                {language === 'en' ? 'Our Desserts' : 'Os Nossos Doces'}
            </Typography>

            <Grid2 container spacing={3} sx={{ p: 4, justifyContent: 'center' }}>
                {preview.map((product) => (
                <Grid2 columns={{xs: 12, sm: 6, md: 4}} key={product._id}>
                    <ProductCard product={product} />
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