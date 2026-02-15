import ShopPage from "../pages/ShopPage";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product.model";
import "@/models/Ingredient.model";

export default async function Shop() {
  await dbConnect();
  const data = await Product.find({ internal: false }).populate('recipe.ingredient').lean();
  const products = JSON.parse(JSON.stringify(data));
  return <ShopPage products={products} />
}
