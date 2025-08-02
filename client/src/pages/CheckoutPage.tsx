import { useState } from 'react';
import { Container, Box, Card, CardContent, Divider, Grid as Grid2, TextField, Typography, FormControlLabel, Switch, Button } from '@mui/material';
import { useStore } from '../store';
import appService from '../services/app.service'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import type { Order } from '../types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
    const { language, cart } = useStore()
    const [orderData, setOrderData] = useState<Omit<Order, '_id' | 'createdAt' | 'additionalIngredients'>>({
        name: '',
        email: '',
        deliveryDate: dayjs(new Date()).format('YYYY-MM-DD'),
        pickup: false,
        shipping: {
            address: '',
            city: '',
            zip: '',
        },
        items: cart
    });
    const deliveryFee = orderData.pickup ? 0 : 5
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryFee
    const [clientSecret, setClientSecret] = useState('');
    
    function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setOrderData((prev) => ({ ...prev, [name]: value }));
    };

    async function createPayment() {
        if (!orderData.name || !orderData.email) {
            alert('Please fill your name and email')
            return
        }

        const { pickup, shipping } = orderData;
        if (!pickup && (!shipping.city || !shipping.address || !shipping.zip)) {
            alert('Missing shipping information!')
            return
        }

        const response = await appService.placeOrder(orderData);
        const { client_secret } = await response;
        setClientSecret(client_secret);
    };

    const stripeOptions = {
        appearance: {
          theme: 'stripe', 
        },
        clientSecret: clientSecret
    } as StripeElementsOptions;

    return (
        <Container className='pt-24'>
            
            <Grid2 container spacing={4} columns={{ xs: 6, md: 12 }}>

                {/* Shipping and Payment Information */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                name="name"
                                value={orderData.name}
                                onChange={handleDataChange}
                                variant="filled"
                                size='small'
                                disabled={!!clientSecret}
                            />
                            <TextField
                                label="Email Address"
                                name="email"
                                margin="normal"
                                fullWidth
                                autoComplete="email"
                                value={orderData.email}
                                onChange={handleDataChange}
                                variant="filled"
                                size='small'
                                disabled={!!clientSecret}
                                />
                        </CardContent>

                        {/* Date Picker */}
                        <CardContent>
                            <label className="block mb-1 font-semibold">{language === 'en' ? 'Date of delivery' : 'Data de entrega'}</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                value={dayjs(orderData.deliveryDate)}
                                onChange={(newValue) => newValue && setOrderData((prev) => ({ ...prev, deliveryDate: newValue?.format('YYYY-MM-DD') }))}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                    className: 'w-72 bg-white rounded border'
                                    }
                                }}
                                />
                            </LocalizationProvider>
                        </CardContent>

                        {/* Switch to toggle between Delivery and Self Pickup */}
                        <CardContent>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={orderData.pickup}
                                        onChange={() => setOrderData((prev) => ({ ...prev, pickup: !prev.pickup }))}
                                        color="primary"
                                    />
                                }
                                label={"Self Pickup"}
                            />
                        </CardContent>

                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Shipping Information
                            </Typography>
                            
                            <TextField
                                label="Address"
                                fullWidth
                                margin="normal"
                                name="address"
                                value={orderData.shipping.address}
                                onChange={handleDataChange}
                                disabled={orderData.pickup || !!clientSecret}
                                variant="filled"
                                size='small'
                            />
                            <TextField
                                label="City"
                                fullWidth
                                margin="normal"
                                name="city"
                                value={orderData.shipping.city}
                                onChange={handleDataChange}
                                disabled={orderData.pickup || !!clientSecret}
                                variant="filled"
                                size='small'
                            />
                            <TextField
                                label="Zip Code"
                                fullWidth
                                margin="normal"
                                name="zip"
                                value={orderData.shipping.zip}
                                onChange={handleDataChange}
                                disabled={orderData.pickup || !!clientSecret}
                                variant="filled"
                                size='small'
                            />
                        </CardContent>
                    
                        <CardContent>
                            {clientSecret ?  

                            <Elements stripe={stripePromise} options={stripeOptions}>
                                <PaymentForm />
                            </Elements> :

                            <Button 
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: 'none', my: 2, borderRadius: 25 }}
                            onClick={createPayment}
                            >
                                Proceed to Payment
                            </Button>}
                            
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Order Summary */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                <Card>
                    <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {cart.map((item) => (
                        <Box key={item.product._id} display="flex" sx={{ mb: 2, alignItems: 'center' }}>
                            <Box sx={{mr: 2}}>
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product._id}
                                    style={{ width: 40, height: 40 }}
                                    />
                            </Box>
                            <Typography flexGrow={1}>{item.product.name[language]} x {item.quantity}</Typography>
                            <Typography>{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</Typography>
                        </Box>
                    ))}
                    <Box display="flex" sx={{ mb: 2, alignItems: 'center' }}>
                        <Typography flexGrow={1}>Delivery fee</Typography>
                        <Typography>{deliveryFee.toFixed(2).replace('.', ',')} €</Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h6">Total: {totalAmount} €</Typography>
                    </CardContent>
                </Card>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default CheckoutPage;