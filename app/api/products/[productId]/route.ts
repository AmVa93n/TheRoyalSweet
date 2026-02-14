import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product.model";
import "@/models/Ingredient.model";

export async function GET(request: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  try {
    await dbConnect();
    const product = await Product.findById(productId).populate('recipe.ingredient');

    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    return Response.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
};