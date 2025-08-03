import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Divider, IconButton, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Order, CartItem } from '../../types';

type Props = {
    order: Order;
    open: boolean;
    onClose: () => void;
}

export default function OrderCard({ order, open, onClose }: Props) {
    const ingredientRegistry = createIngredientRegistry();
    const grandTotalPrice = calculateGrandTotalPrice(order.items);
    const totalIngredientsPrice = ingredientRegistry.reduce((total, ing) => total + ing.totalPrice, 0);

    function createIngredientRegistry() {
        const registry: {[key: string]: { name: string; units: string; totalAmount: number; totalPrice: number }} = {};
    
        // Iterate through each item in the order and accumulate ingredient data
        order.items.forEach(item => {
          item.product.recipe.forEach(({ ingredient, amount }) => {
            if (!registry[ingredient._id]) {
              registry[ingredient._id] = {
                name: ingredient.name,
                units: ingredient.recipeUnits,
                totalAmount: 0,
                totalPrice: 0,
              };
            }
    
            const entry = registry[ingredient._id];
            entry.totalAmount += amount * item.quantity;
            entry.totalPrice += entry.totalAmount * ingredient.pricePerUnit;
          });
        });

        // Add additional ingredients from the order
        order.additionalIngredients.forEach(({ ingredient, amount }) => {
          if (!registry[ingredient._id]) {
            registry[ingredient._id] = {
              name: ingredient.name,
              units: ingredient.recipeUnits,
              totalAmount: 0,
              totalPrice: 0,
            };
          }

          const entry = registry[ingredient._id];
          entry.totalAmount += amount;
          entry.totalPrice += amount * ingredient.pricePerUnit;
        });
    
        return Object.values(registry);
    }
    
    function calculateGrandTotalPrice(items: CartItem[]) {
        return items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
    }

    return (
      <Dialog open={open} fullWidth maxWidth="lg">
        <Paper sx={{ mb: 3, p: 2, position: 'relative' }}>
            <Typography variant="h6">Order by: {order.name}</Typography>
            <Typography>Email: {order.email}</Typography>
            <Typography>Created: {order.createdAt.split('T')[0]}</Typography>
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
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price (each)</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.product.name.pt}</TableCell>
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
                    {ingredientRegistry.map((ingredient, i) => (
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

            <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
                <CloseIcon />
            </IconButton>
        </Paper>
      </Dialog>
    )
}