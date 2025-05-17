import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Button, Box, Typography, Autocomplete, List, ListItem, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import type { Ingredient, Product } from "../../types";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from "../../store";

type Props = {
    open: boolean;
    product?: Product;
    onSave: (productForm: Product) => void;
    onClose: () => void;
};

export default function EditProductModal({ open, product, onSave, onClose }: Props) {
    const { ingredients } = useStore();
    const [productForm, setProductForm] = useState(product as Product);
    const [newIngredientId, setNewIngredientId] = useState(""); // New ingredient input
    const [newAmount, setNewAmount] = useState(0); // New amount input

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name.includes(".")) {
            setProductForm((prev) => {
                const [field, lang] = name.split(".");
                return {...prev, [field]: {...prev[field], [lang]: value }};
            });
            return;
        }
        setProductForm({ ...productForm, [name]: value });
    };

    function handleAddIngredient() {
        setProductForm((prev) => ({
            ...prev,
            recipe: [
                ...prev.recipe,
                {
                    ingredient: ingredients.find(ingredient => ingredient._id === newIngredientId) as Ingredient,
                    amount: newAmount
                }
            ]
        }));
        setNewIngredientId(""); // Clear input
        setNewAmount(0); // Clear amount
    };
    
    function handleDeleteIngredient(ingredientId: string) {
        setProductForm((prev) => ({
            ...prev,
            recipe: prev.recipe.filter(item => item.ingredient._id !== ingredientId)
        }));
    };

    return (
        <Dialog open={open} fullWidth maxWidth="lg">
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="name.en" label="Name (EN)" value={productForm.name.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="name.pt" label="Name (PT)" value={productForm.name.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="intro.en" label="Intro (EN)" value={productForm.intro.en} onChange={handleChange} size="small" multiline fullWidth/>
                    <TextField name="intro.pt" label="Intro (PT)" value={productForm.intro.pt} onChange={handleChange} size="small" multiline fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="description.en" label="Description (EN)" value={productForm.description.en} onChange={handleChange} size="small" multiline fullWidth/>
                    <TextField name="description.pt" label="Description (PT)" value={productForm.description.pt} onChange={handleChange} size="small" multiline fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="serve.en" label="Serve (EN)" value={productForm.serve.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="serve.pt" label="Serve (PT)" value={productForm.serve.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="store.en" label="Store (EN)" value={productForm.store.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="store.pt" label="Store (PT)" value={productForm.store.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                
                <TextField name="workHours" label="Work Hours" value={productForm.workHours} onChange={handleChange} type="number" size="small" />
                <TextField name="electricityHours" label="Electricity Hours" value={productForm.electricityHours} onChange={handleChange} type="number" size="small" />
                <TextField name="image" label="Image" value={productForm.images[0]} onChange={handleChange} size="small"/>
                
                <Box>
                    <Typography variant="body2">Ingredients:</Typography>
                    <List>
                        {productForm.recipe.map((item) => (
                        <ListItem key={item.ingredient._id} dense>
                            <Typography variant="body2">{item.ingredient.name}: {item.amount} {item.ingredient.recipeUnits}</Typography>
                            <IconButton onClick={() => handleDeleteIngredient(item.ingredient._id)}>
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
                        value={newAmount}
                        onChange={(e) => setNewAmount(Number(e.target.value))}
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
                <Button onClick={() => onSave(productForm)} startIcon={<DoneIcon />} color="success" variant="contained">
                    Save Changes
                </Button>
                <Button onClick={onClose} startIcon={<CloseIcon />} color="error" variant="outlined">
                    Discard
                </Button>
            </DialogActions>
        </Dialog>
    )
}