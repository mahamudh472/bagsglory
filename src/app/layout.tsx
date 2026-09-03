import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BAGSGLORY — Handcrafted Leather & Lifestyle Carry",
  description: "Handcrafted Italian leather backpacks, structured totes, weekender duffels, and executive briefcases. Minimalist luxury with Cash on Delivery nationwide.",
  keywords: "leather bags, backpacks, travel duffel, weekender bag, luxury tote, briefcases, cash on delivery, bagsglory",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8F6F1] text-[#181817] selection:bg-[#A85A20] selection:text-white">
        <StoreProvider>
          <Header />
          <CartDrawer />
          <SearchModal />
          <div className="flex-1">{children}</div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
