import HomePage from "./pages/HomePage";
import appService from "./services/app.service";

export default async function Home() {
  const products = await appService.getProducts();
  return <HomePage products={products} />
}
