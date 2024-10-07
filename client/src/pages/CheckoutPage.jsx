import { useState, useContext } from 'react';
import { Container, Box, Button, Card, CardContent, Divider, Grid2, TextField, Typography } from '@mui/material';
import { CartContext } from '../context/cart.context';
import { LanguageContext } from '../context/language.context';

function CheckoutPage() {
    const { cart } = useContext(CartContext)
    const { language } = useContext(LanguageContext)
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price[item.size] * item.quantity, 0);
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
    });

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
    });

    function handleShippingChange(e) {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    function handlePaymentChange(e) {
        const { name, value } = e.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    };

    function handleSubmit() {
        // Handle the form submission logic here (e.g., send to server)
        console.log('Order submitted:', { shippingAddress, paymentDetails });
    };

    return (
        <Container sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            
            <Grid2 container spacing={4} columns={{ xs: 6, md: 12 }}>

                {/* Shipping and Payment Information */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Shipping Information
                        </Typography>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={shippingAddress.name}
                            onChange={handleShippingChange}
                        />
                        <TextField
                            label="Address"
                            fullWidth
                            margin="normal"
                            name="address"
                            value={shippingAddress.address}
                            onChange={handleShippingChange}
                        />
                        <TextField
                            label="City"
                            fullWidth
                            margin="normal"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleShippingChange}
                        />
                        <TextField
                            label="Zip Code"
                            fullWidth
                            margin="normal"
                            name="zip"
                            value={shippingAddress.zip}
                            onChange={handleShippingChange}
                        />
                        </CardContent>
                    
                        <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Payment Information
                        </Typography>
                        <TextField
                            label="Card Number"
                            fullWidth
                            margin="normal"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handlePaymentChange}
                        />
                        <TextField
                            label="Expiry Date (MM/YY)"
                            fullWidth
                            margin="normal"
                            name="cardExpiry"
                            value={paymentDetails.cardExpiry}
                            onChange={handlePaymentChange}
                        />
                        <TextField
                            label="CVC"
                            fullWidth
                            margin="normal"
                            name="cardCvc"
                            value={paymentDetails.cardCvc}
                            onChange={handlePaymentChange}
                        />
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
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h6">Total: {totalAmount} €</Typography>
                    </CardContent>
                </Card>
                </Grid2>
            </Grid2>

            {/* Submit Button */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" sx={{textTransform: 'none', borderRadius: 25}} onClick={handleSubmit}>
                Place Order
                </Button>
            </Box>
        </Container>
    );
};

export default CheckoutPage;