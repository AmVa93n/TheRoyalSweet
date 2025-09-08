import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import EditProduct from '../../components/admin/EditProduct';
import { useState } from 'react';
import { PencilIcon } from '@phosphor-icons/react';
import { productCategories } from '../../utils';

export default function ProductPage() {
    const { productId } = useParams();
    const { products, language } = useStore();
    const product = products.find(product => product._id === productId)!;
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.new || false);

    if (isEditing) {
      return <EditProduct product={product} onClose={() => setIsEditing(false)} />;
    }

    return (
      <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">

        {/* Product Text */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Product Text</h2>
          <div className="grid grid-cols-3 grid-cols-[150px_1fr_1fr]">
            <div></div>
            <div className="font-medium text-center flex items-center justify-center gap-1">
              <img src="https://flagcdn.com/w20/pt.png" alt="PT" /> PT
            </div>
            <div className="font-medium text-center flex items-center justify-center gap-1">
              <img src="https://flagcdn.com/w20/gb.png" alt="EN" /> EN
            </div>
          </div>
          <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr]">
            <span className="font-medium">Name:</span> 
            <span>{product.name.pt}</span>
            <span>{product.name.en}</span>
          </div>
          <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr]">
            <span className="font-medium">Intro:</span> 
            <span>{product.intro.pt}</span>
            <span>{product.intro.en}</span>
          </div>
          <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr]">
            <span className="font-medium">Description:</span> 
            <span>{product.description.pt}</span>
            <span>{product.description.en}</span>
          </div>
          <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr]">
            <span className="font-medium">Serve:</span> 
            <span>{product.serve.pt}</span>
            <span>{product.serve.en}</span>
          </div>
          <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr]">
            <span className="font-medium">Store:</span> 
            <span>{product.store.pt}</span>
            <span>{product.store.en}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
          <p className="text-gray-600">
            <span className="font-medium">Category:</span> {productCategories[product.category]?.[language]}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Work Hours:</span> {product.workHours}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Electricity Hours:</span> {product.electricityHours}
          </p>
        </div>

        {/* Recipe */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipe</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Ingredient</th>
                  <th className="px-4 py-2 text-center">Amount</th>
                  <th className="px-4 py-2 text-center">Price / Unit</th>
                  <th className="px-4 py-2 text-center">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {product.recipe.map((item) => (
                  <tr key={item.ingredient._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">{item.ingredient.name}</td>
                    <td className="px-4 py-2 text-center">{item.amount} {item.ingredient.recipeUnits}</td>
                    <td className="px-4 py-2 text-center">{item.ingredient.pricePerUnit.toFixed(3)} €</td>
                    <td className="px-4 py-2 text-center font-medium text-gray-800">{(item.ingredient.pricePerUnit * item.amount).toFixed(3)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Images */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img src={img} alt={`Product Image ${index + 1}`} className="w-full h-48 object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Edit Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Edit Product"
        >
          <PencilIcon size={24} />
        </button>
      </div>
    )
}