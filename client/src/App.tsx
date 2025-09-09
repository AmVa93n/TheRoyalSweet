import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CustomCakePage from "./pages/CustomCakePage";
import CheckoutPage from "./pages/CheckoutPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import IngredientsPage from "./pages/admin/IngredientsPage";
import IngredientPage from "./pages/admin/IngredientPage";
import ProductsPage from "./pages/admin/ProductsPage";
import AdminProductPage from "./pages/admin/ProductPage";
import CakeComponentsPage from "./pages/admin/CakeComponentsPage";
import CakeComponentPage from "./pages/admin/CakeComponentPage";
import OrdersPage from "./pages/admin/OrdersPage";
import OrderPage from "./pages/admin/OrderPage";
import AdminNavbar from "./components/admin/AdminNavbar";

function App() {
  const location = useLocation();
  const isOnAdminPage = location.pathname.includes("/admin");

  return (
    <div className="bg-[#e6dcd5]">
      {isOnAdminPage ? <AdminNavbar /> : <Navbar />}
      {!isOnAdminPage && <Cart />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/custom-cake" element={<CustomCakePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        <Route path="/admin/ingredients" element={<IngredientsPage />} />
        <Route path="/admin/ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/products/:productId" element={<AdminProductPage />} />
        <Route path="/admin/cake-components" element={<CakeComponentsPage />} />
        <Route path="/admin/cake-components/:componentId" element={<CakeComponentPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/orders/:orderId" element={<OrderPage />} />
      </Routes>

      {!isOnAdminPage && <Footer />}
    </div>
  );
}

export default App;
