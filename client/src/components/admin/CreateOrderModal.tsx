import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Button, Box, Typography, Autocomplete, List, ListItem, Dialog, DialogContent, DialogActions, Switch } from "@mui/material";
import { useState } from "react";
import type { Product, Order, CartItem } from "../../types";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { calculatePrice } from "../../utils";

type Props = {
    open: boolean;
    products: Product[];
    onSave: (orderForm: Order) => void;
    onClose: () => void;
};

export default function CreateOrderModal({ open, products, onSave, onClose }: Props) {
    const [orderForm, setOrderForm] = useState<Order>({
        name: "",
        email: "",
        pickup: false,
        shipping: {
            city: "",
            address: "",
            zip: ""
        },
        items: [] as CartItem[],
    } as Order);
    const [newProductId, setNewProductId] = useState("");
    const [newAmount, setNewAmount] = useState(0);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name.includes(".")) {
            setOrderForm((prev) => {
                const address_component = name.split(".")[1];
                return {...prev, ['shipping']: {...prev['shipping'], [address_component]: value }};
            });
            return;
        }
        setOrderForm(prev => ({ ...prev, [name]: value }));
    };

    function handleAddItem() {
        const product = products.find(product => product._id === newProductId)!;
        const { price } = calculatePrice(product)
        setOrderForm(prev => ({ ...prev, items: [...prev.items, { product: product, quantity: newAmount, price: price, size: 'small' }] }));
        setNewProductId(""); // Clear input
        setNewAmount(0); // Clear amount
    };
    
    function handleDeleteItem(itemIndex: number) {
        setOrderForm(prev => ({ ...prev, items: prev.items.filter((_, index) => index !== itemIndex) }));
    };

    function handleDiscard() {
        setOrderForm({
            name: "",
            email: "",
            pickup: false,
            shipping: {
                city: "",
                address: "",
                zip: ""
            },
            items: [] as CartItem[],
        } as Order);
        onClose();
    };

    return (
        <Dialog open={open} fullWidth maxWidth="lg">
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" label="Name" value={orderForm.name} onChange={handleChange} size="small" fullWidth/>
                <TextField name="email" label="Email" value={orderForm.email} onChange={handleChange} size="small" fullWidth/>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="shipping.city" label="City" value={orderForm.shipping.city} onChange={handleChange} size="small" multiline fullWidth/>
                    <TextField name="shipping.address" label="Address" value={orderForm.shipping.address} onChange={handleChange} size="small" multiline fullWidth/>
                    <TextField name="shipping.zip" label="ZIP Code" value={orderForm.shipping.zip} onChange={handleChange} size="small" multiline fullWidth/>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Switch
                        name="pickup"
                        checked={orderForm.pickup}
                        onChange={e => setOrderForm({ ...orderForm, pickup: e.target.checked })}
                        color="primary"
                    />
                    <Typography variant="body2">Pickup</Typography>
                </Box>
                
                <Box>
                    <Typography variant="body2">Items:</Typography>
                    <List>
                        {orderForm.items.map((item, index) => (
                        <ListItem key={index} dense sx={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <Typography variant="body2">{item.product.name.pt} x {item.quantity}</Typography>
                            <Typography variant="body2">
                                {calculatePrice(item.product).price * item.quantity} € ( {calculatePrice(item.product).price} € x {item.quantity} )
                            </Typography>
                            <IconButton onClick={() => handleDeleteItem(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Autocomplete
                        options={products}
                        getOptionLabel={(option) => option.name.pt}
                        value={products.find(product => product._id === newProductId) || null}
                        onChange={(_, newValue) => setNewProductId(newValue?._id || "")}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Select Product" size="small" />
                        )}
                        sx={{ width: 300 }}
                    />
                    <TextField
                        value={newAmount}
                        onChange={(e) => setNewAmount(Number(e.target.value))}
                        placeholder="Amount"
                        type="number"
                        size="small"
                        sx={{ width: 100 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => handleAddItem()}
                        startIcon={<AddIcon />}
                        disabled={newProductId === "" || newAmount <= 0}
                    >
                        Add
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => onSave(orderForm)} startIcon={<DoneIcon />} color="success" variant="contained">
                    Save Order
                </Button>
                <Button onClick={handleDiscard} startIcon={<CloseIcon />} color="error" variant="outlined">
                    Discard
                </Button>
            </DialogActions>
        </Dialog>
    )
}