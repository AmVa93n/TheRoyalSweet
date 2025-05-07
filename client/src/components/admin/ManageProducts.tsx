import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import adminService from '../../services/admin.service'
import appService from '../../services/app.service'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import type { Ingredient, Product } from "../../types";
import { calculatePrice } from "../../utils";
import EditProductModal from "./EditProductModal";

function ManageProducts() {
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

  return (
    <>
      <TableContainer component={Paper} sx={{width: '92%', mx: 'auto'}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Image</TableCell>
              <TableCell padding="normal">Name</TableCell>
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
                  {product.images[0] ? <img src={product.images[0]} alt={product._id} width={64} /> :
                    <Avatar sx={{ bgcolor: 'rgb(253, 33, 155)' }}>
                        <ImageNotSupportedIcon />
                    </Avatar>}
                </TableCell>

                <TableCell padding="normal">{product.name.pt}</TableCell>
                <TableCell padding="normal">{product.workHours}</TableCell>
                <TableCell padding="normal">{product.electricityHours}</TableCell>
                <TableCell padding="normal">{calculatePrice(product, ingredients).price.toFixed(2)} €</TableCell>
                <TableCell padding="normal">{calculatePrice(product, ingredients).totalCost.toFixed(2)} €</TableCell>
                <TableCell padding="normal">{calculatePrice(product, ingredients).netGain.toFixed(2)} €</TableCell>
                
                <TableCell padding="normal">
                  <IconButton onClick={() => handleEditClick(product._id, product)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editRowId && <EditProductModal 
        products={products} 
        setProducts={setProducts} 
        ingredients={ingredients} 
        editRowId={editRowId} 
        setEditRowId={setEditRowId}
        editValues={editValues}
        setEditValues={setEditValues}
      />}
    </>
  );
};

export default ManageProducts;