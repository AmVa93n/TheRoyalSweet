import { Container, Box, Typography, Button, Grid2, Select, MenuItem, FormControl, FormLabel, TextField } from '@mui/material';
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

function ProductPage() {
    let { productId } = useParams();
    const [product, setProduct] = useState({})
    const [size, setSize] = useState('small')
    const [date, setDate] = useState(dayjs())
    const [quantity, setQuantity] = useState(1)
    const [email, setEmail] = useState('')
    const { language } = useContext(LanguageContext)
    const { addProduct } = useContext(CartContext)

    useEffect(() => {
        async function init() {
            try {
                const product = await appService.getProduct(productId)
                setProduct(product)
            } catch (error) {
                const errorDescription = error.response.data.message;
                alert(errorDescription);
            }
        }
        init()
    }, [productId]);
    
    return (
        <Container sx={{ py: 4 }}>
            <Grid2 container spacing={4}>
                {/* Product Image */}
                <Grid2 size={6}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <img
                        src={product.images?.[0]}
                        alt={product.name?.[language]}
                        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                        />
                    </Box>

                    {/* Product Description */}
                    <Typography variant="body1" sx={{ mb: 4, fontWeight: 'bold' }}>
                                {product.intro?.[language]}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        <b>Description:</b> {product.description?.[language]}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        <b>Serve:</b> {product.serve?.[language]}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        <b>Store:</b> {product.store?.[language]}
                    </Typography>
                </Grid2>

                {/* Order Info */}
                <Grid2 size={6}>
                    {/* Product Title */}
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        {product.name?.[language]}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            {product.price?.[size].toFixed(2).replace('.', ',')} €
                        </Typography>
                        
                        <FormControl sx={{ mb: 2 }}>
                            <FormLabel id="size">Size</FormLabel>
                            <Select
                                size='small'
                                labelId='size'
                                sx={{ width: 300, bgcolor: 'white' }} 
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                MenuProps={{disableScrollLock: true}}
                                >
                                <MenuItem value={'small'}>small</MenuItem>
                                <MenuItem value={'medium'}>medium</MenuItem>
                                <MenuItem value={'big'}>big</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ mb: 2 }}>
                            <FormLabel>Date of delivery</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    sx={{width: 300, bgcolor: 'white'}}
                                    format='DD/MM/YYYY'
                                />
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl sx={{ mb: 2 }}>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                required
                                placeholder="your@email.com"
                                autoComplete="email"
                                sx={{width: 300, bgcolor: 'white'}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size='small'
                            />
                        </FormControl>

                        <FormControl sx={{ mb: 3 }}>
                            <FormLabel>Quantity</FormLabel>
                            <TextField
                                sx={{width: 100, bgcolor: 'white'}}
                                type='number'
                                slotProps={{htmlInput: { min: 1, max: 99 }}}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                size='small'
                            />
                        </FormControl>

                        {/* Add to Cart Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ShoppingCartIcon />}
                            sx={{ textTransform: 'none', mb: 2, borderRadius: 25, width: 180, ml: 7 }}
                            onClick={()=> addProduct(product, size, quantity)}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
            <Box sx={{width: '35%', mx: 'auto', display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', mb: 2, borderRadius: 25, width: 180 }}
                >
                    Continue Order
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', mb: 2, borderRadius: 25, width: 180 }}
                >
                    Proceed to Checkout
                </Button>
            </Box>
        </Container>
    );
}

export default ProductPage;