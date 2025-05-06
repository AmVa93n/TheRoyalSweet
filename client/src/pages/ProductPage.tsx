import { Container, Box, Typography, Button, Grid as Grid2, Select, MenuItem, FormControl, FormLabel, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/language.context';
import { CartContext } from '../context/cart.context';
import appService from '../services/app.service'
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Link } from 'react-router-dom';
import type { Product, Size } from '../types';

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState({} as Product)
    const [size, setSize] = useState<Size>('small')
    const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs())
    const [quantity, setQuantity] = useState(1)
    const { language } = useContext(LanguageContext)
    const { addProduct } = useContext(CartContext)

    useEffect(() => {
        async function init() {
            try {
                const product = await appService.getProduct(productId || '')
                setProduct(product)
            } catch (error) {
                alert(`Error: ${error}`)
            }
        }
        init()
    }, [productId]);
    
    return (
        <Container sx={{ py: 4, mt: 7 }}>
            <Grid2 container spacing={4} columns={{ xs: 6, md: 12 }}>
                {/* Product Image */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <img
                        src={product.images?.[0]}
                        alt={product._id}
                        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                        />
                    </Box>

                    {/* Product Description */}
                    <Typography variant="body1" sx={{ mb: 4, fontWeight: 'bold' }}>
                                {product.intro?.[language]}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        <b>{language === 'en' ? 'Description' : 'Descrição'}:</b> {product.description?.[language]}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        <b>{language === 'en' ? 'Serve' : 'Servir'}:</b> {product.serve?.[language]}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        <b>{language === 'en' ? 'Store' : 'Conservar'}:</b> {product.store?.[language]}
                    </Typography>
                </Grid2>

                {/* Order Info */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    {/* Product Title */}
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        {product.name?.[language]}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            {product.price?.[size].toFixed(2).replace('.', ',')} €
                        </Typography>
                        
                        <FormControl sx={{ mb: 2 }}>
                            <FormLabel id="size">{language === 'en' ? 'Size' : 'Tamanho'}</FormLabel>
                            <Select
                                size='small'
                                labelId='size'
                                sx={{ width: 300, bgcolor: 'white' }} 
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                MenuProps={{disableScrollLock: true}}
                                >
                                <MenuItem value={'small'}>{language === 'en' ? 'Small' : 'Pequeno'}</MenuItem>
                                <MenuItem value={'medium'}>{language === 'en' ? 'Medium' : 'Médio'}</MenuItem>
                                <MenuItem value={'big'}>{language === 'en' ? 'Big' : 'Grande'}</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ mb: 2 }}>
                            <FormLabel>{language === 'en' ? 'Date of delivery' : 'Data de entrega'}</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    sx={{width: 300, bgcolor: 'white'}}
                                    format='DD/MM/YYYY'
                                />
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl sx={{ mb: 3 }}>
                            <FormLabel>{language === 'en' ? 'Quantity' : 'Quantidade'}</FormLabel>
                            <TextField
                                sx={{width: 100, bgcolor: 'white'}}
                                type='number'
                                slotProps={{htmlInput: { min: 1, max: 99 }}}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                size='small'
                            />
                        </FormControl>

                        {/* Add to Cart Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ShoppingCartIcon />}
                            sx={{ textTransform: 'none', mb: 2, borderRadius: 25, width: 200, ml: 7 }}
                            onClick={()=> addProduct(product, size, quantity)}
                        >
                            {language === 'en' ? 'Add to Cart' : 'Adicionar ao carrinho'}
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>

            <Box sx={{width: {xs: '100%', md: '35%'}, mx: 'auto', display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', mb: 2, borderRadius: 25, width: 180 }}
                    component={Link}
                    to="/shop"
                >
                    {language === 'en' ? 'Continue Shopping' : 'Continuar a comprar'}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', mb: 2, borderRadius: 25, width: 180 }}
                    component={Link}
                    to="/checkout"
                >
                    {language === 'en' ? 'Proceed to Checkout' : 'Aceder ao checkout'}
                </Button>
            </Box>
        </Container>
    );
}

export default ProductPage;