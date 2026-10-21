import CustomCakePage from "@/components/pages/CustomCakePage";
import dbConnect from "@/lib/mongodb";
import CakeComponent from "@/models/CakeComponent.model";
import CakeComponentCategory from "@/models/CakeComponentCategory.model";
import "@/models/Ingredient.model";

export default async function CustomCake() {
  await dbConnect();
  const cakeComponentsData = await CakeComponent.find({ $or: [{internal: false}, {internal: {$exists: false}}] }).populate('recipe.ingredient category').lean()
  const cakeComponents = JSON.parse(JSON.stringify(cakeComponentsData));
  const categoryData = await CakeComponentCategory.find().lean()
  const cakeComponentCategories = JSON.parse(JSON.stringify(categoryData));
  return <CustomCakePage cakeComponents={cakeComponents} cakeComponentCategories={cakeComponentCategories} />
}
