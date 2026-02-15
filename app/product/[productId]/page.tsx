import ProductPage from "../../pages/ProductPage";
import dbConnect from "@/lib/mongodb";
import productModel from "@/models/Product.model";
import "@/models/Ingredient.model";

export default async function Product({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  await dbConnect();
  const data = await productModel.findById(productId).populate('recipe.ingredient').lean();
  const product = JSON.parse(JSON.stringify(data));
  return <ProductPage product={product} />
}
