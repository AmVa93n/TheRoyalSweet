import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Divider } from '@mui/material';
import adminService from '../../services/admin.service';
import type { CartItem, Order } from '../../types';

function Orders() {
  const [orders, setOrders] = useState([] as Order[]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await adminService.getOrders();  // Assuming you have an API endpoint that returns the data
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    }
    fetchOrders();
  }, []);

  function calculateAccumulativeIngredients(items: CartItem[]) {
    const ingredientsMap: {[key: string]: { name: string; units: string; totalAmount: number; totalPrice: number }} = {};

    items.forEach(item => {
      item.product.recipe.forEach(({ ingredient, amount }) => {
        if (!ingredientsMap[ingredient._id]) {
          ingredientsMap[ingredient._id] = {
            name: ingredient.name,
            units: ingredient.recipeUnits,
            totalAmount: 0,
            totalPrice: 0,
          };
        }

        const ingredientData = ingredientsMap[ingredient._id];
        ingredientData.totalAmount += amount * item.quantity;
        ingredientData.totalPrice += ingredientData.totalAmount * ingredient.pricePerUnit;
      });
    });

    return Object.values(ingredientsMap);
  }

  function calculateGrandTotalPrice(items: CartItem[]) {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  return (
    <Box sx={{ width: '90%', mx: 'auto' }}>
      {orders.map((order, index) => {
        const accumulativeIngredients = calculateAccumulativeIngredients(order.items);
        const grandTotalPrice = calculateGrandTotalPrice(order.items);
        const totalIngredientsPrice = accumulativeIngredients.reduce((total, ing) => total + ing.totalPrice, 0);

        return (
          <Paper key={index} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6">Order by: {order.name} ({order.email})</Typography>
            {order.pickup ? <Typography>Pickup</Typography> :
              <Box>
                <Typography>Shipping Details:</Typography>
                <Typography>City: {order.shipping.city}</Typography>
                <Typography>Address: {order.shipping.address}</Typography>
                <Typography>ZIP: {order.shipping.zip}</Typography>
              </Box>}
            <Divider sx={{ my: 2 }} />

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price (each)</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.product.name.en}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Total Ingredients</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ingredient</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accumulativeIngredients.map((ingredient, i) => (
                      <TableRow key={i}>
                        <TableCell>{ingredient.name}</TableCell>
                        <TableCell>{ingredient.totalAmount} {ingredient.units}</TableCell>
                        <TableCell>{ingredient.totalPrice.toFixed(3)} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Grand Total Price: {grandTotalPrice} €</Typography>
            <Typography variant="h6">Total Ingredients Price: {totalIngredientsPrice.toFixed(3)} €</Typography>
            <Typography variant="h6">Net Gain: {(grandTotalPrice - totalIngredientsPrice).toFixed(3)} €</Typography>
          </Paper>
        );
      })}
    </Box>
  );
}

export default Orders;