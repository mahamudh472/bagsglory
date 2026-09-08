"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
  id?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  buttonClassName = "",
  menuClassName = "",
  disabled = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-3 text-xs font-semibold text-[#0D0C0B] bg-white border border-[#E5DED4] px-3.5 py-2.5 transition-all text-left focus:outline-none focus:border-[#C9A45C] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen ? "border-[#C9A45C] ring-1 ring-[#C9A45C]" : "hover:border-[#C9A45C]"
        } ${buttonClassName}`}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon}
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#746C63] transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-[#C9A45C]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={`absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto bg-white border border-[#E5DED4] shadow-xl py-1 focus:outline-none animate-page-enter ${menuClassName}`}
        >
          {options.length === 0 ? (
            <div className="px-4 py-2.5 text-xs text-[#746C63]">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={(e) => handleSelect(option.value, e)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#F8F5EF] text-[#0D0C0B] font-semibold"
                      : "text-[#171513] hover:bg-[#F8F5EF] hover:text-[#C9A45C]"
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    {option.icon}
                    <span>{option.label}</span>
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
