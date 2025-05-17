import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import adminService from '../../services/admin.service'
import type { Ingredient } from "../../types";
import { useStore } from "../../store";
import EditIngredientModal from "./EditIngredientModal";

function ManageIngredients() {
    const { ingredients, setIngredients } = useStore()
    const [editedIngredient, setEditedIngredient] = useState<Ingredient | null>(null);

    async function handleSave(ingredientForm: Ingredient) {
        const updatedIngredient = await adminService.updateIngredient(ingredientForm);
        const updatedIngredients = ingredients.map(ingredient => ingredient._id === updatedIngredient._id ? updatedIngredient : ingredient);
        setIngredients(updatedIngredients); // Update the ingredient in the list
        setEditedIngredient(null); // Stop editing mode
    };

    async function handleAddIngredient() {
        const newIngredient = await adminService.createIngredient();
        const updatedIngredients = [...ingredients, newIngredient];
        setIngredients(updatedIngredients); // Add the new ingredient to the list
    };
    
    return (
        <>
        <TableContainer component={Paper} sx={{width: '92%', mx: 'auto'}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell><b>Supermarket</b></TableCell>
                        <TableCell><b>Brand</b></TableCell>
                        <TableCell><b>Recipe Units</b></TableCell>
                        <TableCell><b>Price / Unit</b></TableCell>
                        <TableCell><b>Price</b></TableCell>
                        <TableCell><b>Units / Package</b></TableCell>
                        <TableCell><b>Package Units</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {ingredients.map((ingredient) => (
                    <TableRow key={ingredient._id}>
                        <TableCell>{ingredient.name}</TableCell>
                        <TableCell>{ingredient.supermarket}</TableCell>
                        <TableCell>{ingredient.brand}</TableCell>
                        <TableCell>{ingredient.recipeUnits}</TableCell>
                        <TableCell>{ingredient.pricePerUnit + " €"}</TableCell>
                        <TableCell>{ingredient.price + " €"}</TableCell>
                        <TableCell>{ingredient.unitsPerPackage}</TableCell>
                        <TableCell>{ingredient.packageUnits}</TableCell>

                        <TableCell>
                            <IconButton onClick={() => setEditedIngredient(ingredient)}>
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Button variant="contained" onClick={handleAddIngredient} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          Create Ingredient
        </Button>

        {editedIngredient && 
            <EditIngredientModal open={!!editedIngredient} ingredient={editedIngredient} onSave={handleSave} onClose={() => setEditedIngredient(null)} />}
        </>
    )
}

export default ManageIngredients