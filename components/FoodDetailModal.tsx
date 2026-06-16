"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import { FoodItem, SelectedOptions } from "@/types";

interface FoodDetailModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: FoodItem,
    quantity: number,
    options: SelectedOptions,
    calculatedTotal: number
  ) => void;
}

const SPICE_LEVELS: ("Mild" | "Medium" | "Szechuan Insane")[] = [
  "Mild",
  "Medium",
  "Szechuan Insane",
];

const ADD_ONS = [
  { id: "chashu", name: "Extra Savory Chashu Pork", price: 15.0 },
  { id: "egg", name: "Soft Boiled Soy Egg", price: 6.0 },
  { id: "greenonions", name: "Extra Fresh Green Onions", price: 2.0 },
  { id: "bamboo", name: "Braised Bamboo Shoots", price: 5.0 },
];

export default function FoodDetailModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
}: FoodDetailModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [spiceLevel, setSpiceLevel] = useState<"Mild" | "Medium" | "Szechuan Insane">("Mild");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Reset states when a new item is opened
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSpiceLevel("Mild");
      setSelectedAddOns([]);
    }
  }, [isOpen, item]);

  // Total calculation based on item price, selected add-ons, and quantity
  const totalItemPrice = useMemo(() => {
    if (!item) return 0;
    const addOnTotal = ADD_ONS.filter((add) => selectedAddOns.includes(add.id)).reduce(
      (sum, add) => sum + add.price,
      0
    );
    return (item.price + addOnTotal) * quantity;
  }, [item, selectedAddOns, quantity]);

  if (!isOpen || !item) return null;

  const handleToggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
  };

  const handleAddToCartSubmit = () => {
    onAddToCart(
      item,
      quantity,
      {
        spiceLevel,
        addOns: selectedAddOns.map(
          (id) => ADD_ONS.find((a) => a.id === id)?.name || id
        ),
      },
      totalItemPrice
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-dark/50 backdrop-blur-[3px] transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-4xl bg-chinese-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-charcoal-dark/5 animate-scaleIn z-10 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        
        {/* Left Column: Image with Chinese grid background overlay */}
        <div className="w-full md:w-1/2 relative min-h-[260px] md:min-h-[460px] bg-charcoal-dark/5 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-w-768px) 100vw, 450px"
            className="object-cover"
            priority
          />
          
          {/* Subtle Decorative Pattern Layer */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] select-none chinese-grid-bg" />

          {/* Close button for mobile inside the image frame */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 md:hidden w-8 h-8 rounded-full bg-chinese-white/90 backdrop-blur-md flex items-center justify-center text-charcoal-dark shadow-sm hover:text-imperial-red transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Right Column: Modifier Configuration Forms */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          
          {/* Close button for desktop */}
          <button
            onClick={onClose}
            className="hidden md:absolute md:top-6 md:right-6 w-9 h-9 rounded-full border border-charcoal-dark/10 hover:border-imperial-red hover:bg-imperial-light flex items-center justify-center text-charcoal-medium hover:text-imperial-red transition-all duration-300"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-6">
            
            {/* Header / Titles */}
            <div className="border-b border-charcoal-dark/5 pb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-light bg-charcoal-dark/5 px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <span className="text-xs font-semibold text-charcoal-medium flex items-center gap-0.5">
                  ★ {item.ratings} Ratings
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-dark leading-tight">
                {item.name}
              </h2>
              <p className="font-serif text-sm text-imperial-red font-semibold italic mt-1">
                {item.chineseName}
              </p>
              <p className="text-charcoal-medium text-xs leading-relaxed mt-3">
                {item.description}
              </p>
            </div>

            {/* Modifier 1: Spice Level */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-dark mb-3">
                选择辣度 Spice Level
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {SPICE_LEVELS.map((level) => {
                  const isActive = spiceLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSpiceLevel(level)}
                      className={`py-2 px-3 text-center rounded-xl text-xs font-semibold border transition-all duration-300 ${
                        isActive
                          ? level === "Szechuan Insane"
                            ? "bg-imperial-red text-chinese-white border-transparent shadow-red-glow font-bold"
                            : "bg-charcoal-dark text-chinese-white border-transparent shadow-ink font-bold"
                          : "bg-chinese-white text-charcoal-medium border-charcoal-dark/10 hover:border-charcoal-dark/30"
                      }`}
                    >
                      {level === "Szechuan Insane" ? "🌶️ Insane" : level}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modifier 2: Add-ons checkboxes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-dark mb-3">
                添加配料 Add-ons <span className="text-[10px] text-charcoal-light font-normal">(Optional)</span>
              </h4>
              <div className="space-y-2.5">
                {ADD_ONS.map((add) => {
                  const isChecked = selectedAddOns.includes(add.id);
                  return (
                    <label
                      key={add.id}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all duration-200 select-none ${
                        isChecked
                          ? "border-charcoal-dark bg-chinese-offwhite/50"
                          : "border-charcoal-dark/10 hover:border-charcoal-dark/20"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAddOn(add.id)}
                          className="accent-charcoal-dark w-4 h-4 rounded"
                        />
                        <span className="text-charcoal-dark">{add.name}</span>
                      </div>
                      <span className="text-charcoal-medium font-semibold">
                        +¥{add.price.toFixed(2)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quantity Selector and Checkout Actions Footer */}
          <div className="border-t border-charcoal-dark/5 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 bg-chinese-offwhite/80 border border-charcoal-dark/10 rounded-full px-4 py-2 w-full sm:w-fit justify-between sm:justify-start">
              <span className="text-xs text-charcoal-medium font-bold mr-1">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full hover:bg-charcoal-dark/5 text-charcoal-medium flex items-center justify-center font-bold text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-charcoal-dark select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-full hover:bg-charcoal-dark/5 text-charcoal-medium flex items-center justify-center font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Imperial Red Cart Submit Button */}
            <button
              onClick={handleAddToCartSubmit}
              className="w-full sm:flex-1 py-3.5 bg-imperial-red hover:bg-imperial-hover text-chinese-white rounded-full font-bold text-xs shadow-red-glow hover:shadow-lg transition-all duration-300 tracking-wider flex items-center justify-center gap-2"
            >
              加入购物车 Add to Cart • ¥{totalItemPrice.toFixed(2)}
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}
