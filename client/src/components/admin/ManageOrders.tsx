import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import adminService from '../../services/admin.service';
import type { Order } from '../../types';
import OrderCard from './OrderCard';

function ManageOrders() {
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

  return (
    <Box sx={{ width: '90%', mx: 'auto' }}>
      {orders.map((order, index) => 
        <OrderCard key={index} order={order} />
      )}
    </Box>
  );
}

export default ManageOrders;