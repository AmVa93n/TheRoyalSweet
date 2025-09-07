import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Button, Box, Typography, Autocomplete, List, ListItem, DialogContent, DialogActions, Switch } from "@mui/material";
import { useState } from "react";
import type { Order } from "../../types";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { calculatePrice } from "../../utils";
import { useStore } from "../../store";
import adminService from '../../services/admin.service';

type Props = {
    order: Order;
    onClose: () => void;
};

export default function EditOrder({ order, onClose }: Props) {
    const { products, ingredients, orders, setOrders } = useStore();
    const [orderForm, setOrderForm] = useState<Order>(order as Order);
    const [newProductId, setNewProductId] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState(0);
    const [newIngredientId, setNewIngredientId] = useState("");
    const [newIngredientAmount, setNewIngredientAmount] = useState(0);

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
        setOrderForm(prev => ({ ...prev, items: [...prev.items, { product: product, quantity: newItemQuantity, price: price, size: 'medium' }] }));
        setNewProductId(""); // Clear input
        setNewItemQuantity(0); // Clear amount
    };
    
    function handleDeleteItem(idOrLabel: string) {
        setOrderForm(prev => ({ ...prev, items: prev.items.filter(item => item.product?._id !== idOrLabel || item.customCake?.label !== idOrLabel) }));
    };

    function handleAddIngredient() {
        const ingredient = ingredients.find(ingredient => ingredient._id === newIngredientId)!
        setOrderForm((prev) => ({
            ...prev, additionalIngredients: [...prev.additionalIngredients, { ingredient, amount: newIngredientAmount }]
        }));
        setNewIngredientId(""); // Clear input
        setNewIngredientAmount(0); // Clear amount
    };
        
    function handleDeleteIngredient(ingredientId: string) {
        setOrderForm((prev) => ({
            ...prev,
            recipe: prev.additionalIngredients.filter(item => item.ingredient._id !== ingredientId)
        }));
    };

    async function handleSave(orderForm: Order) {
        try { 
            const updatedOrder = await adminService.updateOrder(orderForm);
            const updatedOrders = orders.map(order => order._id === updatedOrder._id ? updatedOrder : order);
            setOrders(updatedOrders); // Update the orders state with the new order
        } catch (error) {
            console.error("Error saving order:", error);
        }
        onClose(); // Close the modal after saving
    };

    return (
        <div>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" label="Name" value={orderForm.name} onChange={handleChange} size="small" fullWidth/>
                <TextField name="email" label="Email" value={orderForm.email} onChange={handleChange} size="small" fullWidth/>
                <TextField name="deliveryDate" label="Delivery Date" value={orderForm.deliveryDate?.split('T')[0]} onChange={handleChange} size="small" fullWidth/>
                
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
                        {orderForm.items.map((item) => (
                        <ListItem key={item.product?._id || item.customCake?.label} dense sx={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <Typography variant="body2">{item.product?.name.pt || "Bolo Personalizado"} x {item.quantity}</Typography>
                            <Typography variant="body2">
                                {(item.price * item.quantity).toFixed(2)} € ( {item.price.toFixed(2)} € x {item.quantity} )
                            </Typography>
                            <IconButton onClick={() => handleDeleteItem(item.product?._id || item.customCake!.label)}>
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
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                        placeholder="Amount"
                        type="number"
                        size="small"
                        sx={{ width: 100 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => handleAddItem()}
                        startIcon={<AddIcon />}
                        disabled={newProductId === "" || newItemQuantity <= 0}
                    >
                        Add
                    </Button>
                </Box>

                <Box>
                    <Typography variant="body2">Additional Ingredients:</Typography>
                    <List>
                        {orderForm.additionalIngredients.map((entry) => (
                        <ListItem key={entry.ingredient._id} dense>
                            <Typography variant="body2">{entry.ingredient.name}: {entry.amount} {entry.ingredient.recipeUnits}</Typography>
                            <IconButton onClick={() => handleDeleteIngredient(entry.ingredient._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Autocomplete
                        options={ingredients} // Pass the whole ingredient object
                        getOptionLabel={(option) => option.name} // Display the ingredient name in the dropdown
                        value={ingredients.find(ingredient => ingredient._id === newIngredientId) || null} // Find the selected ingredient by ID
                        onChange={(_, newValue) => setNewIngredientId(newValue?._id || "")} // Store the ingredient's ID
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Select Ingredient" size="small" />
                        )}
                        sx={{ width: 300 }}
                    />
                    <TextField
                        value={newIngredientAmount}
                        onChange={(e) => setNewIngredientAmount(Number(e.target.value))}
                        placeholder="Amount"
                        type="number"
                        size="small"
                        sx={{ width: 100 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => handleAddIngredient()}
                        startIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => handleSave(orderForm)} startIcon={<DoneIcon />} color="success" variant="contained">
                    Save Order
                </Button>
                <Button onClick={onClose} startIcon={<CloseIcon />} color="error" variant="outlined">
                    Discard
                </Button>
            </DialogActions>
        </div>
    )
}