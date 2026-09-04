import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { FloatingCart } from "@/components/common/FloatingCart";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BAGSGLORY — Carry Your Glory! | Handcrafted Bags & Accessories",
  description: "Carry Your Glory! Discover premium handcrafted backpacks, luxury totes, executive briefcases, and travel duffels with nationwide Cash on Delivery.",
  keywords: "bagsglory, leather bags, backpacks, travel duffel, weekender bag, luxury tote, briefcases, cash on delivery",
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
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1E293B] selection:bg-[#0084D4] selection:text-white">
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

