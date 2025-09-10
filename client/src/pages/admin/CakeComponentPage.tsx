import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import EditCakeComponent from '../../components/admin/EditCakeComponent';
import { useState } from 'react';
import { PencilIcon } from '@phosphor-icons/react';
import { getElectricityCost, getIngredientsCost, fixedCosts, getProductPrice, getTotalProductCost, getWorkHoursValue, gainMultiplier, workHourPrice, 
  electricityHourPrice, cakeComponentCategories} from '../../utils';
import Recipe from '../../components/admin/Recipe';

export default function CakeComponentPage() {
    const { componentId } = useParams();
    const { cakeComponents, language } = useStore();
    const component = cakeComponents.find(component => component._id === componentId)!;
    const location = useLocation();
    const ingredientsCost = getIngredientsCost(component);
    const electricityCost = getElectricityCost(component);
    const totalCost = getTotalProductCost(component);
    const workHoursValue = getWorkHoursValue(component);
    const price = getProductPrice(component);
    const netGain = price - totalCost;
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
            <span className="font-medium">Category:</span> {cakeComponentCategories[component.category][language]}
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
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing</h2>
          <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
            <span>Ingredients Cost</span> {ingredientsCost.toFixed(2)} €
          </div>
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]">
            <span>Electricity Cost</span> {electricityCost.toFixed(2)} €
          </div>
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]">
            <span>Fixed Costs</span> {fixedCosts.toFixed(2)} €
          </div>
          <hr className="my-1 border-gray-600" />
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] mb-4 font-medium">
            <span>Total Cost</span> {totalCost.toFixed(2)} €
          </div>

          <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
            <span>Work Hours Value</span> {workHoursValue.toFixed(2)} €
          </div>
          <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
            <span>20% Gain Multiplier</span> {((totalCost + workHoursValue) * (gainMultiplier - 1)).toFixed(2)} €
          </div>
          <hr className="my-1 border-gray-600" />
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] mb-4 font-medium">
            <span>Price</span> {price.toFixed(2)} €
          </div>

          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] font-medium">
            <span>Net Gain</span> {netGain.toFixed(2)} €
          </div>

          <div className="absolute top-8 right-8 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Work Hour Price {workHourPrice} €
          </div>
          <div className="absolute top-16 right-8 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Electricity Hour Price {electricityHourPrice} €
          </div>
        </div>

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