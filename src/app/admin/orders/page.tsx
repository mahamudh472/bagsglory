"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  Truck,
  CheckCircle2,
  MapPin,
  Banknote,
  X,
  Printer,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Order, OrderStatus, PaymentStatus } from "@/types";
import { formatPrice } from "@/utils/currency";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery) ||
      o.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || o.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    let paymentStatus: PaymentStatus | undefined = undefined;
    if (newStatus === "Delivered") {
      paymentStatus = "Paid upon Delivery";
    }
    updateOrderStatus(orderId, newStatus, paymentStatus);

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        orderStatus: newStatus,
        paymentStatus: paymentStatus || selectedOrder.paymentStatus,
      });
    }
  };

  const handleMarkAsPaid = (orderId: string) => {
    updateOrderStatus(orderId, "Delivered", "Paid upon Delivery");
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        orderStatus: "Delivered",
        paymentStatus: "Paid upon Delivery",
      });
    }
  };

  const handlePrintReceipt = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex-1 flex flex-col font-sans bg-slate-50 text-slate-800 min-h-screen">
      <AdminHeader
        title="Cash on Delivery Orders"
        subtitle="Process customer orders, update tracking statuses, and confirm cash collection"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-1">
        {/* Status Filter Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          {/* Status Tabs with Horizontal Scroll */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto max-w-full">
            {["all", "Pending", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map((tab) => {
              const count = tab === "all" ? orders.length : orders.filter((o) => o.orderStatus === tab).length;
              const isActive = statusFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-[#0084D4] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab === "all" ? "All Orders" : tab} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, name, phone..."
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6 font-bold">Order Reference</th>
                  <th className="py-3.5 px-4 font-bold">Customer & Destination</th>
                  <th className="py-3.5 px-4 font-bold">Items</th>
                  <th className="py-3.5 px-4 font-bold">Total (COD)</th>
                  <th className="py-3.5 px-4 font-bold">Delivery Status</th>
                  <th className="py-3.5 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-slate-500">
                      <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto mb-3">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <p className="font-heading font-bold text-lg text-slate-800">No matching orders found</p>
                      <p className="text-xs text-slate-500 mt-1">Try selecting a different filter tab or search query.</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/75 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-mono font-bold text-[#0084D4]">
                          {order.id}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800">
                          {order.customer.fullName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {order.customer.phone} • {order.customer.city}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-slate-600">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900 font-mono">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.orderStatus === "Delivered"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : order.orderStatus === "Shipped" || order.orderStatus === "Out for Delivery"
                              ? "bg-sky-50 text-[#0084D4] border border-sky-200"
                              : order.orderStatus === "Processing"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : order.orderStatus === "Cancelled"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as OrderStatus)
                            }
                            className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered (Paid)</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 text-slate-400 hover:text-[#0084D4] hover:bg-sky-50 rounded-lg transition-colors"
                            title="View Full Order Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto font-sans">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 my-auto">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#0084D4]">
                    {selectedOrder.id}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    • Placed {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-800 mt-0.5">
                  Order Invoice & Dispatch Dossier
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintReceipt}
                  className="p-2 text-slate-400 hover:text-[#0084D4] hover:bg-sky-50 rounded-lg transition-colors"
                  title="Print Invoice"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Customer & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-1.5 text-xs">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Customer Profile
                  </h4>
                  <p className="font-bold text-slate-900">{selectedOrder.customer.fullName}</p>
                  <p className="text-slate-600">📞 {selectedOrder.customer.phone}</p>
                  <p className="text-slate-600">✉️ {selectedOrder.customer.email}</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-1.5 text-xs">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Shipping Destination
                  </h4>
                  <p className="text-slate-900 font-medium">{selectedOrder.customer.streetAddress}</p>
                  <p className="text-slate-600">
                    {selectedOrder.customer.city}, {selectedOrder.customer.districtState} {selectedOrder.customer.postalCode}
                  </p>
                  {selectedOrder.customer.deliveryNotes && (
                    <p className="pt-1 text-[#0084D4] font-medium">
                      Note: {selectedOrder.customer.deliveryNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Items in Parcel ({selectedOrder.items.length})
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 text-xs bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg bg-slate-100 relative overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{item.title}</p>
                          <p className="text-[11px] text-slate-500">
                            {item.colorName} • {item.sizeOrCapacity} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#0084D4] font-mono">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Update Delivery Status
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {selectedOrder.paymentStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)
                    }
                    className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0084D4] focus:ring-1 focus:ring-[#0084D4]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered (Paid)</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  {selectedOrder.orderStatus !== "Delivered" && (
                    <button
                      onClick={() => handleMarkAsPaid(selectedOrder.id)}
                      className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      Mark as Delivered & Paid (Cash Collected)
                    </button>
                  )}
                </div>
              </div>

              {/* Financial Totals */}
              <div className="space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({selectedOrder.couponApplied})</span>
                    <span>-{formatPrice(selectedOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery Fee</span>
                  <span className="font-bold text-slate-900">
                    {selectedOrder.shippingFee === 0 ? "Free" : formatPrice(selectedOrder.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm">
                  <span className="font-bold text-slate-800">Total Cash Due</span>
                  <span className="font-bold text-lg text-[#0084D4]">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
