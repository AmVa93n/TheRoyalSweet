import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Button, Select, MenuItem, Box, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import adminService from '../../services/admin.service'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import type { Product } from "../../types";
import { calculatePrice } from "../../utils";
import EditProductModal from "../../components/admin/EditProductModal";
import { useStore } from "../../store";
import AscIcon from '@mui/icons-material/ArrowUpward';
import DescIcon from '@mui/icons-material/ArrowDownward';
import appService from "../../services/app.service";

function ProductsPage() {
  const { products, setProducts, sortPreferences, setSortPreferences } = useStore();
  const { criteria: sortCriteria, direction: sortDirection } = sortPreferences.products;
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    appService.getProducts().then(setProducts);
  }, []);

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

  function sortFunction(a: Product, b: Product) {
    switch (sortCriteria) {
      case 'name':
        return sortDirection === 'asc' ? a.name.pt.localeCompare(b.name.pt) : b.name.pt.localeCompare(a.name.pt);
      case 'category':
        return sortDirection === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
      case 'workHours':
      case 'electricityHours':
        return sortDirection === 'asc' ? a[sortCriteria] - b[sortCriteria] : b[sortCriteria] - a[sortCriteria];
      case 'price':
      case 'totalCost':
      case 'netGain':
        return sortDirection === 'asc' ? calculatePrice(a)[sortCriteria] - calculatePrice(b)[sortCriteria] : calculatePrice(b)[sortCriteria] - calculatePrice(a)[sortCriteria];
      default:
        return 0;
    }
  }

  return (
    <div className="pt-20 pb-10 min-h-screen">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
        <Typography variant="body1" sx={{ marginRight: 2 }}>Sort by:</Typography>

        <Select
          value={sortCriteria}
          onChange={(e) => setSortPreferences('products', { criteria: e.target.value, direction: sortDirection })}
          size="small"
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="workHours">Work Hours</MenuItem>
          <MenuItem value="electricityHours">Electricity Hours</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="totalCost">Total Cost</MenuItem>
          <MenuItem value="netGain">Net Gain</MenuItem>
        </Select>
        
        <IconButton onClick={() => setSortPreferences('products', { criteria: sortCriteria, direction: 'desc' })}>
          <DescIcon color={sortDirection === 'desc' ? 'primary' : 'inherit'} />
        </IconButton>

        <IconButton onClick={() => setSortPreferences('products', { criteria: sortCriteria, direction: 'asc' })}>
          <AscIcon color={sortDirection === 'asc' ? 'primary' : 'inherit'} />
        </IconButton>
      </Box>

      <TableContainer component={Paper} sx={{width: '92%', mx: 'auto'}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Image</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Name</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Category</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Work Hours</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Electricity Hours</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Price</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Total Cost</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Net Gain</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} padding="normal">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.sort(sortFunction).map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  {product.images[0] ? <img src={product.images[0]} alt={product._id} width={48} /> :
                    <Avatar sx={{ bgcolor: 'rgb(253, 33, 155)', width: 48, height: 48 }}>
                        <ImageNotSupportedIcon />
                    </Avatar>}
                </TableCell>

                <TableCell padding="normal">{product.name.pt}</TableCell>
                <TableCell padding="normal">{product.category}</TableCell>
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
    </div>
  );
};

export default ProductsPage;