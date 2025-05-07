import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Button, Box, Typography, Autocomplete, List, ListItem, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import type { Ingredient, Product } from "../../types";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import adminService from '../../services/admin.service'

type Props = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    ingredients: Ingredient[];
    editRowId: string | null;
    setEditRowId: React.Dispatch<React.SetStateAction<string | null>>;
    editValues: Product;
    setEditValues: React.Dispatch<React.SetStateAction<Product>>;
};

export default function EditRecipe({ products, setProducts, ingredients, editRowId, setEditRowId, editValues, setEditValues }: Props) {
    const [newIngredientId, setNewIngredientId] = useState(""); // New ingredient input
    const [newAmount, setNewAmount] = useState(0); // New amount input

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEditValues({ ...editValues, [name]: value });
    };

    function handleAddIngredient() {
        const updatedProducts = [...products];
        updatedProducts.find(p => p._id === editRowId)?.recipe.push({
          ingredient: ingredients.find(i => i._id === newIngredientId) as Ingredient,
          amount: newAmount,
        });
        setProducts(updatedProducts);
        setNewIngredientId(""); // Clear input
        setNewAmount(0); // Clear amount
    };
    
    function handleDeleteIngredient(ingredientIndex: number) {
        const updatedProducts = [...products];
        updatedProducts.find(p => p._id === editRowId)?.recipe.splice(ingredientIndex, 1);
        setProducts(updatedProducts);
    };

    async function handleSave() {
        const updatedProduct = { ...editValues }; // Use the edit values for the updated product
        setProducts((prev) => 
            prev.map((product) =>
                product._id === editRowId ? { ...product, ...updatedProduct } : product
            )
        );
        setEditRowId(null); // Stop editing mode
        // Use the updated product data to make the API call
        await adminService.updateProduct(updatedProduct);
    };
    
    function handleCancel() {
        setEditRowId(null); // Exit editing mode without saving
    };

    return (
        <Dialog open={!!editRowId} fullWidth maxWidth="lg">
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="name.en" label="Name (EN)" value={editValues.name.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="name.pt" label="Name (PT)" value={editValues.name.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="intro.en" label="Intro (EN)" value={editValues.intro.en} onChange={handleChange} size="small" multiline fullWidth/>
                    <TextField name="intro.pt" label="Intro (PT)" value={editValues.intro.pt} onChange={handleChange} size="small" multiline fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="description.en" label="Description (EN)" value={editValues.description.en} onChange={handleChange} size="small" multiline fullWidth/>
                    <TextField name="description.pt" label="Description (PT)" value={editValues.description.pt} onChange={handleChange} size="small" multiline fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="serve.en" label="Serve (EN)" value={editValues.serve.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="serve.pt" label="Serve (PT)" value={editValues.serve.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField name="store.en" label="Store (EN)" value={editValues.store.en} onChange={handleChange} size="small" fullWidth/>
                    <TextField name="store.pt" label="Store (PT)" value={editValues.store.pt} onChange={handleChange} size="small" fullWidth/>
                </Box>
                
                <TextField name="workHours" label="Work Hours" value={editValues.workHours} onChange={handleChange} type="number" size="small" />
                <TextField name="electricityHours" label="Electricity Hours" value={editValues.electricityHours} onChange={handleChange} type="number" size="small" />
                <TextField name="image" label="Image" value={editValues.images[0]} onChange={handleChange} size="small"/>
                
                <Box>
                    <Typography variant="body2">Ingredients:</Typography>
                    <List>
                        {products.find(p => p._id === editRowId)?.recipe.map((i, index) => (
                        <ListItem key={index} dense>
                            <Typography variant="body2">{i.ingredient.name}: {i.amount} {i.ingredient.recipeUnits}</Typography>
                            <IconButton onClick={() => handleDeleteIngredient(index)}>
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
                        disabled={editRowId === null} // Disable if not editing a row
                    >
                        Add
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={handleSave}>
                    <DoneIcon />
                </IconButton>
                <IconButton onClick={handleCancel}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
        </Dialog>
    )
}