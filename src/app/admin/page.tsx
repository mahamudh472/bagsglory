"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Tag,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Truck,
  Plus,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CustomSelect } from "@/components/common/CustomSelect";
import { OrderStatus } from "@/types";
import { formatPrice } from "@/utils/currency";

export default function AdminDashboardPage() {
  const { products, orders, coupons, categories, updateOrderStatus } = useStore();

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
  const totalProducts = products.length;
  const lowStockVariants = products.flatMap((p) =>
    p.variants.filter((v) => v.stock <= 5).map((v) => ({ ...v, productTitle: p.title }))
  );

  return (
    <div className="flex-1 flex flex-col font-sans bg-[#F8F5EF]">
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Real-time sales telemetry, COD orders, and inventory analytics"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 flex-1">
        {/* KPI Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Revenue */}
          <div className="bg-white p-5 sm:p-6 border border-[#E5DED4] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63]">
                Gross Sales (COD)
              </span>
              <div className="w-9 h-9 bg-[#F8F5EF] text-[#C9A45C] border border-[#E5DED4] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
              {formatPrice(totalRevenue)}
            </div>
            <p className="text-xs text-[#C9A45C] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{orders.filter(o => o.orderStatus === "Delivered" || o.paymentStatus.includes("Paid")).length} orders fulfilled</span>
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-5 sm:p-6 border border-[#E5DED4] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63]">
                Total Orders
              </span>
              <div className="w-9 h-9 bg-[#F8F5EF] text-[#C9A45C] border border-[#E5DED4] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
              {totalOrders}
            </div>
            <p className="text-xs text-[#746C63]">
              <strong className="text-[#0D0C0B]">{pendingOrders}</strong> awaiting dispatch
            </p>
          </div>

          {/* Active Bag Models */}
          <div className="bg-white p-5 sm:p-6 border border-[#E5DED4] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63]">
                Active Products
              </span>
              <div className="w-9 h-9 bg-[#F8F5EF] text-[#C9A45C] border border-[#E5DED4] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
              {totalProducts}
            </div>
            <p className="text-xs text-[#746C63]">
              Across {categories.length} luxury collections
            </p>
          </div>

          {/* Active Coupons */}
          <div className="bg-white p-5 sm:p-6 border border-[#E5DED4] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#746C63]">
                Active Coupons
              </span>
              <div className="w-9 h-9 bg-[#F8F5EF] text-[#C9A45C] border border-[#E5DED4] flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-normal text-2xl sm:text-3xl text-[#0D0C0B]">
              {coupons.filter((c) => c.isActive).length}
            </div>
            <p className="text-xs text-[#746C63]">
              {coupons.reduce((sum, c) => sum + c.usageCount, 0)} total redemptions
            </p>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <Link
            href="/admin/products"
            className="flex-1 sm:flex-initial justify-center px-5 py-2.5 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>

          <Link
            href="/admin/coupons"
            className="flex-1 sm:flex-initial justify-center px-5 py-2.5 bg-white hover:bg-[#F8F5EF] text-[#0D0C0B] border border-[#E5DED4] text-xs font-semibold uppercase tracking-[0.16em] flex items-center gap-2 transition-colors"
          >
            <Tag className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Create Coupon</span>
          </Link>

          <Link
            href="/admin/orders"
            className="w-full sm:w-auto justify-center px-5 py-2.5 bg-white hover:bg-[#F8F5EF] text-[#0D0C0B] border border-[#E5DED4] text-xs font-semibold uppercase tracking-[0.16em] flex items-center gap-2 transition-colors"
          >
            <Truck className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Manage COD Orders</span>
          </Link>
        </div>

        {/* 2-Column: Recent Orders & Inventory Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left: Recent Orders Table */}
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 lg:p-8 border border-[#E5DED4] space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DED4] pb-4">
              <div>
                <h3 className="font-heading font-normal text-xl sm:text-2xl text-[#0D0C0B]">
                  Recent Cash on Delivery Orders
                </h3>
                <p className="text-xs text-[#746C63] font-light mt-0.5">
                  Live orders placed by customers awaiting delivery
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-[#746C63] hover:text-[#0D0C0B] uppercase tracking-[0.16em] flex items-center gap-1 self-start sm:self-auto transition-colors"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left text-xs min-w-[580px]">
                <thead>
                  <tr className="border-b border-[#E5DED4] text-[#746C63] uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Items</th>
                    <th className="pb-3 font-semibold">Total (COD)</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DED4]">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-[#F8F5EF] transition-colors">
                      <td className="py-3.5 font-mono font-bold text-[#0D0C0B]">
                        {order.id}
                      </td>
                      <td className="py-3.5">
                        <div className="font-semibold text-[#0D0C0B]">
                          {order.customer.fullName}
                        </div>
                        <div className="text-[11px] text-[#746C63] font-light">
                          {order.customer.city}, {order.customer.districtState}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="font-light text-[#746C63]">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </span>
                      </td>
                      <td className="py-3.5 font-semibold text-[#0D0C0B]">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            order.orderStatus === "Delivered"
                              ? "bg-[#F8F5EF] text-[#0D0C0B] border border-[#E5DED4]"
                              : order.orderStatus === "Shipped"
                              ? "bg-[#0D0C0B] text-[#C9A45C]"
                              : order.orderStatus === "Processing"
                              ? "bg-[#F8F5EF] text-[#746C63] border border-[#E5DED4]"
                              : "bg-[#F8F5EF] text-[#746C63] border border-[#E5DED4]"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <CustomSelect
                          value={order.orderStatus}
                          onChange={(val) =>
                            updateOrderStatus(order.id, val as OrderStatus)
                          }
                          options={[
                            { value: "Pending", label: "Pending" },
                            { value: "Processing", label: "Processing" },
                            { value: "Shipped", label: "Shipped" },
                            { value: "Out for Delivery", label: "Out for Delivery" },
                            { value: "Delivered", label: "Delivered (Paid)" },
                            { value: "Cancelled", label: "Cancelled" },
                          ]}
                          className="w-36 text-left"
                          buttonClassName="py-1 px-2.5 text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Low Stock Alerts & Inventory Health */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 sm:p-6 lg:p-8 border border-[#E5DED4] space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-[#0D0C0B] font-semibold text-xs border-b border-[#E5DED4] pb-4 uppercase tracking-[0.16em]">
                <AlertTriangle className="w-4 h-4 text-[#C9A45C]" />
                <span>Inventory Low-Stock Alerts</span>
              </div>

              {lowStockVariants.length === 0 ? (
                <div className="p-4 bg-[#F8F5EF] text-[#0D0C0B] border border-[#E5DED4] text-xs flex items-center gap-2 font-light">
                  <span>✦ All product editions are well-stocked with pristine inventory.</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-[#E5DED4]">
                  {lowStockVariants.map((v) => (
                    <div key={v.sku} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-[#0D0C0B]">{v.productTitle}</p>
                        <p className="text-[11px] text-[#746C63] uppercase tracking-wider">
                          {v.colorName} • SKU: <span className="font-mono">{v.sku}</span>
                        </p>
                      </div>
                      <span className="font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] uppercase">
                        {v.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/admin/products"
                className="block text-center w-full py-2.5 bg-[#F8F5EF] hover:bg-white text-[#0D0C0B] border border-[#E5DED4] text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
              >
                Manage Stock in Catalog
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
