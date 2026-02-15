import CustomCakePage from "../pages/CustomCakePage";
import dbConnect from "@/lib/mongodb";
import CakeComponent from "@/models/CakeComponent.model";
import "@/models/Ingredient.model";

export default async function CustomCake() {
  await dbConnect();
  const data = await CakeComponent.find({ $or: [{internal: false}, {internal: {$exists: false}}] }).populate('recipe.ingredient').lean()
  const cakeComponents = JSON.parse(JSON.stringify(data));
  return <CustomCakePage cakeComponents={cakeComponents} />
}
