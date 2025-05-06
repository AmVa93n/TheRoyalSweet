import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button, Box, 
    Typography, Autocomplete, Avatar, List, ListItem} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import adminService from '../../services/admin.service'
import appService from '../../services/app.service'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

function EditProducts() {
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [editRowId, setEditRowId] = useState(null); // Track the row being edited
  const [editValues, setEditValues] = useState({}); // Store the values being edited
  const [newIngredientId, setNewIngredientId] = useState(""); // New ingredient input
  const [newAmount, setNewAmount] = useState(0); // New amount input

  useEffect(() => {
    async function init() {
      try {
        const products = await appService.getProducts()
        setProducts(products)
        const ingredients = await adminService.getIngredients()
        setIngredients(ingredients)
      } catch (error) {
        const errorDescription = error.response.data.message;
        alert(errorDescription);
      }
    }
    init()
  }, [])

  function handleEditClick(id, product) {
    setEditRowId(id);
    setEditValues(product); // Initialize editing values
  };

  async function handleSaveClick() {
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

  function handleCancelClick() {
    setEditRowId(null); // Exit editing mode without saving
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  function handleAddIngredient() {
    const updatedProducts = [...products];
    updatedProducts.find(p => p._id === editRowId).recipe.push({
      ingredient: ingredients.find(i => i._id === newIngredientId),
      amount: newAmount,
    });
    setProducts(updatedProducts);
    setNewIngredientId(""); // Clear input
    setNewAmount(0); // Clear amount
  };

  function handleDeleteIngredient(ingredientIndex) {
    const updatedProducts = [...products];
    updatedProducts.find(p => p._id === editRowId).recipe.splice(ingredientIndex, 1);
    setProducts(updatedProducts);
  };

  return (
    <TableContainer component={Paper} sx={{width: '92%', mx: 'auto'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="dense">Image</TableCell>
            <TableCell padding="dense">Name (EN)</TableCell>
            <TableCell padding="dense">Name (PT)</TableCell>
            <TableCell padding="dense">Price (Small)</TableCell>
            <TableCell padding="dense">Price (Medium)</TableCell>
            <TableCell padding="dense">Price (Big)</TableCell>
            <TableCell padding="dense">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                {editRowId === product._id ? (
                    <TextField
                        name="image"
                        value={editValues.images[0] || ''}
                        onChange={handleChange}
                        size="small"
                    />
                    ) : (
                        product.images[0] ? <img src={product.images[0]} alt={product.name} width={64} /> :
                        <Avatar sx={{ bgcolor: 'rgb(253, 33, 155)' }}>
                            <ImageNotSupportedIcon />
                        </Avatar>
                    )}
              </TableCell>
              <TableCell padding="dense">
                {editRowId === product._id ? (
                  <TextField
                    name="name.en"
                    value={editValues.name?.en || ""}
                    onChange={handleChange}
                    size="small"
                  />
                ) : (
                  product.name.en
                )}
              </TableCell>
              <TableCell padding="dense">
                {editRowId === product._id ? (
                  <TextField
                    name="name.pt"
                    value={editValues.name?.pt || ""}
                    onChange={handleChange}
                    size="small"
                  />
                ) : (
                  product.name.pt
                )}
              </TableCell>
              <TableCell padding="dense">
                {editRowId === product._id ? (
                  <TextField
                    name="price.small"
                    value={editValues.price?.small || ""}
                    onChange={handleChange}
                    type="number"
                    size="small"
                  />
                ) : (
                  product.price.small
                )}
              </TableCell>
              <TableCell padding="dense">
                {editRowId === product._id ? (
                  <TextField
                    name="price.medium"
                    value={editValues.price?.medium || ""}
                    onChange={handleChange}
                    type="number"
                    size="small"
                  />
                ) : (
                  product.price.medium
                )}
              </TableCell>
              <TableCell padding="dense">
                {editRowId === product._id ? (
                  <TextField
                    name="price.big"
                    value={editValues.price?.big || ""}
                    onChange={handleChange}
                    type="number"
                    size="small"
                  />
                ) : (
                  product.price.big
                )}
              </TableCell>
              <TableCell padding="dense">
                {editRowId === product._id ? (
                  <>
                    <IconButton onClick={handleSaveClick}>
                      <DoneIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelClick}>
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEditClick(product._id, product)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editRowId !== null && (
        <>
        <Box sx={{ padding: 2 }}>
          <Typography variant="body2">Ingredients:</Typography>
          <List>
            {products.find(p => p._id === editRowId).recipe.map((i, index) => (
              <ListItem key={index}>
                <Box sx={{mr: 1}}>
                    {i.ingredient.image ? <img src={i.ingredient.image} alt={i.ingredient.name} /> :
                    <Avatar sx={{ bgcolor: 'rgb(253, 33, 155)' }}>
                        <ImageNotSupportedIcon />
                    </Avatar>}
                </Box>
                <Typography variant="body2">{i.ingredient.name}: {i.amount} {i.ingredient.units}</Typography>
                <IconButton
                  onClick={() => handleDeleteIngredient(index)}
                >
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
                onChange={(event, newValue) => setNewIngredientId(newValue?._id || "")} // Store the ingredient's ID
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
      )}
    </TableContainer>
  );
};

export default EditProducts;