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
    <div className="flex-1 flex flex-col font-sans bg-slate-50">
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Real-time sales telemetry, COD orders, and inventory analytics"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 flex-1">
        {/* KPI Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Revenue */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Gross Sales (COD)
              </span>
              <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0084D4] border border-sky-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="font-extrabold text-2xl sm:text-3xl text-slate-800">
              {formatPrice(totalRevenue)}
            </div>
            <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this week</span>
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Orders
              </span>
              <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0084D4] border border-sky-100 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="font-extrabold text-2xl sm:text-3xl text-slate-800">
              {totalOrders}
            </div>
            <p className="text-xs text-[#0084D4] font-bold">
              {pendingOrders} awaiting courier dispatch
            </p>
          </div>

          {/* Active Bag Models */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Products
              </span>
              <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0084D4] border border-sky-100 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="font-extrabold text-2xl sm:text-3xl text-slate-800">
              {totalProducts}
            </div>
            <p className="text-xs text-slate-500">
              Across {categories.length} store categories
            </p>
          </div>

          {/* Active Coupons */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Coupons
              </span>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
            </div>
            <div className="font-extrabold text-2xl sm:text-3xl text-slate-800">
              {coupons.filter((c) => c.isActive).length}
            </div>
            <p className="text-xs text-emerald-600 font-bold">
              {coupons.reduce((sum, c) => sum + c.usageCount, 0)} total redemptions
            </p>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <Link
            href="/admin/products"
            className="flex-1 sm:flex-initial justify-center px-4 py-2.5 bg-[#0084D4] hover:bg-[#0073B6] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add New Product</span>
          </Link>

          <Link
            href="/admin/coupons"
            className="flex-1 sm:flex-initial justify-center px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
          >
            <Tag className="w-4 h-4 text-[#0084D4]" />
            <span>Create Coupon</span>
          </Link>

          <Link
            href="/admin/orders"
            className="w-full sm:w-auto justify-center px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
          >
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Manage COD Orders</span>
          </Link>
        </div>

        {/* 2-Column: Recent Orders & Inventory Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left: Recent Orders Table */}
          <div className="lg:col-span-8 bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-800">
                  Recent Cash on Delivery Orders
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live orders placed by customers awaiting delivery
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-[#0084D4] hover:text-[#0073B6] uppercase tracking-wider flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left text-xs min-w-[580px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[11px]">
                    <th className="pb-3 font-bold">Order ID</th>
                    <th className="pb-3 font-bold">Customer</th>
                    <th className="pb-3 font-bold">Items</th>
                    <th className="pb-3 font-bold">Total (COD)</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 font-mono font-bold text-slate-800">
                        {order.id}
                      </td>
                      <td className="py-3.5">
                        <div className="font-bold text-slate-800">
                          {order.customer.fullName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {order.customer.city}, {order.customer.districtState}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="font-medium text-slate-600">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-slate-900 font-mono">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            order.orderStatus === "Delivered"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : order.orderStatus === "Shipped"
                              ? "bg-sky-50 text-[#0084D4] border border-sky-200"
                              : order.orderStatus === "Processing"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none focus:border-[#0084D4]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered (Paid)</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Low Stock Alerts & Inventory Health */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-4 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Inventory Low-Stock Alerts</span>
              </div>

              {lowStockVariants.length === 0 ? (
                <div className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span>✓ All product variants are healthy with ample inventory.</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {lowStockVariants.map((v) => (
                    <div key={v.sku} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{v.productTitle}</p>
                        <p className="text-[11px] text-slate-500">
                          {v.colorName} • SKU: <span className="font-mono">{v.sku}</span>
                        </p>
                      </div>
                      <span className="font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full text-[11px]">
                        {v.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/admin/products"
                className="block text-center w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
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
