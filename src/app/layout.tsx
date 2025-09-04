import type { Metadata } from "next";
import "./styles/globals.css";
// Cart functionality removed
import { ToastProvider } from "../components/ToastContext";
import { ToastContainer } from "../components/ui/ToastContainer";
import { PasswordProtection } from "../components/auth/PasswordProtection";
import { AUTH_CONFIG } from "../config/auth";

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
        <PasswordProtection correctPassword={AUTH_CONFIG.ACCESS_PASSWORD}>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </PasswordProtection>
      </body>
    </html>
  );
} 