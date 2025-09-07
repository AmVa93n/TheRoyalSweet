import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CustomCakePage from "./pages/CustomCakePage";
import CheckoutPage from "./pages/CheckoutPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="bg-[#e6dcd5]">
      <Navbar />
      <Cart />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/custom-cake" element={<CustomCakePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
