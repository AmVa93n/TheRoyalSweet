import { Container, Grid as Grid2, Card, CardMedia, CardContent, Typography, Button, Box, ListItemText } from '@mui/material';
import { useStore } from '../store';
import { useNavigate } from "react-router-dom";
import type { Category } from '../types';
import { calculatePrice } from '../utils';

const categories: {cat: Category, en: string, pt: string}[] = [
    {cat: 'cake', en: 'Cakes', pt: 'Bolos'}, 
    {cat: 'pie', en: 'Pies', pt: 'Tartes'},
    {cat: 'cheesecake', en: 'Cheesecakes', pt: 'Cheesecakes'},
    {cat: 'dessert', en: 'Desserts', pt: 'Sobremesas'},
    {cat: 'mini', en: 'Minis', pt: 'Individuais'},
];

function ShopPage() {
    const { language, products } = useStore()
    const navigate = useNavigate();

    function handleCardClick(event: React.MouseEvent<HTMLElement>) {
        const productId = (event.target as HTMLElement).id
        navigate(`/product/${productId}`);
    }

    return (
        <Container sx={{mt: 10}}>
            {/* Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 3, width: '70%', mx: 'auto' }}>
                {categories.map((category) => (
                <Button
                    key={category.cat}
                    onClick={() => document.getElementById(category.cat)?.scrollIntoView({ behavior: 'smooth' })}
                    sx={{textTransform: 'none'}}
                >
                    {category[language]}
                </Button>
                ))}
            </Box>

            {/* Fixed Category List */}
            <Box
                sx={{
                    position: 'fixed',
                    top: '40%', // Adjust according to your header height
                    left: 0,
                    padding: 1,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                {categories.map((category) => (
                    <Button
                        key={category.cat}
                        onClick={() => document.getElementById(category.cat)?.scrollIntoView({ behavior: 'smooth' })}
                        sx={{textTransform: 'none', textAlign: 'left'}}
                    >
                    <ListItemText primary={category[language]} />
                    </Button>
                ))}
                </Box>
            </Box>

            {/* Category Sections */}
            {categories.map((category) => (
                <Box key={category.cat} id={category.cat} sx={{ my: 5 }}>
                    <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>{category[language]}</Typography>
                    {/* Add your product cards or content for each category here */}
                    
                    <Grid2 container spacing={3} sx={{ p: 4, justifyContent: 'center' }}>
                        {products.filter(product => product.category === category.cat).map((product) => (
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
                    
                </Box>
            ))}

            {/* Return to Top Button */}
            <Button
                color="primary"
                variant='contained'
                aria-label="scroll back to top"
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                sx={{
                    textTransform: 'none', 
                    borderRadius: 25, 
                    mb: 2,
                    display: 'block',
                    width: 'fit-content',
                    mx: 'auto'
                }}
            >
                Back to top
            </Button>
        </Container>
    );
}
  
export default ShopPage;