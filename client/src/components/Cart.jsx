import { Typography, Box, Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, IconButton } from '@mui/material';
import { CartContext } from '../context/cart.context';
import { LanguageContext } from '../context/language.context';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Cart() {
    const { cart, removeProduct, changeQuantity, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext)
    const { language } = useContext(LanguageContext)

    return (
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(!isDrawerOpen)}
          sx={{ width: 350 }}
        >
          <Box
            sx={{ width: 350, padding: 2 }}
            role="presentation"
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Cart
            </Typography>

            <List>
              {cart.map((item) => (
                <ListItem key={item.product._id} sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* Product Image */}
                  <ListItemAvatar>
                    <Avatar
                      src={item.product.images[0]}
                      alt={item.product.name[language]}
                      sx={{ width: 64, height: 64, marginRight: 2 }}
                    />
                  </ListItemAvatar>

                  {/* Product Details */}
                  <Box sx={{ flexGrow: 1 }}>
                    <ListItemText
                      primary={item.product.name[language]}
                      secondary={`${item.product.price[item.size].toFixed(2).replace('.', ',')} €`}
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
                        width: 40,
                        '& input[type=number]': {
                            MozAppearance: 'textfield', // Removes arrows in Firefox
                        },
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none', // Removes arrows in Chrome, Safari, Edge, etc.
                            margin: 0,
                        },
                        }}
                        onChange={(e) => changeQuantity(item.product._id, e.target.value)}
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
                    edge="end"
                    color="inherit"
                    onClick={() => removeProduct(item.product._id)}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
    )
}

export default Cart