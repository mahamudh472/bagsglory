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
    <div className="flex-1 flex flex-col font-sans bg-[#F8F5EF] text-[#0D0C0B] min-h-screen">
      <AdminHeader
        title="Products & Inventory"
        subtitle="Manage handcrafted bags catalog, multi-color swatches, SKUs, and real-time stock counts"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#746C63] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, collection, SKU..."
                className="w-full text-xs pl-9 pr-4 py-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] placeholder-[#746C63] focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            {/* Category Filter Dropdown */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full sm:w-auto text-xs font-semibold text-[#0D0C0B] bg-white border border-[#E5DED4] px-3.5 py-2.5 focus:outline-none focus:border-[#C9A45C]"
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
            className="px-5 py-2.5 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Creation</span>
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-[#E5DED4] overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#F8F5EF] border-b border-[#E5DED4] text-[#746C63] uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-6 font-semibold">Product</th>
                  <th className="py-3.5 px-4 font-semibold">Collection</th>
                  <th className="py-3.5 px-4 font-semibold">Base Price</th>
                  <th className="py-3.5 px-4 font-semibold">Variants & Stock</th>
                  <th className="py-3.5 px-4 font-semibold">Badges</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DED4]">
                {filteredProducts.map((product) => {
                  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
                  const firstImg = product.variants[0]?.images[0] || "";

                  return (
                    <tr key={product.id} className="hover:bg-[#F8F5EF] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-14 bg-[#F8F5EF] relative overflow-hidden shrink-0 border border-[#E5DED4]">
                            {firstImg ? (
                              <Image
                                src={firstImg}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#746C63]">
                                <Package className="w-5 h-5 stroke-[1.5]" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-[#0D0C0B] line-clamp-1">
                              {product.title}
                            </div>
                            <div className="text-[11px] text-[#746C63] font-mono">
                              /product/{product.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-light text-[#746C63]">
                        {product.categoryName}
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#0D0C0B]">
                        {formatPrice(product.basePrice)}
                        {product.compareAtPrice && (
                          <span className="text-[11px] text-[#746C63] line-through ml-1.5 font-normal">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            {product.variants.map((v) => (
                              <span
                                key={v.sku}
                                className="w-3.5 h-3.5 rounded-full border border-[#E5DED4] inline-block"
                                style={{ backgroundColor: v.colorHex }}
                                title={`${v.colorName} (${v.stock} in stock)`}
                              />
                            ))}
                            <span className="text-[11px] text-[#746C63] font-light ml-1">
                              ({product.variants.length} {product.variants.length === 1 ? 'color' : 'colors'})
                            </span>
                          </div>
                          <div className="text-[11px] text-[#746C63]">
                            Stock:{" "}
                            <span
                              className={
                                totalStock <= 5 ? "text-rose-700 font-semibold" : "text-[#0D0C0B] font-semibold"
                              }
                            >
                              {totalStock} units
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {product.isBestSeller && (
                            <span className="bg-[#0D0C0B] text-[#C9A45C] font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5">
                              Bestseller
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="bg-[#F8F5EF] text-[#0D0C0B] border border-[#E5DED4] font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5">
                              Featured
                            </span>
                          )}
                          {product.isNewArrival && (
                            <span className="bg-[#F8F5EF] text-[#C9A45C] border border-[#E5DED4] font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-1.5 text-[#746C63] hover:text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.title)}
                            className="p-1.5 text-[#746C63] hover:text-rose-700 hover:bg-rose-50 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0D0C0B]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-white shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-[#E5DED4] my-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#E5DED4] flex items-center justify-between bg-[#F8F5EF] shrink-0">
              <div>
                <h2 className="font-heading font-normal text-xl sm:text-2xl text-[#0D0C0B]">
                  {editingProduct ? "Edit Product Details" : "Add New Handbag to Catalog"}
                </h2>
                <p className="text-xs text-[#746C63] font-light mt-0.5">
                  Configure product specifications, multi-color swatches, and inventory counts
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#746C63] hover:text-[#0D0C0B] hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Form) */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* 1. Basic Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0D0C0B] border-b border-[#E5DED4] pb-2 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C9A45C]" />
                  <span>1. General Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Signature Saffiano Leather Tote"
                      className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. signature-saffiano-leather-tote"
                      className="w-full text-xs font-mono p-2.5 border border-[#E5DED4] bg-[#F8F5EF] text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                      Category Collection *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => handleCategorySelect(e.target.value)}
                      className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                      Base Price (BDT ৳) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={basePrice}
                      onChange={(e) => setBasePrice(Number(e.target.value))}
                      className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
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
                      className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                    Short Summary (Hero Tagline)
                  </label>
                  <input
                    type="text"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="e.g. Handcrafted from full-grain calfskin leather with 24K gold-plated hardware."
                    className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                    Full Description (Product Story & Details)
                  </label>
                  <textarea
                    rows={3}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Describe the materials, compartments, zippers, and usage scenarios..."
                    className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              {/* 2. Color Variants & Swatches */}
              <div className="space-y-4 pt-4 border-t border-[#E5DED4]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0D0C0B] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C9A45C]" />
                    <span>2. Color Variants & Inventory</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-xs font-semibold text-[#746C63] hover:text-[#0D0C0B] flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Color Swatch</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {variants.map((variant, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-4 border border-[#E5DED4] bg-[#F8F5EF] space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#E5DED4] pb-2">
                        <span className="text-xs font-semibold text-[#0D0C0B] uppercase tracking-wider">
                          Variant #{vIdx + 1}: {variant.colorName} ({variant.sku})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(vIdx)}
                          className="text-xs font-semibold text-rose-700 hover:underline"
                        >
                          Remove Variant
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#746C63] mb-1">
                            SKU Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={variant.sku}
                            onChange={(e) => handleVariantChange(vIdx, "sku", e.target.value)}
                            className="w-full text-xs p-2 border border-[#E5DED4] bg-white font-mono text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#746C63] mb-1">
                            Color Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={variant.colorName}
                            onChange={(e) =>
                              handleVariantChange(vIdx, "colorName", e.target.value)
                            }
                            className="w-full text-xs p-2 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#746C63] mb-1">
                            Swatch Color Hex
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={variant.colorHex}
                              onChange={(e) =>
                                handleVariantChange(vIdx, "colorHex", e.target.value)
                              }
                              className="w-8 h-8 border border-[#E5DED4] cursor-pointer p-0.5 bg-white"
                            />
                            <input
                              type="text"
                              value={variant.colorHex}
                              onChange={(e) =>
                                handleVariantChange(vIdx, "colorHex", e.target.value)
                              }
                              className="w-full text-xs p-2 border border-[#E5DED4] bg-white font-mono uppercase text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#746C63] mb-1">
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
                            className="w-full text-xs p-2 border border-[#E5DED4] bg-white font-semibold text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                          />
                        </div>
                      </div>

                      {/* Image URLs for this variant */}
                      <div className="space-y-2 pt-2 border-t border-[#E5DED4]">
                        <div className="flex items-center justify-between text-[11px] text-[#746C63]">
                          <span className="font-semibold uppercase tracking-wider text-[10px]">Product Photos ({variant.images.length})</span>
                          <button
                            type="button"
                            onClick={() => handleAddVariantImage(vIdx)}
                            className="text-[#0D0C0B] font-semibold hover:text-[#C9A45C]"
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
                              className="flex-1 text-xs p-2 border border-[#E5DED4] bg-white font-mono text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveVariantImage(vIdx, imgIdx)}
                              className="p-1.5 text-rose-700 hover:bg-rose-50 transition-colors"
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
              <div className="space-y-3 pt-4 border-t border-[#E5DED4]">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0D0C0B]">
                  3. Display Badges
                </h3>
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#0D0C0B] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="border-[#E5DED4] accent-[#0D0C0B]"
                    />
                    <span>Featured in Signature Editions</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-[#0D0C0B] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBestSeller}
                      onChange={(e) => setIsBestSeller(e.target.checked)}
                      className="border-[#E5DED4] accent-[#0D0C0B]"
                    />
                    <span>Bestseller Emblem</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-[#0D0C0B] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewArrival}
                      onChange={(e) => setIsNewArrival(e.target.checked)}
                      className="border-[#E5DED4] accent-[#0D0C0B]"
                    />
                    <span>New Arrival Ribbon</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-6 border-t border-[#E5DED4] flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white border border-[#E5DED4] text-[#746C63] hover:text-[#0D0C0B] hover:bg-[#F8F5EF] text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProduct ? "Update Creation" : "Save to Catalog"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
