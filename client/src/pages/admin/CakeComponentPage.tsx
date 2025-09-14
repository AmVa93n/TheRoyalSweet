import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import EditCakeComponent from '../../components/admin/EditCakeComponent';
import { useState } from 'react';
import { PencilIcon } from '@phosphor-icons/react';
import { cakeComponentCategories} from '../../utils';
import Recipe from '../../components/admin/Recipe';
import Pricing from '../../components/admin/Pricing';

export default function CakeComponentPage() {
    const { componentId } = useParams();
    const { cakeComponents, language } = useStore();
    const component = cakeComponents.find(component => component._id === componentId)!;
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.new || false);

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

        {/* Floating Edit Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Edit Cake Component"
        >
          <PencilIcon size={24} />
        </button>
      </div>
    )
}