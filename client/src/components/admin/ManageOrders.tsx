import { useState } from 'react';
import { Box, Button } from '@mui/material';
import adminService from '../../services/admin.service';
import type { Order } from '../../types';
import OrderCard from './OrderCard';
import EditOrderModal from './EditOrderModal';
import { useStore } from '../../store';

function ManageOrders() {
  const { orders, setOrders } = useStore();
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);

  async function handleSave(orderForm: Order) {
      try { 
          const newOrder = await adminService.updateOrder(orderForm);
          const updatedOrders = orders.map(order => order._id === newOrder._id ? newOrder : order);
          setOrders(updatedOrders); // Update the orders state with the new order
      } catch (error) {
          console.error("Error saving order:", error);
      }
      setEditedOrder(null); // Close the modal after saving
  };

  async function handleCreateOrder() {
    const newOrder = await adminService.createOrder();
    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders); // Update the orders state with the new order
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
        <EditOrderModal open={!!editedOrder} order={editedOrder} onSave={handleSave} onClose={() => setEditedOrder(null)} />}
    </>
  );
}

export default ManageOrders;