import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import appService from '../services/app.service'

function AdminPage() {
    const [ingredients, setIngredients] = useState([]);
    const [editRowId, setEditRowId] = useState(null); // Track the row being edited
    const [editValues, setEditValues] = useState({}); // Store the values being edited

    useEffect(() => {
        async function init() {
          try {
            const ingredients = await appService.getIngredients()
            setIngredients(ingredients)
          } catch (error) {
            const errorDescription = error.response.data.message;
            alert(errorDescription);
          }
        }
        init()
    }, [])

    function handleEditClick(id, ingredient) {
        setEditRowId(id);
        setEditValues(ingredient); // Initialize editing values
    };

    function handleSaveClick() {
        setIngredients((prevRows) =>
            prevRows.map((row) =>
                row._id === editRowId ? { ...row, ...editValues } : row
            )
        );
        setEditRowId(null); // Stop editing mode
    };

    function handleCancelClick() {
        setEditRowId(null); // Exit editing mode without saving
      };

    function handleChange(e) {
        const { name, value } = e.target;
        setEditValues({ ...editValues, [name]: value });
    };
    
    return (
        <TableContainer component={Paper} sx={{width: '92%', mx: 'auto'}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Image</b></TableCell>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell><b>Supermarket</b></TableCell>
                        <TableCell><b>Brand</b></TableCell>
                        <TableCell><b>Units</b></TableCell>
                        <TableCell><b>Price per unit</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {ingredients.map((ingredient) => (
                    <TableRow key={ingredient._id}>
                        <TableCell>
                            {editRowId === ingredient._id ? (
                                <TextField
                                    name="image"
                                    value={editValues.image || ''}
                                    onChange={handleChange}
                                    size="small"
                                />
                                ) : (
                                    ingredient.image ? <img src={ingredient.image} alt={ingredient.name} /> :
                                    <Avatar sx={{ bgcolor: 'rgb(253, 33, 155)' }}>
                                        <ImageNotSupportedIcon />
                                    </Avatar>
                                )}
                        </TableCell>

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
                                name="units"
                                value={editValues.units}
                                onChange={handleChange}
                                size="small"
                            />
                            ) : (
                            ingredient.units
                            )}
                        </TableCell>
                        <TableCell>
                            {editRowId === ingredient._id ? (
                            <TextField
                                name="priceperunit"
                                value={editValues.priceperunit}
                                onChange={handleChange}
                                type="number"
                                size="small"
                            />
                            ) : (
                            ingredient.priceperunit
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
    )
}

export default AdminPage