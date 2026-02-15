import HomePage from "./pages/HomePage";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product.model";
import "@/models/Ingredient.model";

export default async function Home() {
  await dbConnect();
  const data = await Product.find({ internal: false }).populate('recipe.ingredient').lean();
  const products = JSON.parse(JSON.stringify(data));
  return <HomePage products={products} />
}
