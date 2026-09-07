"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  X,
  Printer,
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
    <div className="flex-1 flex flex-col font-sans bg-[#F8F5EF] text-[#0D0C0B] min-h-screen">
      <AdminHeader
        title="Cash on Delivery Orders"
        subtitle="Process customer orders, update tracking statuses, and confirm cash collection"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-1">
        {/* Status Filter Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3.5 sm:p-4 bg-white border border-[#E5DED4]">
          {/* Status Tabs with Horizontal Scroll */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F8F5EF] border border-[#E5DED4] overflow-x-auto max-w-full">
            {["all", "Pending", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map((tab) => {
              const count = tab === "all" ? orders.length : orders.filter((o) => o.orderStatus === tab).length;
              const isActive = statusFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-[#0D0C0B] text-[#C9A45C]"
                      : "text-[#746C63] hover:text-[#0D0C0B]"
                  }`}
                >
                  {tab === "all" ? "All Orders" : tab} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#746C63] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, name, phone..."
              className="w-full text-xs pl-9 pr-4 py-2.5 border border-[#E5DED4] bg-[#F8F5EF] text-[#0D0C0B] placeholder-[#746C63] focus:bg-white focus:outline-none focus:border-[#C9A45C]"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-[#E5DED4] overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead>
                <tr className="bg-[#F8F5EF] border-b border-[#E5DED4] text-[#746C63] uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-6 font-semibold">Order Reference</th>
                  <th className="py-3.5 px-4 font-semibold">Customer & Destination</th>
                  <th className="py-3.5 px-4 font-semibold">Items</th>
                  <th className="py-3.5 px-4 font-semibold">Total (COD)</th>
                  <th className="py-3.5 px-4 font-semibold">Delivery Status</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DED4]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-[#746C63]">
                      <div className="w-12 h-12 bg-[#F8F5EF] border border-[#E5DED4] text-[#C9A45C] flex items-center justify-center mx-auto mb-3">
                        <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <p className="font-heading text-xl text-[#0D0C0B]">No matching orders found</p>
                      <p className="text-xs text-[#746C63] font-light mt-1">Try selecting a different filter tab or search query.</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F8F5EF] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-mono font-bold text-[#0D0C0B]">
                          {order.id}
                        </div>
                        <div className="text-[11px] text-[#746C63] font-light">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-[#0D0C0B]">
                          {order.customer.fullName}
                        </div>
                        <div className="text-[11px] text-[#746C63] font-light">
                          {order.customer.phone} • {order.customer.city}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-light text-[#746C63]">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#0D0C0B]">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                            order.orderStatus === "Delivered"
                              ? "bg-[#F8F5EF] text-[#0D0C0B] border border-[#E5DED4]"
                              : order.orderStatus === "Shipped" || order.orderStatus === "Out for Delivery"
                              ? "bg-[#0D0C0B] text-[#C9A45C]"
                              : order.orderStatus === "Processing"
                              ? "bg-[#F8F5EF] text-[#746C63] border border-[#E5DED4]"
                              : order.orderStatus === "Cancelled"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-[#F8F5EF] text-[#746C63] border border-[#E5DED4]"
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
                            className="text-xs font-semibold bg-white border border-[#E5DED4] px-2.5 py-1.5 text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
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
                            className="p-1.5 text-[#746C63] hover:text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors"
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
            className="fixed inset-0 bg-[#0D0C0B]/60 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative bg-white shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden border border-[#E5DED4] my-auto">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-[#E5DED4] flex items-center justify-between bg-[#F8F5EF]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#0D0C0B]">
                    {selectedOrder.id}
                  </span>
                  <span className="text-[11px] text-[#746C63]">
                    • Placed {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="font-heading font-normal text-xl sm:text-2xl text-[#0D0C0B] mt-0.5">
                  Order Invoice & Dispatch Dossier
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintReceipt}
                  className="p-2 text-[#746C63] hover:text-[#0D0C0B] hover:bg-white transition-colors"
                  title="Print Invoice"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-[#746C63] hover:text-[#0D0C0B] hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Customer & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-[#E5DED4] bg-[#F8F5EF] space-y-1.5 text-xs">
                  <h4 className="font-semibold text-[#0D0C0B] uppercase tracking-[0.16em] text-[10px]">
                    Customer Profile
                  </h4>
                  <p className="font-semibold text-[#0D0C0B]">{selectedOrder.customer.fullName}</p>
                  <p className="text-[#746C63] font-light">📞 {selectedOrder.customer.phone}</p>
                  <p className="text-[#746C63] font-light">✉️ {selectedOrder.customer.email}</p>
                </div>

                <div className="p-4 border border-[#E5DED4] bg-[#F8F5EF] space-y-1.5 text-xs">
                  <h4 className="font-semibold text-[#0D0C0B] uppercase tracking-[0.16em] text-[10px]">
                    Shipping Destination
                  </h4>
                  <p className="text-[#0D0C0B] font-medium">{selectedOrder.customer.streetAddress}</p>
                  <p className="text-[#746C63] font-light">
                    {selectedOrder.customer.city}, {selectedOrder.customer.districtState} {selectedOrder.customer.postalCode}
                  </p>
                  {selectedOrder.customer.deliveryNotes && (
                    <p className="pt-1 text-[#C9A45C] font-medium">
                      Note: {selectedOrder.customer.deliveryNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0D0C0B]">
                  Items in Parcel ({selectedOrder.items.length})
                </h4>
                <div className="divide-y divide-[#E5DED4] border border-[#E5DED4]">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 text-xs bg-white">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-14 bg-[#F8F5EF] relative overflow-hidden shrink-0 border border-[#E5DED4]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-[#0D0C0B]">{item.title}</p>
                          <p className="text-[11px] text-[#746C63] uppercase tracking-wider">
                            {item.colorName} • {item.sizeOrCapacity} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#0D0C0B]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Section */}
              <div className="p-4 border border-[#E5DED4] bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-[#0D0C0B] uppercase tracking-[0.16em]">
                    Update Delivery Status
                  </h4>
                  <span className="text-xs font-semibold text-[#0D0C0B] bg-[#F8F5EF] border border-[#E5DED4] px-2.5 py-0.5">
                    {selectedOrder.paymentStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)
                    }
                    className="text-xs font-semibold bg-white border border-[#E5DED4] px-3 py-2 text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
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
                      className="px-4 py-2 bg-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#C9A45C] hover:text-[#0D0C0B] transition-colors"
                    >
                      Mark as Delivered & Paid (Cash Collected)
                    </button>
                  )}
                </div>
              </div>

              {/* Financial Totals */}
              <div className="space-y-2 border-t border-[#E5DED4] pt-4 text-xs text-[#746C63]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0D0C0B]">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-[#C9A45C] font-semibold">
                    <span>Privilege Savings ({selectedOrder.couponApplied})</span>
                    <span>-{formatPrice(selectedOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery Fee</span>
                  <span className="font-semibold text-[#0D0C0B]">
                    {selectedOrder.shippingFee === 0 ? "Complimentary" : formatPrice(selectedOrder.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-[#E5DED4] text-sm">
                  <span className="font-semibold uppercase tracking-wider text-xs text-[#0D0C0B]">Total Cash Due</span>
                  <span className="font-normal font-heading text-2xl text-[#0D0C0B]">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
