import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product.model";
import "@/models/Ingredient.model";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({ internal: false }).populate('recipe.ingredient');
    return Response.json(products);
  } catch (error) {
    return Response.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
};



