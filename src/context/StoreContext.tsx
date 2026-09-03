"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
  applyCoupon: (code: string) => { success: boolean; message: string; coupon?: Coupon };
  removeCoupon: () => void;

  // Order operations
  createOrder: (customerAddress: DeliveryAddress) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Admin Product CRUD
  addProduct: (productData: Omit<Product, "id" | "createdAt" | "reviews"> & { reviews?: Review[] }) => Product;
  updateProduct: (id: string, productData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Admin Category CRUD
  addCategory: (categoryData: Omit<CategoryItem, "id">) => void;
  updateCategory: (id: string, categoryData: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;

  // Admin Coupon CRUD
  addCoupon: (couponData: Omit<Coupon, "id" | "usageCount">) => void;
  updateCoupon: (id: string, couponData: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  // Admin Order updates
  updateOrderStatus: (orderId: string, status: OrderStatus, paymentStatus?: PaymentStatus, note?: string) => void;
  resetToDefaults: () => void;

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
  PRODUCTS: "bagsglory_products_v2",
  CATEGORIES: "bagsglory_categories_v2",
  COUPONS: "bagsglory_coupons_v2",
  ORDERS: "bagsglory_orders_v2",
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
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedCoupons = localStorage.getItem(STORAGE_KEYS.COUPONS);
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));

      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedAppliedCoupon = localStorage.getItem(STORAGE_KEYS.COUPON_APPLIED);
      if (savedAppliedCoupon) setAppliedCoupon(JSON.parse(savedAppliedCoupon));
    } catch (e) {
      console.error("Failed loading local storage state", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      localStorage.setItem(STORAGE_KEYS.COUPON_APPLIED, JSON.stringify(appliedCoupon));
    } catch (e) {
      console.error("Failed saving local storage state", e);
    }
  }, [products, categories, coupons, orders, cart, wishlist, appliedCoupon, isHydrated]);

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

  // Coupon Actions
  const applyCoupon = (code: string) => {
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
        message: `Minimum order value for this coupon is $${coupon.minOrderValue.toFixed(2)}. Add more items to your cart.`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon "${coupon.code}" applied successfully!`, coupon };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Order Actions
  const createOrder = (customerAddress: DeliveryAddress): Order => {
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

    const newOrder: Order = {
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

    // Deduct stock for ordered variants
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const orderItemForProduct = cart.filter((item) => item.productId === p.id);
        if (orderItemForProduct.length === 0) return p;

        const updatedVariants = p.variants.map((v) => {
          const match = orderItemForProduct.find((item) => item.variantSku === v.sku);
          if (match) {
            return { ...v, stock: Math.max(0, v.stock - match.quantity) };
          }
          return v;
        });

        return { ...p, variants: updatedVariants };
      })
    );

    // Update coupon usage count if applied
    if (appliedCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === appliedCoupon.id ? { ...c, usageCount: c.usageCount + 1 } : c))
      );
    }

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    const sanitized = orderId.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === sanitized);
  };

  // Admin Product Operations
  const addProduct = (productData: Omit<Product, "id" | "createdAt" | "reviews"> & { reviews?: Review[] }): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      reviews: productData.reviews || [],
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...productData } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Admin Category Operations
  const addCategory = (categoryData: Omit<CategoryItem, "id">) => {
    const newCategory: CategoryItem = {
      ...categoryData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, categoryData: Partial<CategoryItem>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...categoryData } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Admin Coupon Operations
  const addCoupon = (couponData: Omit<Coupon, "id" | "usageCount">) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usageCount: 0,
      code: couponData.code.toUpperCase().trim(),
    };
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const updateCoupon = (id: string, couponData: Partial<Coupon>) => {
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
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  // Admin Order Operations
  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    paymentStatus?: PaymentStatus,
    note?: string
  ) => {
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
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setCoupons(INITIAL_COUPONS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setWishlist([]);
    setAppliedCoupon(null);
    localStorage.clear();
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
