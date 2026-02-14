import { Routes, Route } from "react-router-dom";
import IngredientsPage from "./pages/IngredientsPage";
import IngredientPage from "./pages/IngredientPage";
import ProductsPage from "./pages/ProductsPage";
import AdminProductPage from "./pages/ProductPage";
import CakeComponentsPage from "./pages/CakeComponentsPage";
import CakeComponentPage from "./pages/CakeComponentPage";
import OrdersPage from "./pages/OrdersPage";
import OrderPage from "./pages/OrderPage";
import GroceryListPage from "./pages/GroceryListPage";
import AdminNavbar from "./components/AdminNavbar";

function App() {
  return (
    <div className="bg-[#e6dcd5]">
      <AdminNavbar />
      <Routes>
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<AdminProductPage />} />
        <Route path="/cake-components" element={<CakeComponentsPage />} />
        <Route path="/cake-components/:componentId" element={<CakeComponentPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderPage />} />
        <Route path="/grocery-list" element={<GroceryListPage />} />
      </Routes>
    </div>
  );
}

export default App;
