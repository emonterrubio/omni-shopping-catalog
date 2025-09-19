import type { Metadata } from "next";
import "./styles/globals.css";
import { ToastProvider } from "../components/ToastContext";
import { ToastContainer } from "../components/ui/ToastContainer";
import { CartProvider } from "../components/CartContext";
import { CurrencyProvider } from "../components/CurrencyContext";

export const metadata: Metadata = {
  title: "Hardware Catalog - IT Equipment Store",
  description: "Browse our catalog of IT equipment and accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        <CurrencyProvider>
          <CartProvider>
            <ToastProvider>
              {children}
              <ToastContainer />
            </ToastProvider>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
} 