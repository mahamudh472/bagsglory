"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  CartItem,
  CategoryItem,
  Coupon,
  DeliveryAddress,
  Order,
  OrderStatus,
  PaymentStatus,
  Product,
  ProductVariant,
  Review,
  TrackingStep,
} from "@/types";
import {
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
} from "@/data/mockData";

interface StoreContextType {
  products: Product[];
  categories: CategoryItem[];
  coupons: Coupon[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isLoading: boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;

  // Cart operations
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist operations
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon operations
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string; coupon?: Coupon }>;
  removeCoupon: () => void;

  // Order operations
  createOrder: (customerAddress: DeliveryAddress) => Promise<Order>;
  getOrderById: (orderId: string) => Promise<Order | undefined>;

  // Admin Product CRUD
  addProduct: (productData: Omit<Product, "id" | "createdAt" | "reviews"> & { reviews?: Review[] }) => Promise<Product>;
  updateProduct: (id: string, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Admin Category CRUD
  addCategory: (categoryData: Omit<CategoryItem, "id">) => Promise<void>;
  updateCategory: (id: string, categoryData: Partial<CategoryItem>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Admin Coupon CRUD
  addCoupon: (couponData: Omit<Coupon, "id" | "usageCount">) => Promise<void>;
  updateCoupon: (id: string, couponData: Partial<Coupon>) => Promise<void>;
  deleteCoupon: (id: string) => Promise<void>;

  // Admin Order updates
  updateOrderStatus: (orderId: string, status: OrderStatus, paymentStatus?: PaymentStatus, note?: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  refreshData: () => Promise<void>;

  // Computations
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  cartItemCount: number;
  freeShippingThreshold: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: "bagsglory_cart_v2",
  WISHLIST: "bagsglory_wishlist_v2",
  COUPON_APPLIED: "bagsglory_coupon_applied_v2",
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Fetch all live data from backend PostgreSQL APIs
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [productsRes, categoriesRes, couponsRes, ordersRes] = await Promise.allSettled([
        fetch("/api/products"),
        fetch("/api/categories"),
        fetch("/api/coupons"),
        fetch("/api/orders"),
      ]);

      if (productsRes.status === "fulfilled" && productsRes.value.ok) {
        const prodData = await productsRes.value.json();
        if (Array.isArray(prodData) && prodData.length > 0) {
          setProducts(prodData);
        }
      }

      if (categoriesRes.status === "fulfilled" && categoriesRes.value.ok) {
        const catData = await categoriesRes.value.json();
        if (Array.isArray(catData) && catData.length > 0) {
          setCategories(catData);
        }
      }

      if (couponsRes.status === "fulfilled" && couponsRes.value.ok) {
        const coupData = await couponsRes.value.json();
        if (Array.isArray(coupData) && coupData.length > 0) {
          setCoupons(coupData);
        }
      }

      if (ordersRes.status === "fulfilled" && ordersRes.value.ok) {
        const ordData = await ordersRes.value.json();
        if (Array.isArray(ordData)) {
          setOrders(ordData);
        }
      }
    } catch (err) {
      console.warn("Backend API fetch note: Using current memory/cache fallback.", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load from LocalStorage & fetch backend on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedAppliedCoupon = localStorage.getItem(STORAGE_KEYS.COUPON_APPLIED);
      if (savedAppliedCoupon) setAppliedCoupon(JSON.parse(savedAppliedCoupon));
    } catch (e) {
      console.error("Failed loading local cart/wishlist state", e);
    } finally {
      setIsHydrated(true);
    }

    refreshData();
  }, [refreshData]);

  // Save Cart/Wishlist to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      localStorage.setItem(STORAGE_KEYS.COUPON_APPLIED, JSON.stringify(appliedCoupon));
    } catch (e) {
      console.error("Failed saving local storage state", e);
    }
  }, [cart, wishlist, appliedCoupon, isHydrated]);

  // Cart Calculations (BDT currency)
  const FREE_SHIPPING_THRESHOLD = 3000;
  const STANDARD_SHIPPING_FEE = 100;

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = (cartSubtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = Math.min(appliedCoupon.discountValue, cartSubtotal);
    }
  }

  const shippingFee = cartSubtotal === 0 || cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Cart Actions
  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const cartItemId = `${product.id}-${variant.sku}`;
    const calculatedPrice = product.basePrice + (variant.priceOffset || 0);
    const calculatedOriginalPrice = product.compareAtPrice ? product.compareAtPrice + (variant.priceOffset || 0) : undefined;
    const itemImage = variant.images[0] || product.variants[0]?.images[0] || "";

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, variant.stock);
        return prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item));
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          slug: product.slug,
          title: product.title,
          category: product.categoryName,
          variantSku: variant.sku,
          colorName: variant.colorName,
          colorHex: variant.colorHex,
          sizeOrCapacity: variant.sizeOrCapacity,
          price: calculatedPrice,
          originalPrice: calculatedOriginalPrice,
          quantity: Math.min(quantity, variant.stock),
          image: itemImage,
          stock: variant.stock,
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const validQty = Math.min(quantity, item.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon Actions with Backend Validation
  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, cartSubtotal }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.coupon) {
          setAppliedCoupon(data.coupon);
          return { success: true, message: data.message, coupon: data.coupon };
        }
        return { success: false, message: data.message || "Invalid coupon code." };
      }
    } catch (e) {
      console.warn("API coupon validation fallback:", e);
    }

    // Client-side fallback if offline
    const formatted = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === formatted);

    if (!coupon) {
      return { success: false, message: "Invalid coupon code. Try GLORY10 or BAGS20." };
    }

    if (!coupon.isActive) {
      return { success: false, message: "This coupon has expired or is currently inactive." };
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return { success: false, message: "This coupon has reached its maximum redemption limit." };
    }

    if (cartSubtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for this coupon is ৳${coupon.minOrderValue.toLocaleString()}. Add more items to your cart.`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon "${coupon.code}" applied successfully!`, coupon };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Order Actions with Backend PostgreSQL Persistence
  const createOrder = async (customerAddress: DeliveryAddress): Promise<Order> => {
    const orderPayload = {
      customer: customerAddress,
      items: [...cart],
      paymentMethod: "Cash on Delivery",
      subtotal: cartSubtotal,
      shippingFee,
      discountAmount,
      couponApplied: appliedCoupon ? appliedCoupon.code : undefined,
      total: cartTotal,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const newOrder: Order = await res.json();
        setOrders((prev) => [newOrder, ...prev]);
        clearCart();
        // Refresh product stock in background
        refreshData();
        return newOrder;
      }
    } catch (e) {
      console.warn("API order creation fallback:", e);
    }

    // Offline / Mock fallback
    const now = new Date();
    const orderId = `BG-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const initialTracking: TrackingStep[] = [
      {
        status: "Pending",
        label: "Order Placed (Cash on Delivery)",
        description: "Your order has been recorded. Our team will verify and prepare your bag for dispatch.",
        timestamp: "Just now",
        completed: true,
        current: true,
      },
      {
        status: "Processing",
        label: "Quality Inspection & Packaging",
        description: "Your bag is being polished, packed in dust bag with authenticity card.",
        timestamp: "Estimated next 2-4 hours",
        completed: false,
        current: false,
      },
      {
        status: "Shipped",
        label: "Dispatched to Courier",
        description: "Handed over to our courier partner for door delivery.",
        timestamp: "Pending",
        completed: false,
        current: false,
      },
      {
        status: "Out for Delivery",
        label: "Out for Delivery",
        description: "Courier rider is on the way. Please keep cash ready.",
        timestamp: "Pending",
        completed: false,
        current: false,
      },
      {
        status: "Delivered",
        label: "Delivered & Paid",
        description: "Bag received and cash collected upon delivery.",
        timestamp: "Pending",
        completed: false,
        current: false,
      },
    ];

    const fallbackOrder: Order = {
      id: orderId,
      createdAt: now.toISOString(),
      customer: customerAddress,
      items: [...cart],
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending (Cash on Delivery)",
      orderStatus: "Pending",
      subtotal: cartSubtotal,
      shippingFee,
      discountAmount,
      couponApplied: appliedCoupon ? appliedCoupon.code : undefined,
      total: cartTotal,
      trackingHistory: initialTracking,
    };

    setOrders((prev) => [fallbackOrder, ...prev]);
    clearCart();
    return fallbackOrder;
  };

  const getOrderById = async (orderId: string): Promise<Order | undefined> => {
    const sanitized = orderId.trim().toUpperCase();

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(sanitized)}`);
      if (res.ok) {
        const orderData = await res.json();
        return orderData;
      }
    } catch (e) {
      console.warn("Live order lookup fallback:", e);
    }

    return orders.find((o) => o.id.toUpperCase() === sanitized);
  };

  // Admin Product Operations with Backend Sync
  const addProduct = async (
    productData: Omit<Product, "id" | "createdAt" | "reviews"> & { reviews?: Review[] }
  ): Promise<Product> => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        const created: Product = await res.json();
        setProducts((prev) => [created, ...prev]);
        return created;
      }
    } catch (e) {
      console.error("API add product failed:", e);
    }

    // Fallback
    const fallback: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      reviews: productData.reviews || [],
    };
    setProducts((prev) => [fallback, ...prev]);
    return fallback;
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...productData } : p)));

    try {
      await fetch(`/api/products/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } catch (e) {
      console.error("API update product failed:", e);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      await fetch(`/api/products/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("API delete product failed:", e);
    }
  };

  // Admin Category Operations with Backend Sync
  const addCategory = async (categoryData: Omit<CategoryItem, "id">) => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (res.ok) {
        const created: CategoryItem = await res.json();
        setCategories((prev) => [...prev, created]);
        return;
      }
    } catch (e) {
      console.error("API add category failed:", e);
    }

    const fallback: CategoryItem = {
      ...categoryData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, fallback]);
  };

  const updateCategory = async (id: string, categoryData: Partial<CategoryItem>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...categoryData } : c)));

    try {
      await fetch(`/api/categories/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });
    } catch (e) {
      console.error("API update category failed:", e);
    }
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));

    try {
      await fetch(`/api/categories/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("API delete category failed:", e);
    }
  };

  // Admin Coupon Operations with Backend Sync
  const addCoupon = async (couponData: Omit<Coupon, "id" | "usageCount">) => {
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(couponData),
      });

      if (res.ok) {
        const created: Coupon = await res.json();
        setCoupons((prev) => [created, ...prev]);
        return;
      }
    } catch (e) {
      console.error("API add coupon failed:", e);
    }

    const fallback: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usageCount: 0,
      code: couponData.code.toUpperCase().trim(),
    };
    setCoupons((prev) => [fallback, ...prev]);
  };

  const updateCoupon = async (id: string, couponData: Partial<Coupon>) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...couponData,
              code: couponData.code ? couponData.code.toUpperCase().trim() : c.code,
            }
          : c
      )
    );

    try {
      await fetch(`/api/coupons/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(couponData),
      });
    } catch (e) {
      console.error("API update coupon failed:", e);
    }
  };

  const deleteCoupon = async (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));

    try {
      await fetch(`/api/coupons/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("API delete coupon failed:", e);
    }
  };

  // Admin Order Operations with Backend Sync
  const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
    paymentStatus?: PaymentStatus,
    note?: string
  ) => {
    // Optimistic update
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const updatedHistory = order.trackingHistory.map((step) => {
          const stepMatches = step.status === status;
          return {
            ...step,
            completed: stepMatches || step.completed,
            current: stepMatches,
            timestamp: stepMatches && step.timestamp === "Pending" ? "Just now" : step.timestamp,
          };
        });

        return {
          ...order,
          orderStatus: status,
          paymentStatus: paymentStatus || (status === "Delivered" ? "Paid upon Delivery" : order.paymentStatus),
          adminNotes: note !== undefined ? note : order.adminNotes,
          trackingHistory: updatedHistory,
        };
      })
    );

    try {
      await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, paymentStatus, note }),
      });
    } catch (e) {
      console.error("API update order status failed:", e);
    }
  };

  const resetToDefaults = async () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setCoupons(INITIAL_COUPONS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setWishlist([]);
    setAppliedCoupon(null);
    localStorage.clear();
    await refreshData();
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        coupons,
        orders,
        cart,
        wishlist,
        appliedCoupon,
        isCartOpen,
        isSearchOpen,
        isLoading,
        setIsCartOpen,
        setIsSearchOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        createOrder,
        getOrderById,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        updateOrderStatus,
        resetToDefaults,
        refreshData,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        cartItemCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
