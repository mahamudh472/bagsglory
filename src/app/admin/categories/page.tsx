"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { BagCategory, CategoryItem } from "@/types";

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState<BagCategory>("backpacks");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [badge, setBadge] = useState("");

  const openAddModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("backpacks");
    setTagline("");
    setDescription("");
    setImage("");
    setBadge("");
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setTagline(cat.tagline);
    setDescription(cat.description);
    setImage(cat.image);
    setBadge(cat.badge || "");
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const catPayload: Omit<CategoryItem, "id"> = {
      name,
      slug: (slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") || "backpacks") as BagCategory,
      tagline,
      description,
      image,
      productCount: products.filter((p) => p.category === slug).length,
      badge: badge.trim() || undefined,
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, catPayload);
    } else {
      addCategory(catPayload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col font-sans bg-[#F8F5EF] text-[#0D0C0B] min-h-screen">
      <AdminHeader
        title="Collections & Categories"
        subtitle="Organize handbag collections, hero banners, and storefront landing pages"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-1">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white border border-[#E5DED4]">
          <span className="text-xs font-semibold text-[#746C63] uppercase tracking-[0.16em]">
            Total Collections: {categories.length}
          </span>
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Collection</span>
          </button>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.slug).length;

            return (
              <div
                key={cat.id}
                className="bg-white border border-[#E5DED4] overflow-hidden flex flex-col justify-between hover:border-[#C9A45C] transition-colors"
              >
                <div className="relative h-48 w-full bg-[#F8F5EF]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B]/90 via-[#0D0C0B]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-semibold text-[#C9A45C] uppercase tracking-[0.2em] font-mono">
                      Slug: /{cat.slug}
                    </span>
                    <h3 className="font-heading text-2xl text-white">
                      {cat.name}
                    </h3>
                  </div>
                  {cat.badge && (
                    <span className="absolute top-3 left-3 bg-[#0D0C0B] text-[#C9A45C] border border-[#C9A45C]/40 text-[9px] font-semibold tracking-wider uppercase px-2.5 py-0.5">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#0D0C0B] uppercase tracking-wider">{cat.tagline}</p>
                    <p className="text-xs text-[#746C63] font-light mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E5DED4]">
                    <span className="text-xs font-light text-[#746C63]">
                      {count} {count === 1 ? "creation" : "creations"} assigned
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-[#746C63] hover:text-[#0D0C0B] hover:bg-[#F8F5EF] transition-colors"
                        title="Edit Category"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete category "${cat.name}"?`)) {
                            deleteCategory(cat.id);
                          }
                        }}
                        className="p-1.5 text-[#746C63] hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D0C0B]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans">
            <div className="w-full max-w-lg bg-white shadow-2xl border border-[#E5DED4] overflow-hidden max-h-[92vh] flex flex-col my-auto">
              <div className="p-4 sm:p-6 border-b border-[#E5DED4] flex items-center justify-between shrink-0 bg-[#F8F5EF]">
                <h3 className="font-heading font-normal text-xl text-[#0D0C0B]">
                  {editingCategory ? "Edit Collection" : "Add New Collection"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-[#746C63] hover:text-[#0D0C0B] hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                    Collection Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!editingCategory) {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") as BagCategory);
                      }
                    }}
                    placeholder="e.g. Leather Backpacks"
                    className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value as BagCategory)}
                      placeholder="e.g. backpacks"
                      className="w-full text-xs p-2.5 border border-[#E5DED4] font-mono text-[#0D0C0B] bg-[#F8F5EF] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                      Promo Badge (Optional)
                    </label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="e.g. Bestseller, Trending"
                      className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Handcrafted for elite elegance & enduring journeys"
                    className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div>
                  <ImageUpload
                    value={image}
                    onChange={(url) => setImage(url)}
                    folder="bagsglory/categories"
                    label="Collection Hero Cover Image"
                    aspectRatio="landscape"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0C0B] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details on materials, artisanal leather grading, and craftsmanship..."
                    className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white text-[#0D0C0B] focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div className="pt-4 border-t border-[#E5DED4] flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#746C63] hover:text-[#0D0C0B] transition-colors uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0D0C0B] hover:bg-[#C9A45C] hover:text-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingCategory ? "Save Changes" : "Create Collection"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
