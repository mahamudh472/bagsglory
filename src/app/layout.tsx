import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { FloatingCart } from "@/components/common/FloatingCart";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BAGSGLORY — Carry Your Glory | Luxury Handcrafted Bags",
  description: "Carry Your Glory. Discover premium handcrafted luxury handbags, executive briefcases, structured totes, and travel duffels with nationwide Cash on Delivery.",
  keywords: "bagsglory, luxury bags, handcrafted handbags, leather totes, executive briefcases, travel duffel, cash on delivery",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/images/logo-mark/logo-mark.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8F5EF] text-[#171513] selection:bg-[#C9A45C] selection:text-[#0D0C0B]">
        <StoreProvider>
          <Header />
          <CartDrawer />
          <SearchModal />
          <FloatingCart />
          <div className="flex-1">{children}</div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}


