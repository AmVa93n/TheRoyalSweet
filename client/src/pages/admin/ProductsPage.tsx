import { useEffect } from "react";
import adminService from '../../services/admin.service'
import type { Product } from "../../types";
import { getProductPrice, getTotalProductCost, imagePlaceholder, productCategories } from "../../utils";
import { useStore, useAdminStore } from "../../store";
import { PlusIcon, SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react';
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const { products, setProducts, sortPreferences, setSortPreferences } = useAdminStore();
  const { language } = useStore();
  const { criteria: sortCriteria, direction: sortDirection } = sortPreferences.products;
  const navigate = useNavigate();
  const publicProducts = products.filter(product => !product.internal);
  const internalProducts = products.filter(product => product.internal);

  useEffect(() => {
    adminService.getProducts().then(setProducts);
  }, []);

  async function handleCreateProduct() {
    const newProduct = await adminService.createProduct();
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts); // Add the new product to the list
    navigate(`/admin/products/${newProduct._id}`, { state: { new: true } }); // Navigate to the new product's page
  };

  function sortFunction(a: Product, b: Product) {
    switch (sortCriteria) {
      case 'name':
        return sortDirection === 'asc' ? a.name[language].localeCompare(b.name[language]) : b.name[language].localeCompare(a.name[language]);
      case 'category': {
        const categoryA = productCategories[a.category]?.[language] || '';
        const categoryB = productCategories[b.category]?.[language] || '';
        return sortDirection === 'asc' ? categoryA.localeCompare(categoryB) : categoryB.localeCompare(categoryA);
      }
      case 'workHours':
      case 'electricityHours':
        return sortDirection === 'asc' ? a[sortCriteria] - b[sortCriteria] : b[sortCriteria] - a[sortCriteria];
      case 'price':
        return sortDirection === 'asc' ? getProductPrice(a) - getProductPrice(b) : getProductPrice(b) - getProductPrice(a);
      case 'totalCost':
        return sortDirection === 'asc' ? getTotalProductCost(a) - getTotalProductCost(b) : getTotalProductCost(b) - getTotalProductCost(a);
      case 'netGain': {
        const netGainA = getProductPrice(a) - getTotalProductCost(a);
        const netGainB = getProductPrice(b) - getTotalProductCost(b);
        return sortDirection === 'asc' ? netGainA - netGainB : netGainB - netGainA;
      }
      default:
        return 0;
    }
  }

  return (
    <div className="pt-20 pb-10 min-h-screen">
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">

        {/* Sort Options */}
        <div className="flex items-center justify-center mb-6">
            <p className='mr-4 text-lg font-medium text-gray-700'>Sort by:</p>

            <select
                className='rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1'
                value={sortCriteria}
                onChange={(e) => setSortPreferences('products', { criteria: e.target.value, direction: sortDirection })}
            >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="workHours">Work Hours</option>
                <option value="electricityHours">Electricity Hours</option>
                <option value="price">Price</option>
                <option value="totalCost">Total Cost</option>
                <option value="netGain">Net Gain</option>
            </select>
            
            <button 
                onClick={() => setSortPreferences('products', { criteria: sortCriteria, direction: sortDirection === 'asc' ? 'desc' : 'asc' })} 
                className="ml-2 cursor-pointer"
                title={sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
            >
                {sortDirection === 'desc' ? <SortDescendingIcon size={24} /> : <SortAscendingIcon size={24} />}
            </button>
        </div>

        {/* Products List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-center">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-center">Work Hours</th>
                <th className="px-4 py-2 text-center">Electricity Hours</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Total Cost</th>
                <th className="px-4 py-2 text-center">Net Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {publicProducts.sort(sortFunction).map((product) => (
                <tr key={product._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/admin/products/${product._id}`)}>
                    <td className="px-4 py-2 text-center">
                      <img src={product.images[0] || imagePlaceholder} alt={product._id} className="w-12 h-12 object-cover rounded-md" />
                    </td>
                    <td className="px-4 py-2 text-gray-800">{product.name[language]}</td>
                    <td className="px-4 py-2 text-gray-800">{productCategories[product.category]?.[language]}</td>
                    <td className="px-4 py-2 text-center">{product.workHours}</td>
                    <td className="px-4 py-2 text-center">{product.electricityHours}</td>
                    <td className="px-4 py-2 text-center">{getProductPrice(product).toFixed(2)} €</td>
                    <td className="px-4 py-2 text-center">{getTotalProductCost(product).toFixed(2)} €</td>
                    <td className="px-4 py-2 text-center">{(getProductPrice(product) - getTotalProductCost(product)).toFixed(2)} €</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
        {/* Internal Products List */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Internal Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-center">Work Hours</th>
                <th className="px-4 py-2 text-center">Electricity Hours</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Total Cost</th>
                <th className="px-4 py-2 text-center">Net Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {internalProducts.sort(sortFunction).map((product) => (
                <tr key={product._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/admin/products/${product._id}`)}>
                    <td className="px-4 py-2 text-gray-800">{product.name[language]}</td>
                    <td className="px-4 py-2 text-center">{product.workHours}</td>
                    <td className="px-4 py-2 text-center">{product.electricityHours}</td>
                    <td className="px-4 py-2 text-center">{getProductPrice(product).toFixed(2)} €</td>
                    <td className="px-4 py-2 text-center">{getTotalProductCost(product).toFixed(2)} €</td>
                    <td className="px-4 py-2 text-center">{(getProductPrice(product) - getTotalProductCost(product)).toFixed(2)} €</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleCreateProduct}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
        title="Create Product"
      >
        <PlusIcon size={24} />
      </button>
    </div>
  );
};

export default ProductsPage;