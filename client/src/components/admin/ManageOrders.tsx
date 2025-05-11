import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import adminService from '../../services/admin.service';
import type { Order, Product } from '../../types';
import OrderCard from './OrderCard';
import CreateOrderModal from './CreateOrderModal';
import appService from '../../services/app.service';

function ManageOrders() {
  const [orders, setOrders] = useState([] as Order[]);
  const [products, setProducts] = useState([] as Product[]); // Assuming you have a type for products
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          const newOrder = await adminService.createOrder(orderForm);
          setOrders((prev) => [...prev, newOrder]); // Update the orders state with the new order
      } catch (error) {
          console.error("Error saving order:", error);
      }
      setIsModalOpen(false); // Close the modal after saving
  };

  return (
    <>
      <Box sx={{ width: '90%', mx: 'auto' }}>
        {orders.map((order) => 
          <OrderCard key={order._id} order={order} />
        )}
      </Box>

      <Button variant="contained" onClick={() => setIsModalOpen(true)} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        Create Order
      </Button>

      <CreateOrderModal open={isModalOpen} products={products} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default ManageOrders;