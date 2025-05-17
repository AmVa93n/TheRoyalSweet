import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import adminService from '../../services/admin.service'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import type { Product } from "../../types";
import { calculatePrice } from "../../utils";
import EditProductModal from "./EditProductModal";
import { useStore } from "../../store";

function ManageProducts() {
  const { products, setProducts } = useStore(); // Access the products from the store
  const [editedProduct, setEditedProduct] = useState<Product | null>(null); // Track the row being edited

  async function handleSave(productForm: Product) {
    const updatedProduct = await adminService.updateProduct(productForm);
    const updatedProducts = products.map((product) => product._id === updatedProduct._id ? updatedProduct : product);
    setProducts(updatedProducts);
    setEditedProduct(null); // Stop editing mode
  };

  async function handleAddProduct() {
    const newProduct = await adminService.createProduct();
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts); // Add the new product to the list
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
                  {product.images[0] ? <img src={product.images[0]} alt={product._id} width={48} /> :
                    <Avatar sx={{ bgcolor: 'rgb(253, 33, 155)', width: 48, height: 48 }}>
                        <ImageNotSupportedIcon />
                    </Avatar>}
                </TableCell>

                <TableCell padding="normal">{product.name.pt}</TableCell>
                <TableCell padding="normal">{product.workHours}</TableCell>
                <TableCell padding="normal">{product.electricityHours}</TableCell>
                <TableCell padding="normal">{calculatePrice(product).price.toFixed(2)} €</TableCell>
                <TableCell padding="normal">{calculatePrice(product).totalCost.toFixed(2)} €</TableCell>
                <TableCell padding="normal">{calculatePrice(product).netGain.toFixed(2)} €</TableCell>
                
                <TableCell padding="normal">
                  <IconButton onClick={() => setEditedProduct(product)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={handleAddProduct} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          Create Product
      </Button>

      {editedProduct && <EditProductModal 
        open={!!editedProduct}
        product={editedProduct}
        onSave={handleSave}
        onClose={() => setEditedProduct(null)}
      />}
    </>
  );
};

export default ManageProducts;