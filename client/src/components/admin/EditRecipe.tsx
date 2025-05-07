import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Button, Box, Typography, Autocomplete, List, ListItem} from "@mui/material";
import { useState } from "react";
import type { Ingredient, Product } from "../../types";

type Props = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    ingredients: Ingredient[];
    editRowId: string;
};

export default function EditRecipe({ products, setProducts, ingredients, editRowId }: Props) {
    const [newIngredientId, setNewIngredientId] = useState(""); // New ingredient input
    const [newAmount, setNewAmount] = useState(0); // New amount input

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

    return (
        <>
            <Box sx={{ padding: 2 }}>
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

            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', width: '37%'}}>
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
        </>
    )
}