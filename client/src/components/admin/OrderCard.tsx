import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { Order, CartItem } from '../../types';

type Props = {
    order: Order;
    handleEdit: (orderId: string) => void;
}

export default function OrderCard({ order, handleEdit }: Props) {
    const accumulativeIngredients = calculateAccumulativeIngredients(order.items);
    const grandTotalPrice = calculateGrandTotalPrice(order.items);
    const totalIngredientsPrice = accumulativeIngredients.reduce((total, ing) => total + ing.totalPrice, 0);

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
        <Paper sx={{ mb: 3, p: 2, position: 'relative' }}>
            <Typography variant="h6">Order by: {order.name} ({order.email})</Typography>
            
            <Typography>Placed on: {order.createdAt.split('T')[0]}</Typography>
            <Typography>Delivery Date: {order.deliveryDate?.split('T')[0]}</Typography>

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

            <IconButton onClick={() => handleEdit(order._id)} sx={{ position: 'absolute', top: 10, right: 10 }}>
                <EditIcon />
            </IconButton>
        </Paper>
    )
}