import { Typography, Box, Drawer, List, ListItem, ListItemText, TextField, IconButton, 
    Button, Divider } from '@mui/material';
import { CartContext } from '../context/cart.context';
import { useStore } from '../store';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function Cart() {
    const { cart, removeProduct, changeQuantity, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext)
    const { language } = useStore()
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <Box
            sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}
            role="presentation"
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {language === 'en' ? 'Your Cart' : 'Carrinho'}
            </Typography>

            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
              {cart.map((item, index) => (
                <>
                <ListItem key={item.product._id} sx={{ display: 'flex', alignItems: 'center', pl: 0, pr: 4, overflowX: 'hidden' }}>
                  {/* Product Image */}
                  <Box sx={{mr: 2}}>
                  <img
                      src={item.product.images[0]}
                      alt={item.product.name[language]}
                      style={{ width: 80, height: 80 }}
                    />
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ flexGrow: 1 }}>
                    <ListItemText
                      primary={item.product.name[language]}
                      secondary={`${item.size}, ${item.price.toFixed(2).replace('.', ',')} €`}
                    />
                    
                    {/* Quantity Adjuster */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* Circular - Button */}
                        <IconButton
                            onClick={() => changeQuantity(item.product._id, item.quantity - 1)}
                            sx={{ borderRadius: '50%', width: 36, height: 36 }}
                        >
                            -
                        </IconButton>

                        {/* Quantity Input (TextField) */}
                        <TextField
                            value={item.quantity}
                            size='small'
                            type="number"
                            slotProps={{
                                htmlInput: {min: 1, max: 99, style: { textAlign: 'center' }}
                            }}
                            sx={{
                                width: 50,
                                '& input[type=number]': {
                                    MozAppearance: 'textfield', // Removes arrows in Firefox
                                },
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none', // Removes arrows in Chrome, Safari, Edge, etc.
                                    margin: 0,
                                },
                            }}
                            onChange={(e) => changeQuantity(item.product._id, Number(e.target.value))}
                        />

                        {/* Circular + Button */}
                        <IconButton
                            onClick={() => changeQuantity(item.product._id, item.quantity + 1)}
                            sx={{ borderRadius: '50%', width: 36, height: 36 }}
                        >
                            +
                        </IconButton>
                    </Box>

                  </Box>

                  {/* Remove Button */}
                  <IconButton
                    size='small'
                    edge="end"
                    color="inherit"
                    onClick={() => removeProduct(item.product._id)}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
                
                {index < cart.length - 1 && <Divider sx={{ my: 1 }} />}
                </>
              ))}
            </List>

            {/* Footer Section with Total Price and Checkout Button */}
            <Box 
                sx={{ borderTop: '1px solid #ccc', pt: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'left', mb: 2 }}>
                Total: {totalPrice.toFixed(2).replace('.', ',')} €
              </Typography>

              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/checkout"
                sx={{ textTransform: 'none', borderRadius: 25, width: 'fit-content', display: 'block', mx: 'auto' }}
              >
                {language === 'en' ? 'Proceed to Checkout' : 'Aceder ao checkout'}
              </Button>
            </Box>
          </Box>
        </Drawer>
    )
}

export default Cart