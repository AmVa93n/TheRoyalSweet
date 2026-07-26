import HomePage from "@/components/pages/HomePage";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product.model";
import Testimonial from "@/models/Testimonial.model";
import "@/models/Order.model";
import "@/models/Ingredient.model";

export default async function Home() {
  await dbConnect();
  const productsData = await Product.find({ internal: false, highlighted: true }).lean();
  const products = JSON.parse(JSON.stringify(productsData));
  const testimonialsData = await Testimonial.find().populate('order').lean();
  const testimonials = JSON.parse(JSON.stringify(testimonialsData));
  return <HomePage products={products} testimonials={testimonials} />;
}
