import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Royal Sweet",
  description: "Gourmet desserts worthy of the crown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Cart />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
