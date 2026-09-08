"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon, Check } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  folder = "bagsglory/products",
  label = "Upload Image",
  aspectRatio = "portrait",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(value || "");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        onChange(data.url);
        setManualUrl(data.url);
      } else {
        setError(data.error || "Failed to upload image.");
      }
    } catch {
      setError("Network error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setShowUrlInput(false);
    }
  };

  const aspectClass =
    aspectRatio === "portrait"
      ? "h-40 sm:h-48"
      : aspectRatio === "landscape"
      ? "h-32 sm:h-36"
      : "h-36 sm:h-40";

  return (
    <div className="space-y-2 font-sans">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0D0C0B]">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[10px] text-[#746C63] hover:text-[#C9A45C] uppercase tracking-wider flex items-center gap-1 font-medium"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? "File Upload" : "Paste URL"}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="flex-1 text-xs p-2.5 border border-[#E5DED4] bg-white focus:outline-none focus:border-[#C9A45C]"
          />
          <button
            type="button"
            onClick={handleManualUrlSubmit}
            className="px-3 py-2 bg-[#0D0C0B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A45C] hover:text-[#0D0C0B] transition-colors"
          >
            Apply
          </button>
        </div>
      ) : value ? (
        <div className={`relative ${aspectClass} w-full bg-[#F8F5EF] border border-[#E5DED4] overflow-hidden group`}>
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0D0C0B]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-[#C9A45C] text-[#0D0C0B] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setManualUrl("");
              }}
              className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative ${aspectClass} w-full border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 cursor-pointer text-center ${
            dragActive
              ? "border-[#C9A45C] bg-[#C9A45C]/10"
              : "border-[#E5DED4] hover:border-[#C9A45C] bg-[#FFFFFF] hover:bg-[#F8F5EF]/50"
          }`}
        >
          {isUploading ? (
            <div className="space-y-2 text-center">
              <Loader2 className="w-6 h-6 text-[#C9A45C] animate-spin mx-auto" />
              <p className="text-xs uppercase tracking-wider text-[#746C63] font-medium">
                Uploading to Cloudinary...
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-9 h-9 bg-[#F8F5EF] text-[#C9A45C] border border-[#E5DED4] rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0D0C0B] uppercase tracking-wider">
                  Drag & Drop or <span className="text-[#C9A45C]">Browse</span>
                </p>
                <p className="text-[10px] text-[#746C63] font-light mt-0.5">
                  PNG, JPG, WebP up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
