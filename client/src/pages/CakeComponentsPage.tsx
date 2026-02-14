import adminService from '../service';
import type { CakeComponent } from "../types";
import { cakeComponentCategories, getCakeComponentPrice, getTotalCakeComponentCost } from "../utils";
import { useStore, useAdminStore } from "../store";
import { PlusIcon, SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react';
import { useNavigate } from "react-router-dom";

function CakeComponentsPage() {
  const { cakeComponents, setCakeComponents, sortPreferences, setSortPreferences } = useAdminStore();
  const { language } = useStore();
  const { criteria: sortCriteria, direction: sortDirection } = sortPreferences.cakeComponents;
  const navigate = useNavigate();

  async function handleCreateCakeComponent() {
    const newCakeComponent = await adminService.createCakeComponent();
    const updatedCakeComponents = [...cakeComponents, newCakeComponent];
    setCakeComponents(updatedCakeComponents); // Add the new cake component to the list
    navigate(`/admin/cake-components/${newCakeComponent._id}`, { state: { new: true } }); // Navigate to the new product's page
  };

  function sortFunction(a: CakeComponent, b: CakeComponent) {
    switch (sortCriteria) {
      case 'name':
        return sortDirection === 'asc' ? a.name[language].localeCompare(b.name[language]) : b.name[language].localeCompare(a.name[language]);
      case 'category': {
        const categoryA = cakeComponentCategories[a.category]?.[language] || '';
        const categoryB = cakeComponentCategories[b.category]?.[language] || '';
        return sortDirection === 'asc' ? categoryA.localeCompare(categoryB) : categoryB.localeCompare(categoryA);
      }
      case 'workHours':
      case 'electricityHours':
        return sortDirection === 'asc' ? a[sortCriteria] - b[sortCriteria] : b[sortCriteria] - a[sortCriteria];
      case 'price':
        return sortDirection === 'asc' ? getCakeComponentPrice(a) - getCakeComponentPrice(b) : getCakeComponentPrice(b) - getCakeComponentPrice(a);
      case 'totalCost':
        return sortDirection === 'asc' ? getTotalCakeComponentCost(a) - getTotalCakeComponentCost(b) : getTotalCakeComponentCost(b) - getTotalCakeComponentCost(a);
      case 'netGain': {
        const netGainA = getCakeComponentPrice(a) - getTotalCakeComponentCost(a);
        const netGainB = getCakeComponentPrice(b) - getTotalCakeComponentCost(b);
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
                onChange={(e) => setSortPreferences('cakeComponents', { criteria: e.target.value, direction: sortDirection })}
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
                onClick={() => setSortPreferences('cakeComponents', { criteria: sortCriteria, direction: sortDirection === 'asc' ? 'desc' : 'asc' })} 
                className="ml-2 cursor-pointer"
                title={sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
            >
                {sortDirection === 'desc' ? <SortDescendingIcon size={24} /> : <SortAscendingIcon size={24} />}
            </button>
        </div>

        {/* Cake Components List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
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
                {cakeComponents.sort(sortFunction).map((component) => (
                <tr key={component._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/admin/cake-components/${component._id}`)}>
                    <td className="px-4 py-2 text-gray-800">{component.name[language]}</td>
                    <td className="px-4 py-2 text-gray-800">{cakeComponentCategories[component.category]?.[language]}</td>
                    <td className="px-4 py-2 text-center">{component.workHours}</td>
                    <td className="px-4 py-2 text-center">{component.electricityHours}</td>
                    <td className="px-4 py-2 text-center">{getCakeComponentPrice(component).toFixed(2)} €</td>
                    <td className="px-4 py-2 text-center">{getTotalCakeComponentCost(component).toFixed(2)} €</td>
                    <td className="px-4 py-2 text-center">{(getCakeComponentPrice(component) - getTotalCakeComponentCost(component)).toFixed(2)} €</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleCreateCakeComponent}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
        title="Create Cake Component"
      >
        <PlusIcon size={24} />
      </button>
    </div>
  );
};

export default CakeComponentsPage;