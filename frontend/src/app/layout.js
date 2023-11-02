import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "../context/authContext.js";
import { ToastProvider } from "../context/toastContext.js";
import ReduxProvider from "../redux/Provider.js";

import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";

export const metadata = {
  title: "Ecomerce website",
  description: "Buy the amazing product at very good price",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 , user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <AuthProvider>
            <ToastProvider>
              <Navbar />
              <main className="content">{children}</main>
              <Footer />
            </ToastProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
