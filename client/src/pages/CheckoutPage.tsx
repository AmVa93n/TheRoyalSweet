import { useState, useContext } from 'react';
import { Container, Box, Card, CardContent, Divider, Grid as Grid2, TextField, Typography, FormControlLabel, Switch, Button } from '@mui/material';
import { CartContext } from '../context/cart.context';
import { LanguageContext } from '../context/language.context';
import appService from '../services/app.service'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
    const { cart } = useContext(CartContext)
    const { language } = useContext(LanguageContext)
    const [isPickup, setIsPickup] = useState(false);
    const deliveryFee = isPickup ? 0 : 5
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price[item.size] * item.quantity, 0) + deliveryFee
    const [orderData, setOrderData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
    });
    const [clientSecret, setClientSecret] = useState('');
    
    function handleDataChange(e) {
        const { name, value } = e.target;
        setOrderData((prev) => ({ ...prev, [name]: value }));
    };

    async function createPayment() {
        if (!orderData.name || !orderData.email) {
            alert('Please fill your name and email')
            return
        }

        if (!isPickup && (!orderData.city || !orderData.address || !orderData.zip)) {
            alert('Missing shipping information!')
            return
        }

        const requestBody = {
        cart, 
        orderData: !isPickup ? orderData : null,
        deliveryFee
        };

        const response = await appService.placeOrder(requestBody);
        const { client_secret } = await response;
        setClientSecret(client_secret);
    };

    const stripeOptions = {
        appearance: {
          theme: 'stripe', 
        },
        clientSecret: clientSecret || null
    };

    return (
        <Container sx={{ padding: 4, mt: 7 }}>
            
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

                        {/* Switch to toggle between Delivery and Self Pickup */}
                        <CardContent>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isPickup}
                                        onChange={() => setIsPickup(!isPickup)}
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
                                value={orderData.address}
                                onChange={handleDataChange}
                                disabled={isPickup || !!clientSecret}
                                variant="filled"
                                size='small'
                            />
                            <TextField
                                label="City"
                                fullWidth
                                margin="normal"
                                name="city"
                                value={orderData.city}
                                onChange={handleDataChange}
                                disabled={isPickup || !!clientSecret}
                                variant="filled"
                                size='small'
                            />
                            <TextField
                                label="Zip Code"
                                fullWidth
                                margin="normal"
                                name="zip"
                                value={orderData.zip}
                                onChange={handleDataChange}
                                disabled={isPickup || !!clientSecret}
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
                                    alt={item.product.name[language]}
                                    style={{ width: 40, height: 40 }}
                                    />
                            </Box>
                            <Typography flexGrow={1}>{item.product.name[language]} x {item.quantity}</Typography>
                            <Typography>{(item.product.price[item.size] * item.quantity).toFixed(2).replace('.', ',')} €</Typography>
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