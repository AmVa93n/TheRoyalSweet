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
import ProductsPage from "./pages/admin/ProductsPage";
import CakeComponentsPage from "./pages/admin/CakeComponentsPage";
import OrdersPage from "./pages/admin/OrdersPage";
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
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/cake-components" element={<CakeComponentsPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
      </Routes>

      {!isOnAdminPage && <Footer />}
    </div>
  );
}

export default App;
