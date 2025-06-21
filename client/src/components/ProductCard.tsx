import type { Product } from "../types";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useStore } from '../store';

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();
    const { language } = useStore()

    function handleCardClick(event: React.MouseEvent<HTMLElement>) {
        const productId = (event.target as HTMLElement).id
        navigate(`/product/${productId}`);
    }

    return (
        <Card sx={{width: 340}}>
            <CardMedia
                component="img"
                alt={product._id}
                height="250"
                image={product.images[0] || 'https://deintortenbild.de/cdn/shop/files/tortenbaender-2-stueck-a-26-x-10-cm-online-designer-910.webp?v=1737648157&width=1000'}
                sx={{ objectFit: 'cover', cursor: 'pointer' }}
                onClick={handleCardClick}
                id={product._id}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.name[language]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description[language]}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProductCard;