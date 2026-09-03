"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { AdminHeader } from "@/components/admin/AdminHeader";
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
    setImage("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900");
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
    <div className="flex-1 flex flex-col font-ui bg-[#F8F6F1]">
      <AdminHeader
        title="Collections & Categories"
        subtitle="Organize bag collections, hero banners, and storefront landing pages"
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-1">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white rounded-lg border border-[#E7E2DA] shadow-subtle">
          <span className="text-xs font-semibold text-[#625E58] uppercase tracking-wider">
            Total Collections: {categories.length}
          </span>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-subtle"
          >
            <Plus className="w-4 h-4 text-[#B8AA98]" />
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
                className="bg-white rounded-lg border border-[#E7E2DA] shadow-subtle overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-44 w-full bg-[#EFEBE4]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181817]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-semibold text-[#A85A20] uppercase tracking-wider">
                      Slug: /{cat.slug}
                    </span>
                    <h3 className="font-editorial text-2xl text-white font-normal">
                      {cat.name}
                    </h3>
                  </div>
                  {cat.badge && (
                    <span className="absolute top-3 left-3 bg-[#181817] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#181817]">{cat.tagline}</p>
                    <p className="text-xs text-[#625E58] mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E7E2DA]">
                    <span className="text-xs font-semibold text-[#625E58]">
                      {count} silhouettes assigned
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-[#625E58] hover:text-[#181817] hover:bg-[#F8F6F1] rounded-md transition-colors"
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
                        className="p-1.5 text-[#625E58] hover:text-[#A33B3B] hover:bg-[#A33B3B]/10 rounded-md transition-colors"
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
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#181817]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl border border-[#E7E2DA] overflow-hidden max-h-[92vh] flex flex-col">
              <div className="p-4 sm:p-6 border-b border-[#E7E2DA] flex items-center justify-between shrink-0 bg-[#F8F6F1]">
                <h3 className="font-editorial text-2xl text-[#181817] font-normal">
                  {editingCategory ? "Edit Collection" : "Add New Collection"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-[#625E58] hover:text-[#181817] rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
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
                    className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value as BagCategory)}
                      placeholder="e.g. backpacks"
                      className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] font-mono text-[#181817] bg-[#F8F6F1] focus:outline-none focus:border-[#181817]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181817] mb-1">
                      Promo Badge (Optional)
                    </label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="e.g. Bestseller, Trending"
                      className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Engineered for daily commute & weekend journeys"
                    className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
                    Hero Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] font-mono focus:outline-none focus:border-[#181817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181817] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details on materials, durability, and warranty..."
                    className="w-full text-xs p-2.5 rounded-md border border-[#E7E2DA] focus:outline-none focus:border-[#181817]"
                  />
                </div>

                <div className="pt-4 border-t border-[#E7E2DA] flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#625E58] hover:text-[#181817] rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#181817] hover:bg-[#2C2B29] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle"
                  >
                    {editingCategory ? "Save Changes" : "Create Collection"}
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
