export type BagCategory = 
  | "backpacks"
  | "totes"
  | "crossbody"
  | "duffels"
  | "briefcases"
  | "slings"
  | "wallets";

export interface BagSpecification {
  dimensions: string; // e.g., "16.5\" H x 11.5\" W x 5.5\" D"
  capacity: string; // e.g., "22 Liters"
  weight: string; // e.g., "2.4 lbs (1.08 kg)"
  laptopFit: string; // e.g., "Up to 16\" MacBook Pro"
  material: string; // e.g., "Full-Grain Italian Vachetta Leather & 1000D Cordura"
  waterResistance: string; // e.g., "Weatherproof DWR Coating & Aquaguard Zippers"
  warranty: string; // e.g., "Lifetime Craftsmanship Warranty"
}

export interface ProductVariant {
  sku: string;
  colorName: string;
  colorHex: string;
  sizeOrCapacity: string; // e.g., "Standard (20L)", "Compact (14L)", "Travel (28L)"
  materialOption?: string;
  stock: number;
  priceOffset: number; // e.g. +0, +20, etc.
  images: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 - 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: BagCategory;
  categoryName: string;
  basePrice: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  specs: BagSpecification;
  features: string[];
  variants: ProductVariant[];
  reviews: Review[];
  createdAt: string;
}

export interface CategoryItem {
  id: string;
  slug: BagCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
  badge?: string;
}

export interface CartItem {
  id: string; // unique combo of productId + variantSku
  productId: string;
  slug: string;
  title: string;
  category: string;
  variantSku: string;
  colorName: string;
  colorHex: string;
  sizeOrCapacity: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  stock: number;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";
export type PaymentStatus = "Pending (Cash on Delivery)" | "Paid upon Delivery" | "Refunded";

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  districtState: string;
  postalCode: string;
  deliveryNotes?: string;
}

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string; // e.g., "BG-89214"
  createdAt: string;
  customer: DeliveryAddress;
  items: CartItem[];
  paymentMethod: "Cash on Delivery";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponApplied?: string;
  total: number;
  trackingHistory: TrackingStep[];
  adminNotes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number; // e.g., 15 for 15% or 20 for $20
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt: string;
  usageCount: number;
  usageLimit: number;
  isActive: boolean;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  materials: string[];
  capacities: string[];
  colors: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  searchQuery?: string;
}
