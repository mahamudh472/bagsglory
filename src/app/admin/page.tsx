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
    <div className="flex-1 flex flex-col font-ui bg-[#F8F6F1]">
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Real-time sales telemetry, COD orders, and inventory analytics"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 flex-1">
        {/* KPI Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Revenue */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#E7E2DA] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#625E58]">
                Gross Sales (COD)
              </span>
              <div className="w-8 h-8 rounded-md bg-[#A85A20]/10 text-[#A85A20] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="font-ui font-extrabold text-2xl sm:text-3xl text-[#181817]">
              {formatPrice(totalRevenue)}
            </div>
            <p className="text-xs text-[#2D5A3C] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this week</span>
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#E7E2DA] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#625E58]">
                Total Orders
              </span>
              <div className="w-8 h-8 rounded-md bg-[#181817]/10 text-[#181817] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="font-ui font-extrabold text-2xl sm:text-3xl text-[#181817]">
              {totalOrders}
            </div>
            <p className="text-xs text-[#A85A20] font-semibold">
              {pendingOrders} awaiting courier dispatch
            </p>
          </div>

          {/* Active Bag Models */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#E7E2DA] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#625E58]">
                Active Silhouettes
              </span>
              <div className="w-8 h-8 rounded-md bg-[#B8AA98]/20 text-[#181817] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="font-ui font-extrabold text-2xl sm:text-3xl text-[#181817]">
              {totalProducts}
            </div>
            <p className="text-xs text-[#625E58]">
              Across {categories.length} luxury collections
            </p>
          </div>

          {/* Active Coupons */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#E7E2DA] shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#625E58]">
                Active Coupons
              </span>
              <div className="w-8 h-8 rounded-md bg-[#2D5A3C]/10 text-[#2D5A3C] flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <div className="font-ui font-extrabold text-2xl sm:text-3xl text-[#181817]">
              {coupons.filter((c) => c.isActive).length}
            </div>
            <p className="text-xs text-[#2D5A3C] font-semibold">
              {coupons.reduce((sum, c) => sum + c.usageCount, 0)} total redemptions
            </p>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <Link
            href="/admin/products"
            className="flex-1 sm:flex-initial justify-center px-4 py-2.5 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-subtle"
          >
            <Plus className="w-4 h-4 text-[#B8AA98]" />
            <span>Add New Bag</span>
          </Link>

          <Link
            href="/admin/coupons"
            className="flex-1 sm:flex-initial justify-center px-4 py-2.5 bg-white hover:bg-[#F8F6F1] text-[#181817] border border-[#E7E2DA] rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-subtle"
          >
            <Tag className="w-4 h-4 text-[#A85A20]" />
            <span>Create Promo Coupon</span>
          </Link>

          <Link
            href="/admin/orders"
            className="w-full sm:w-auto justify-center px-4 py-2.5 bg-white hover:bg-[#F8F6F1] text-[#181817] border border-[#E7E2DA] rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-subtle"
          >
            <Truck className="w-4 h-4 text-[#2D5A3C]" />
            <span>Manage COD Orders</span>
          </Link>
        </div>

        {/* 2-Column: Recent Orders & Inventory Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left: Recent Orders Table */}
          <div className="lg:col-span-8 bg-white rounded-lg p-5 sm:p-6 lg:p-8 border border-[#E7E2DA] shadow-subtle space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E2DA] pb-4">
              <div>
                <h3 className="font-editorial text-2xl text-[#181817] font-normal">
                  Recent Cash on Delivery Orders
                </h3>
                <p className="text-xs text-[#625E58] mt-0.5">
                  Live orders placed by customers awaiting delivery
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-[#A85A20] hover:text-[#181817] uppercase tracking-wider flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left text-xs min-w-[580px]">
                <thead>
                  <tr className="border-b border-[#E7E2DA] text-[#8C827A] uppercase tracking-[0.1em] text-[11px]">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Items</th>
                    <th className="pb-3 font-semibold">Total (COD)</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2DA]">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-[#F8F6F1] transition-colors">
                      <td className="py-3.5 font-mono font-semibold text-[#181817]">
                        {order.id}
                      </td>
                      <td className="py-3.5">
                        <div className="font-semibold text-[#181817]">
                          {order.customer.fullName}
                        </div>
                        <div className="text-[11px] text-[#625E58]">
                          {order.customer.city}, {order.customer.districtState}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="font-medium text-[#625E58]">
                          {order.items.length} {order.items.length === 1 ? "bag" : "bags"}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-[#181817] font-mono">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                            order.orderStatus === "Delivered"
                              ? "bg-[#2D5A3C]/15 text-[#2D5A3C]"
                              : order.orderStatus === "Shipped"
                              ? "bg-[#181817]/10 text-[#181817]"
                              : order.orderStatus === "Processing"
                              ? "bg-[#A85A20]/15 text-[#A85A20]"
                              : "bg-[#F8F6F1] text-[#625E58] border border-[#E7E2DA]"
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
                          className="text-xs font-semibold bg-[#F8F6F1] border border-[#E7E2DA] rounded-md px-2 py-1 text-[#181817] focus:outline-none focus:border-[#181817]"
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
            <div className="bg-white rounded-lg p-5 sm:p-6 lg:p-8 border border-[#E7E2DA] shadow-subtle space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-[#181817] font-semibold text-sm border-b border-[#E7E2DA] pb-4 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-[#A85A20]" />
                <span>Inventory Low-Stock Alerts</span>
              </div>

              {lowStockVariants.length === 0 ? (
                <div className="p-4 bg-[#2D5A3C]/10 text-[#2D5A3C] rounded-md text-xs font-semibold flex items-center gap-2">
                  <span>✓ All product variants are healthy with ample inventory.</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-[#E7E2DA]">
                  {lowStockVariants.map((v) => (
                    <div key={v.sku} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-[#181817]">{v.productTitle}</p>
                        <p className="text-[11px] text-[#625E58]">
                          {v.colorName} • SKU: <span className="font-mono">{v.sku}</span>
                        </p>
                      </div>
                      <span className="font-bold text-[#A85A20] bg-[#A85A20]/10 px-2 py-0.5 rounded text-[11px]">
                        {v.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/admin/products"
                className="block text-center w-full py-2.5 bg-[#F8F6F1] hover:bg-[#EFEBE4] text-[#181817] border border-[#E7E2DA] rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
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
