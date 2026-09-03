"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  X,
  Check,
  Layers,
  AlertCircle,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BagCategory, Product, ProductVariant } from "@/types";
import { formatPrice } from "@/utils/currency";

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<BagCategory>("backpacks");
  const [categoryName, setCategoryName] = useState("Heritage & Urban Backpacks");
  const [basePrice, setBasePrice] = useState<number>(2500);
  const [compareAtPrice, setCompareAtPrice] = useState<number | undefined>(3000);
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [tagsInput, setTagsInput] = useState("Leather, Premium, Commute");

  // Specs
  const [dim, setDim] = useState("16.5\" H x 11.5\" W x 5.5\" D");
  const [cap, setCap] = useState("20 Liters");
  const [wt, setWt] = useState("2.2 lbs (1.0 kg)");
  const [lap, setLap] = useState("Up to 16\" MacBook Pro");
  const [mat, setMat] = useState("Full-Grain Italian Vachetta Leather");
  const [water, setWater] = useState("Weatherproof wax coating");
  const [war, setWar] = useState("Lifetime Guarantee");

  // Flags
  const [isFeatured, setIsFeatured] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  // Variants State
  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      sku: "BG-NEW-01",
      colorName: "Saddle Tan",
      colorHex: "#9A3412",
      sizeOrCapacity: "Standard (20L)",
      materialOption: "Full-Grain Leather",
      stock: 12,
      priceOffset: 0,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&q=80&w=1200",
      ],
    },
  ]);

  const openAddModal = () => {
    setEditingProduct(null);
    setTitle("");
    setSlug("");
    setCategory("backpacks");
    setCategoryName("Heritage & Urban Backpacks");
    setBasePrice(2500);
    setCompareAtPrice(3000);
    setShortDesc("");
    setDesc("");
    setTagsInput("Leather, Handcrafted, Work");
    setDim("16.5\" H x 11.5\" W x 5.5\" D");
    setCap("20 Liters");
    setWt("2.2 lbs (1.0 kg)");
    setLap("Up to 16\" MacBook Pro");
    setMat("Full-Grain Italian Vachetta Leather");
    setWater("Weatherproof wax coating");
    setWar("Lifetime Craftsmanship Guarantee");
    setIsFeatured(true);
    setIsBestSeller(false);
    setIsNewArrival(true);
    setVariants([
      {
        sku: `BG-${Date.now().toString().slice(-4)}-1`,
        colorName: "Cognac Brown",
        colorHex: "#9A3412",
        sizeOrCapacity: "Standard (20L)",
        materialOption: "Full-Grain Leather",
        stock: 15,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&q=80&w=1200",
        ],
      },
    ]);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setSlug(product.slug);
    setCategory(product.category);
    setCategoryName(product.categoryName);
    setBasePrice(product.basePrice);
    setCompareAtPrice(product.compareAtPrice);
    setShortDesc(product.shortDescription);
    setDesc(product.description || "");
    setTagsInput(product.tags.join(", "));
    setDim(product.specs.dimensions);
    setCap(product.specs.capacity);
    setWt(product.specs.weight);
    setLap(product.specs.laptopFit);
    setMat(product.specs.material);
    setWater(product.specs.waterResistance);
    setIsFeatured(Boolean(product.isFeatured));
    setIsBestSeller(Boolean(product.isBestSeller));
    setIsNewArrival(Boolean(product.isNewArrival));
    setVariants([...product.variants]);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProduct) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleCategorySelect = (catSlug: string) => {
    const found = categories.find((c) => c.slug === catSlug);
    if (found) {
      setCategory(found.slug as BagCategory);
      setCategoryName(found.name);
    }
  };

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        sku: `BG-${Date.now().toString().slice(-4)}-${variants.length + 1}`,
        colorName: "Espresso Black",
        colorHex: "#18181B",
        sizeOrCapacity: "Standard (20L)",
        materialOption: "Full-Grain Leather",
        stock: 10,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200",
        ],
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length <= 1) {
      alert("A bag must have at least one variant.");
      return;
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: keyof ProductVariant,
    val: any
  ) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: val };
    setVariants(updated);
  };

  const handleVariantImageChange = (
    variantIndex: number,
    imageIndex: number,
    url: string
  ) => {
    const updated = [...variants];
    const newImages = [...updated[variantIndex].images];
    newImages[imageIndex] = url;
    updated[variantIndex].images = newImages;
    setVariants(updated);
  };

  const handleAddVariantImage = (variantIndex: number) => {
    const updated = [...variants];
    updated[variantIndex].images.push(
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200"
    );
    setVariants(updated);
  };

  const handleRemoveVariantImage = (variantIndex: number, imgIndex: number) => {
    const updated = [...variants];
    if (updated[variantIndex].images.length <= 1) return;
    updated[variantIndex].images = updated[variantIndex].images.filter((_, i) => i !== imgIndex);
    setVariants(updated);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert("Please provide a product title and URL slug.");
      return;
    }

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const productPayload: Omit<Product, "id"> = {
      title,
      slug,
      category,
      categoryName,
      basePrice,
      compareAtPrice: compareAtPrice || undefined,
      shortDescription: shortDesc || title,
      description: desc || shortDesc,
      features: [
        "Full-grain Italian Vachetta leather with natural patina evolution",
        "Cast solid brass hardware and Japanese YKK Excella zippers",
        "Dedicated padded laptop compartment with microfiber lining",
        "Lifetime atelier craftsmanship guarantee with free doorstep exchange",
      ],
      specs: {
        dimensions: dim,
        capacity: cap,
        weight: wt,
        laptopFit: lap,
        material: mat,
        waterResistance: water,
        warranty: war,
      },
      tags: tagsArray,
      rating: editingProduct?.rating || 4.9,
      reviewCount: editingProduct?.reviewCount || 12,
      isFeatured,
      isBestSeller,
      isNewArrival,
      variants,
      reviews: editingProduct?.reviews || [],
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the catalog?`)) {
      deleteProduct(id);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.variants.some((v) => v.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col font-ui bg-[#F8F6F1]">
      <AdminHeader
        title="Products & Inventory"
        subtitle="Manage handcrafted bags, multi-color swatches, SKUs, and stock counts"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, category, SKU..."
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-md border border-[#E7E2DA] bg-white focus:outline-none focus:border-[#181817]"
              />
            </div>

            {/* Category Filter Dropdown */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full sm:w-auto text-xs font-semibold text-[#181817] bg-white border border-[#E7E2DA] rounded-md px-3 py-2.5 focus:outline-none focus:border-[#181817]"
            >
              <option value="all">All Collections ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-colors"
          >
            <Plus className="w-4 h-4 text-[#B8AA98]" />
            <span>Add New Bag</span>
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-[#E7E2DA] shadow-subtle overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#F8F6F1] border-b border-[#E7E2DA] text-[#8C827A] uppercase tracking-[0.1em] text-[11px]">
                  <th className="py-3.5 px-6 font-semibold">Silhouette</th>
                  <th className="py-3.5 px-4 font-semibold">Collection</th>
                  <th className="py-3.5 px-4 font-semibold">Base Price</th>
                  <th className="py-3.5 px-4 font-semibold">Variants & Stock</th>
                  <th className="py-3.5 px-4 font-semibold">Badges</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E2DA]">
                {filteredProducts.map((product) => {
                  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
                  const firstImg = product.variants[0]?.images[0] || "";

                  return (
                    <tr key={product.id} className="hover:bg-[#F8F6F1] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 rounded-md bg-[#EFEBE4] relative overflow-hidden shrink-0 border border-[#E7E2DA]">
                            {firstImg ? (
                              <Image
                                src={firstImg}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#8C827A]">
                                <Package className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-[#181817] line-clamp-1">
                              {product.title}
                            </div>
                            <div className="text-[11px] text-[#625E58] font-mono">
                              /product/{product.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-[#625E58]">
                        {product.categoryName}
                      </td>
                      <td className="py-4 px-4 font-bold text-[#181817] font-mono">
                        {formatPrice(product.basePrice)}
                        {product.compareAtPrice && (
                          <span className="text-[11px] text-[#8C827A] line-through ml-1 font-normal">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            {product.variants.map((v) => (
                              <span
                                key={v.sku}
                                className="w-3 h-3 rounded-full border border-black/15 inline-block"
                                style={{ backgroundColor: v.colorHex }}
                                title={`${v.colorName} (${v.stock} in stock)`}
                              />
                            ))}
                            <span className="text-[11px] text-[#625E58] font-medium ml-1">
                              ({product.variants.length} colors)
                            </span>
                          </div>
                          <div className="text-[11px] text-[#625E58]">
                            Stock:{" "}
                            <span
                              className={
                                totalStock <= 5 ? "text-[#A33B3B] font-bold" : "text-[#2D5A3C] font-semibold"
                              }
                            >
                              {totalStock} units
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {product.isBestSeller && (
                            <span className="bg-[#A85A20]/15 text-[#A85A20] font-semibold text-[10px] px-2 py-0.5 rounded">
                              Bestseller
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="bg-[#181817]/10 text-[#181817] font-semibold text-[10px] px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                          {product.isNewArrival && (
                            <span className="bg-[#2D5A3C]/15 text-[#2D5A3C] font-semibold text-[10px] px-2 py-0.5 rounded">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-1.5 text-[#625E58] hover:text-[#181817] hover:bg-[#F8F6F1] rounded-md transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.title)}
                            className="p-1.5 text-[#625E58] hover:text-[#A33B3B] hover:bg-[#A33B3B]/10 rounded-md transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto font-ui">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#181817]/75 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-[#E7E2DA] my-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#E7E2DA] flex items-center justify-between bg-[#F8F6F1] shrink-0">
              <div>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#181817] font-normal">
                  {editingProduct ? "Edit Bag Silhouette" : "Add New Bag Silhouette"}
                </h2>
                <p className="text-xs text-[#625E58] mt-0.5">
                  Configure leather specifications, multi-color swatches, and stock
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#625E58] hover:text-[#181817] rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Form) */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* 1. Basic Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#181817] border-b border-[#E7E2DA] pb-2 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#A85A20]" />
                  <span>1. General Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      Bag Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. The Sovereign Leather Daypack"
                      className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. sovereign-leather-daypack"
                      className="w-full text-xs font-mono p-2.5 rounded-md border border-[#E7E2DA] bg-[#F8F6F1] focus:outline-none focus:border-[#181817]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      Collection *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => handleCategorySelect(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] bg-white focus:outline-none focus:border-[#181817]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      Base Price (BDT ৳) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={basePrice}
                      onChange={(e) => setBasePrice(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      Compare Price (Original MSRP)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={compareAtPrice || ""}
                      onChange={(e) =>
                        setCompareAtPrice(e.target.value ? Number(e.target.value) : undefined)
                      }
                      placeholder="Optional strikethrough price"
                      className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
                    Short Summary (Hero Tagline)
                  </label>
                  <input
                    type="text"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="e.g. Full-grain Italian Vachetta leather with lifetime durability."
                    className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
                    Full Description (Storytelling)
                  </label>
                  <textarea
                    rows={3}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Describe the tanning process, hardware durability, and ergonomic design..."
                    className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                  />
                </div>
              </div>

              {/* 2. Color Variants & Swatches */}
              <div className="space-y-4 pt-4 border-t border-[#E7E2DA]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#181817] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#A85A20]" />
                    <span>2. Color Variants & Inventory</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-xs font-semibold text-[#A85A20] hover:text-[#181817] flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Color Swatch</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {variants.map((variant, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-4 rounded-md border border-[#E7E2DA] bg-[#F8F6F1] space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-2">
                        <span className="text-xs font-semibold text-[#181817]">
                          Variant #{vIdx + 1}: {variant.colorName} ({variant.sku})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(vIdx)}
                          className="text-xs text-[#A33B3B] hover:underline"
                        >
                          Remove Variant
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#625E58] mb-1">
                            SKU Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={variant.sku}
                            onChange={(e) => handleVariantChange(vIdx, "sku", e.target.value)}
                            className="w-full text-xs p-2 rounded border border-[#E7E2DA] bg-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#625E58] mb-1">
                            Color Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={variant.colorName}
                            onChange={(e) =>
                              handleVariantChange(vIdx, "colorName", e.target.value)
                            }
                            className="w-full text-xs p-2 rounded border border-[#E7E2DA] bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#625E58] mb-1">
                            Swatch Color Hex
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={variant.colorHex}
                              onChange={(e) =>
                                handleVariantChange(vIdx, "colorHex", e.target.value)
                              }
                              className="w-8 h-8 rounded border border-[#E7E2DA] cursor-pointer"
                            />
                            <input
                              type="text"
                              value={variant.colorHex}
                              onChange={(e) =>
                                handleVariantChange(vIdx, "colorHex", e.target.value)
                              }
                              className="w-full text-xs p-2 rounded border border-[#E7E2DA] bg-white font-mono uppercase"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#625E58] mb-1">
                            Stock Units *
                          </label>
                          <input
                            type="number"
                            required
                            min={0}
                            value={variant.stock}
                            onChange={(e) =>
                              handleVariantChange(vIdx, "stock", Number(e.target.value))
                            }
                            className="w-full text-xs p-2 rounded border border-[#E7E2DA] bg-white font-bold"
                          />
                        </div>
                      </div>

                      {/* Image URLs for this variant */}
                      <div className="space-y-2 pt-2 border-t border-[#E7E2DA]">
                        <div className="flex items-center justify-between text-[11px] text-[#625E58]">
                          <span className="font-semibold">Editorial Photo URLs ({variant.images.length})</span>
                          <button
                            type="button"
                            onClick={() => handleAddVariantImage(vIdx)}
                            className="text-[#A85A20] font-semibold hover:underline"
                          >
                            + Add Image URL
                          </button>
                        </div>

                        {variant.images.map((imgUrl, imgIdx) => (
                          <div key={imgIdx} className="flex items-center gap-2">
                            <input
                              type="url"
                              value={imgUrl}
                              onChange={(e) =>
                                handleVariantImageChange(vIdx, imgIdx, e.target.value)
                              }
                              placeholder="https://..."
                              className="flex-1 text-xs p-2 rounded border border-[#E7E2DA] bg-white font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveVariantImage(vIdx, imgIdx)}
                              className="p-1.5 text-[#A33B3B] hover:bg-[#A33B3B]/10 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Badges & Visibility */}
              <div className="space-y-3 pt-4 border-t border-[#E7E2DA]">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#181817]">
                  3. Display Badges
                </h3>
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#181817] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded border-[#E7E2DA] text-[#181817] focus:ring-0"
                    />
                    <span>Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-[#181817] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBestSeller}
                      onChange={(e) => setIsBestSeller(e.target.checked)}
                      className="rounded border-[#E7E2DA] text-[#181817] focus:ring-0"
                    />
                    <span>Bestseller Ribbon</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-[#181817] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewArrival}
                      onChange={(e) => setIsNewArrival(e.target.checked)}
                      className="rounded border-[#E7E2DA] text-[#181817] focus:ring-0"
                    />
                    <span>New Arrival Badge</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-6 border-t border-[#E7E2DA] flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white border border-[#E7E2DA] text-[#625E58] hover:text-[#181817] rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-xs font-semibold uppercase tracking-wider shadow-subtle transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProduct ? "Update Silhouette" : "Save to Catalog"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
