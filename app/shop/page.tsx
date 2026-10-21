import ShopPage from "@/components/pages/ShopPage";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product.model";
import "@/models/Ingredient.model";
import ProductCategory from "@/models/ProductCategory.model";

export default async function Shop() {
  await dbConnect();
  const productsData = await Product.find({ internal: false }).populate('recipe.ingredient category').lean();
  const products = JSON.parse(JSON.stringify(productsData));
  const categoryData = await ProductCategory.find().lean();
  const productCategories = JSON.parse(JSON.stringify(categoryData));
  return <ShopPage products={products} productCategories={productCategories} />
}
