import adminService from '../../services/admin.service';
import type { Order } from '../../types';
import { useAdminStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react';

function OrdersPage() {
  const { orders, setOrders, sortPreferences, setSortPreferences } = useAdminStore();
  const { criteria: sortCriteria, direction: sortDirection } = sortPreferences.orders;
  const navigate = useNavigate();

  async function handleCreateOrder() {
    const newOrder = await adminService.createOrder();
    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders); // Update the orders state with the new order
    navigate(`/admin/orders/${newOrder._id}`, { state: { new: true } }); // Navigate to the new order's page
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
    <div className="pt-20 pb-10 min-h-screen">
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">

            {/* Sort Options */}
            <div className="flex items-center justify-center mb-6">
                <p className='mr-4 text-lg font-medium text-gray-700'>Sort by:</p>

                <select
                    className='rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1'
                    value={sortCriteria}
                    onChange={(e) => setSortPreferences('orders', { criteria: e.target.value, direction: sortDirection })}
                >
                    <option value="createdAt">Created</option>
                    <option value="name">Customer</option>
                    <option value="items">Items</option>
                    <option value="totalPrice">Total Price</option>
                    <option value="deliveryDate">Delivery Date</option>
                </select>
                
                <button 
                    onClick={() => setSortPreferences('orders', { criteria: sortCriteria, direction: sortDirection === 'asc' ? 'desc' : 'asc' })} 
                    className="ml-2 cursor-pointer"
                    title={sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                >
                    {sortDirection === 'desc' ? <SortDescendingIcon size={24} /> : <SortAscendingIcon size={24} />}
                </button>
            </div>

            {/* Orders List */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 text-center">Created</th>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-center">Items</th>
                    <th className="px-4 py-2 text-center">Total Price</th>
                    <th className="px-4 py-2 text-center">Delivery Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {orders.sort(sortFunction).map((order) => (
                    <tr key={order._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/admin/orders/${order._id}`)}>
                        <td className="px-4 py-2 text-center">{order.createdAt.split('T')[0]}</td>
                        <td className="px-4 py-2 text-gray-800">{order.name}</td>
                        <td className="px-4 py-2 text-center">{order.items.length}</td>
                        <td className="px-4 py-2 text-center">{order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} €</td>
                        <td className="px-4 py-2 text-center">{order.deliveryDate.split('T')[0]}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={handleCreateOrder}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Create Order"
        >
          <PlusIcon size={24} />
        </button>
    </div>
  );
}

export default OrdersPage;