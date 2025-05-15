import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import adminService from '../../services/admin.service'
import type { Ingredient } from "../../types";

function ManageIngredients() {
    const [ingredients, setIngredients] = useState([] as Ingredient[]); // Store the list of ingredients
    const [editRowId, setEditRowId] = useState<string | null>(null); // Track the row being edited
    const [editValues, setEditValues] = useState({} as Ingredient); // Store the values being edited

    function handleEditClick(id: string, ingredient: Ingredient) {
        setEditRowId(id);
        setEditValues(ingredient); // Initialize editing values
    };

    async function handleSaveClick() {
        const updatedIngredient = { ...editValues }; // Use the edit values for the updated ingredient
        setIngredients((prevRows) =>
            prevRows.map((row) =>
                row._id === editRowId ? { ...row, ...editValues } : row
            )
        );
        setEditRowId(null); // Stop editing mode
        // Use the updated ingredient data to make the API call
        await adminService.updateIngredient(updatedIngredient);
    };

    function handleCancelClick() {
        setEditRowId(null); // Exit editing mode without saving
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEditValues({ ...editValues, [name]: value });
    };

    async function handleAddIngredient() {
        const newIngredient = await adminService.createIngredient();
        setIngredients((prev) => [...prev, newIngredient]); // Add the new ingredient to the list
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
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="name"
                                value={editValues.name}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.name
                            )}
                        </TableCell>

                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="supermarket"
                                value={editValues.supermarket}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.supermarket
                            )}
                        </TableCell>

                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="brand"
                                value={editValues.brand}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.brand
                            )}
                        </TableCell>
                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="recipeUnits"
                                value={editValues.recipeUnits}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.recipeUnits
                            )}
                        </TableCell>
                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="pricePerUnit"
                                value={editValues.pricePerUnit}
                                onChange={handleChange}
                                type="number"
                                size="small"
                            />
                            ) : (
                            ingredient.pricePerUnit + " €"
                            )}
                        </TableCell>
                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="price"
                                value={editValues.price}
                                onChange={handleChange}
                                type="number"
                                size="small"
                            />
                            ) : (
                            ingredient.price + " €"
                            )}
                        </TableCell>
                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="unitsPerPackage"
                                value={editValues.unitsPerPackage}
                                onChange={handleChange}
                                type="number"
                                size="small"
                            />
                            ) : (
                            ingredient.unitsPerPackage
                            )}
                        </TableCell>
                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="packageUnits"
                                value={editValues.packageUnits}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.packageUnits
                            )}
                        </TableCell>

                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <>
                                <IconButton onClick={handleSaveClick}>
                                    <DoneIcon />
                                </IconButton>
                                <IconButton onClick={handleCancelClick}>
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