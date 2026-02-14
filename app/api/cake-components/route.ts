import dbConnect from "@/lib/mongodb";
import CakeComponent from "@/models/CakeComponent.model";
import "@/models/Ingredient.model";

export async function GET() {
  try {
    await dbConnect();
    const cakeComponents = await CakeComponent.find({ $or: [{internal: false}, {internal: {$exists: false}}] }).populate('recipe.ingredient');
    return Response.json(cakeComponents);
  } catch (error) {
    return Response.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
};