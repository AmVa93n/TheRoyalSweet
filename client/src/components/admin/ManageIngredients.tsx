import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import adminService from '../../services/admin.service'
import type { Ingredient } from "../../types";
import { useStore } from "../../store";

function ManageIngredients() {
    const { ingredients, setIngredients } = useStore()
    const [editedIngredientId, setEditedIngredientId] = useState<string | null>(null); // Track the row being edited
    const [ingredientForm, setIngredientForm] = useState({} as Ingredient); // Store the values being edited

    function handleEditClick(id: string, ingredient: Ingredient) {
        setEditedIngredientId(id);
        setIngredientForm(ingredient); // Initialize editing values
    };

    async function handleSave() {
        await adminService.updateIngredient(ingredientForm);
        const updatedIngredients = ingredients.map((row) => row._id === editedIngredientId ? { ...row, ...ingredientForm } : row );
        setIngredients(updatedIngredients); // Update the ingredient in the list
        setEditedIngredientId(null); // Stop editing mode
    };

    function handleCancel() {
        setEditedIngredientId(null); // Exit editing mode without saving
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setIngredientForm({ ...ingredientForm, [name]: value });
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
                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <TextField
                                name="name"
                                value={ingredientForm.name}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.name
                            )}
                        </TableCell>

                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <TextField
                                name="supermarket"
                                value={ingredientForm.supermarket}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.supermarket
                            )}
                        </TableCell>

                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <TextField
                                name="brand"
                                value={ingredientForm.brand}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.brand
                            )}
                        </TableCell>
                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <TextField
                                name="recipeUnits"
                                value={ingredientForm.recipeUnits}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.recipeUnits
                            )}
                        </TableCell>
                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <TextField
                                name="pricePerUnit"
                                value={ingredientForm.pricePerUnit}
                                onChange={handleChange}
                                type="number"
                                size="small"
                            />
                            ) : (
                            ingredient.pricePerUnit + " €"
                            )}
                        </TableCell>
                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <TextField
                                name="price"
                                value={ingredientForm.price}
                                onChange={handleChange}
                                type="number"
                                size="small"
                            />
                            ) : (
                            ingredient.price + " €"
                            )}
                        </TableCell>
                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <TextField
                                name="unitsPerPackage"
                                value={ingredientForm.unitsPerPackage}
                                onChange={handleChange}
                                type="number"
                                size="small"
                            />
                            ) : (
                            ingredient.unitsPerPackage
                            )}
                        </TableCell>
                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <TextField
                                name="packageUnits"
                                value={ingredientForm.packageUnits}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.packageUnits
                            )}
                        </TableCell>

                        <TableCell>
                            {editedIngredientId === ingredient._id ? (
                            <>
                                <IconButton onClick={handleSave}>
                                    <DoneIcon />
                                </IconButton>
                                <IconButton onClick={handleCancel}>
                                    <CloseIcon />
                                </IconButton>
                            </>
                            ) : (
                            <IconButton onClick={() => handleEditClick(ingredient._id, ingredient)}>
                                <EditIcon />
                            </IconButton>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Button variant="contained" onClick={handleAddIngredient} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          Create Ingredient
        </Button>
        </>
    )
}

export default ManageIngredients