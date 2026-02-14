import ShopPage from "../pages/ShopPage";
import appService from "../services/app.service";

export default async function Shop() {
  const products = await appService.getProducts();
  return <ShopPage products={products} />
}
