import ProductPage from "../../pages/ProductPage";
import appService from "../../services/app.service";

export default async function Product({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await appService.getProductById(productId);
  return <ProductPage product={product} />
}
