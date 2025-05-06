import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "../../client/src/context/auth.context";
import { LanguageProvider } from "../../client/src/context/language.context";
import { CartProvider } from "../../client/src/context/cart.context";
import '@fontsource/montserrat';
import { ThemeProvider } from "../../client/src/context/theme.context";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProviderWrapper>
    </BrowserRouter>
  </StrictMode>,
)