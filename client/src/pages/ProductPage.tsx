import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useStore, useAdminStore } from '../store';
import EditProduct from '../components/EditProduct';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { productCategories } from '../utils';
import SegmentedRecipe from '../components/SegmentedRecipe';
import Pricing from '../components/Pricing';
import DeleteConfirmation from '../components/DeleteConfirmation';
import adminService from '../service';

export default function ProductPage() {
    const { productId } = useParams();
    const { products, setProducts } = useAdminStore();
    const { language } = useStore();
    const product = products.find(product => product._id === productId)!;
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.new || false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    async function handleDelete() {
      try {
        await adminService.deleteProduct(product._id);
        setProducts(products.filter(p => p._id !== product._id));
        navigate('/admin/products'); // Redirect to products list after deletion
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }

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
          {!product.internal &&
          <>
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
          </>
          }
        </div>

        {/* Product Details */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
          {!product.internal &&
          <p className="text-gray-600">
            <span className="font-medium">Category:</span> {productCategories[product.category]?.[language]}
          </p>
          }
          <p className="text-gray-600">
            <span className="font-medium">Work Hours:</span> {product.workHours}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Electricity Hours:</span> {product.electricityHours}
          </p>
        </div>

        {/* Recipe */}
        <SegmentedRecipe product={product} />

        {/* Images */}
        {!product.internal &&
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
        }

        {/* Pricing */}
        <Pricing product={product} />

        {/* Actions */}
        <button
          onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-24 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Edit Product"
        >
          <PencilIcon size={24} />
        </button>
        <button
          onClick={() => setIsDeleting(true)}
          className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Delete Product"
        >
          <TrashIcon size={24} />
        </button>

        {/* Modals */}
        {isDeleting && (
          <DeleteConfirmation
            name={product.name[language]}
            onClose={() => setIsDeleting(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    )
}