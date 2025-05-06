import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "../../client/src/context/auth.context";
import { LanguageProvider } from "../../client/src/context/language.context";
import { CartProvider } from "../../client/src/context/cart.context";
import '@fontsource/montserrat';
import { ThemeProvider } from "../../client/src/context/theme.context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <AuthProviderWrapper>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProviderWrapper>
  </Router>
);
