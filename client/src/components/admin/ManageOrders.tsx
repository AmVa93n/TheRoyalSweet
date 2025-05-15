import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import adminService from '../../services/admin.service';
import type { Order, Product } from '../../types';
import OrderCard from './OrderCard';
import EditOrderModal from './EditOrderModal';
import appService from '../../services/app.service';

function ManageOrders() {
  const [orders, setOrders] = useState([] as Order[]);
  const [products, setProducts] = useState([] as Product[]); // Assuming you have a type for products
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await adminService.getOrders();  // Assuming you have an API endpoint that returns the data
        setOrders(data);
        const prodcts = await appService.getProducts(); // Fetch products for the modal
        setProducts(prodcts); // Assuming you have a state to hold products
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    }
    fetchOrders();
  }, []);

  async function handleSave(orderForm: Order) {
      try { 
          const newOrder = await adminService.updateOrder(orderForm);
          setOrders((prev) => prev.map(order => order._id === newOrder._id ? newOrder : order)); // Update the orders state with the new order
      } catch (error) {
          console.error("Error saving order:", error);
      }
      setEditedOrder(null); // Close the modal after saving
  };

  async function handleCreateOrder() {
    const newOrder = await adminService.createOrder();
    setOrders((prev) => [...prev, newOrder]); // Update the orders state with the new order
  };

  return (
    <>
      <Box sx={{ width: '90%', mx: 'auto' }}>
        {orders.map((order) => 
          <OrderCard key={order._id} order={order} handleEdit={() => setEditedOrder(order)} />
        )}
      </Box>

      <Button variant="contained" onClick={handleCreateOrder} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        Create Order
      </Button>

      {editedOrder && 
        <EditOrderModal open={!!editedOrder} order={editedOrder} products={products} onSave={handleSave} onClose={() => setEditedOrder(null)} />}
    </>
  );
}

export default ManageOrders;