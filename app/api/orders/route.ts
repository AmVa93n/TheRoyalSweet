import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order.model";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    await dbConnect();
    const newOrder = await Order.create(data);
    return Response.json(newOrder);
  } catch (error) {
    return Response.json({ message: `Internal Server Error: ${error}` }, { status: 500 });
  }
};