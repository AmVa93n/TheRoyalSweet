import { useState } from 'react';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Box, Select, MenuItem, Typography } from '@mui/material';
import adminService from '../../services/admin.service';
import type { Order } from '../../types';
import OrderCard from './OrderCard';
import EditOrderModal from './EditOrderModal';
import { useStore } from '../../store';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/Launch';
import AscIcon from '@mui/icons-material/ArrowUpward';
import DescIcon from '@mui/icons-material/ArrowDownward';

function ManageOrders() {
  const { orders, setOrders } = useStore();
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [viewedOrder, setViewedOrder] = useState<Order | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  async function handleSave(orderForm: Order) {
      try { 
          const updatedOrder = await adminService.updateOrder(orderForm);
          const updatedOrders = orders.map(order => order._id === updatedOrder._id ? updatedOrder : order);
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

  function sortFunction(a: Order, b: Order) {
      switch (sortCriteria) {
          case 'name':
              return sortDirection === 'asc' ? a[sortCriteria].localeCompare(b[sortCriteria]) : b[sortCriteria].localeCompare(a[sortCriteria]);
          case 'items':
              return sortDirection === 'asc' ? a[sortCriteria].length - b[sortCriteria].length : b[sortCriteria].length - a[sortCriteria].length;
          case 'totalPrice': {
              const aTotalPrice = a.items.reduce((total, item) => total + item.price * item.quantity, 0);
              const bTotalPrice = b.items.reduce((total, item) => total + item.price * item.quantity, 0);
              return sortDirection === 'asc' ? aTotalPrice - bTotalPrice : bTotalPrice - aTotalPrice;
          }
          case 'createdAt':
          case 'deliveryDate':
              return sortDirection === 'asc' ? new Date(a[sortCriteria]).getTime() - new Date(b[sortCriteria]).getTime() : new Date(b[sortCriteria]).getTime() - new Date(a[sortCriteria]).getTime();
          default:
              return 0;
      }
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
        <Typography variant="body1" sx={{ marginRight: 2 }}>Sort by:</Typography>

        <Select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            size="small"
        >
            <MenuItem value="createdAt">Placed On</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="items">Items</MenuItem>
            <MenuItem value="totalPrice">Total Price</MenuItem>
            <MenuItem value="deliveryDate">Delivery Date</MenuItem>
        </Select>
        
        <IconButton onClick={() => setSortDirection('desc')}>
            <DescIcon color={sortDirection === 'desc' ? 'primary' : 'inherit'} />
        </IconButton>
    
        <IconButton onClick={() => setSortDirection('asc')}>
            <AscIcon color={sortDirection === 'asc' ? 'primary' : 'inherit'} />
        </IconButton>
      </Box>

      <TableContainer component={Paper} sx={{width: '92%', mx: 'auto'}}>
          <Table size="small">
              <TableHead>
                  <TableRow>
                      <TableCell><b>Placed On</b></TableCell>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Items</b></TableCell>
                      <TableCell><b>Total Price</b></TableCell>
                      <TableCell><b>Delivery Date</b></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {orders.sort(sortFunction).map((order) => (
                  <TableRow key={order._id}>
                      <TableCell>{order.createdAt.split('T')[0]}</TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell>{order.items.reduce((total, item) => total + item.price * item.quantity, 0)}</TableCell>
                      <TableCell>{order.deliveryDate.split('T')[0]}</TableCell>

                      <TableCell>
                          <IconButton onClick={() => setEditedOrder(order)}>
                              <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => setViewedOrder(order)}>
                              <ViewIcon />
                          </IconButton>
                      </TableCell>
                  </TableRow>
              ))}
              </TableBody>
          </Table>
      </TableContainer>

      <Button variant="contained" onClick={handleCreateOrder} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        Create Order
      </Button>

      {editedOrder && 
        <EditOrderModal open={!!editedOrder} order={editedOrder} onSave={handleSave} onClose={() => setEditedOrder(null)} />}

      {viewedOrder &&
        <OrderCard open={!!viewedOrder} order={viewedOrder} onClose={() => setViewedOrder(null)} />}
    </>
  );
}

export default ManageOrders;