import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useStore, useAdminStore } from '../../store';
import EditCakeComponent from '../../components/admin/EditCakeComponent';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { cakeComponentCategories} from '../../utils';
import Recipe from '../../components/admin/Recipe';
import Pricing from '../../components/admin/Pricing';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import adminService from '../../services/admin.service';

export default function CakeComponentPage() {
    const { componentId } = useParams();
    const { cakeComponents } = useAdminStore();
    const { language } = useStore();
    const component = cakeComponents.find(component => component._id === componentId)!;
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.new || false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    async function handleDelete() {
      try {
        await adminService.deleteCakeComponent(component._id);
        navigate('/admin/cake-components'); // Redirect to cake components list after deletion
      } catch (error) {
        console.error("Failed to delete cake component:", error);
      }
    }

    if (isEditing) {
      return <EditCakeComponent cakeComponent={component} onClose={() => setIsEditing(false)} />;
    }

    return (
      <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">

        {/* Cake Component Text */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Cake Component Text</h2>
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
            <span>{component.name.pt}</span>
            <span>{component.name.en}</span>
          </div>
        </div>

        {/* Cake Component Details */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Cake Component Details</h2>
          <p className="text-gray-600">
            <span className="font-medium">Category:</span> {cakeComponentCategories[component.category]?.[language]}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Work Hours:</span> {component.workHours}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Electricity Hours:</span> {component.electricityHours}
          </p>
        </div>

        {/* Recipe */}
        <Recipe recipe={component.recipe} />

        {/* Pricing */}
        <Pricing product={component} />

        {/* Actions */}
        <button
          onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-24 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Edit Cake Component"
        >
          <PencilIcon size={24} />
        </button>
        <button
          onClick={() => setIsDeleting(true)}
          className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Delete Cake Component"
        >
          <TrashIcon size={24} />
        </button>

        {/* Modals */}
        {isDeleting && (
          <DeleteConfirmation
            name={component.name[language]}
            onClose={() => setIsDeleting(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    )
}