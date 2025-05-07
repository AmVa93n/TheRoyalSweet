import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import adminService from '../../services/admin.service'
import appService from '../../services/app.service'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import type { Ingredient, Product } from "../../types";
import EditRecipe from "./EditRecipe";
import { calculatePrice } from "../../utils";

function EditProducts() {
  const [products, setProducts] = useState([] as Product[]); // Store the list of products
  const [ingredients, setIngredients] = useState([] as Ingredient[]); // Store the list of ingredients
  const [editRowId, setEditRowId] = useState<string | null>(null); // Track the row being edited
  const [editValues, setEditValues] = useState({} as Product); // Store the values being edited

  useEffect(() => {
    async function init() {
      try {
        const products = await appService.getProducts()
        setProducts(products)
        const ingredients = await adminService.getIngredients()
        setIngredients(ingredients)
      } catch (error) {
        alert(`Error fetching products or ingredients: ${error}`)
      }
    }
    init()
  }, [])

  function handleEditClick(id: string, product: Product) {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  return (
    <TableContainer component={Paper} sx={{width: '92%', mx: 'auto'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="normal">Image</TableCell>
            <TableCell padding="normal">Name (EN)</TableCell>
            <TableCell padding="normal">Name (PT)</TableCell>
            <TableCell padding="normal">Work Hours</TableCell>
            <TableCell padding="normal">Electricity Hours</TableCell>
            <TableCell padding="normal">Price</TableCell>
            <TableCell padding="normal">Total Cost</TableCell>
            <TableCell padding="normal">Net Gain</TableCell>
            <TableCell padding="normal">Actions</TableCell>
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
                        product.images[0] ? <img src={product.images[0]} alt={product._id} width={64} /> :
                        <Avatar sx={{ bgcolor: 'rgb(253, 33, 155)' }}>
                            <ImageNotSupportedIcon />
                        </Avatar>
                    )}
              </TableCell>
              <TableCell padding="normal">
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
              <TableCell padding="normal">
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
              <TableCell padding="normal">
                {editRowId === product._id ? (
                  <TextField
                    name="workHours"
                    value={editValues.workHours || ""}
                    onChange={handleChange}
                    type="number"
                    size="small"
                  />
                ) : (
                  product.workHours
                )}
              </TableCell>
              <TableCell padding="normal">
                {editRowId === product._id ? (
                  <TextField
                    name="electricityHours"
                    value={editValues.electricityHours || ""}
                    onChange={handleChange}
                    type="number"
                    size="small"
                  />
                ) : (
                  product.electricityHours
                )}
              </TableCell>
              <TableCell padding="normal">{calculatePrice(product, ingredients).price.toFixed(2)} €</TableCell>
              <TableCell padding="normal">{calculatePrice(product, ingredients).totalCost.toFixed(2)} €</TableCell>
              <TableCell padding="normal">{calculatePrice(product, ingredients).netGain.toFixed(2)} €</TableCell>
              <TableCell padding="normal">
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
        <EditRecipe products={products} setProducts={setProducts} ingredients={ingredients} editRowId={editRowId} />
      )}
    </TableContainer>
  );
};

export default EditProducts;