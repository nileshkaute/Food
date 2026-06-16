"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// Dummy Food Data with High-Quality Unsplash Images
interface FoodItem {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  price: number;
  image: string;
  category: "Dim Sum" | "Szechuan" | "Noodles" | "Soups" | "Dessert";
  tags: string[];
  ratings: number;
  availability: boolean;
  spiceLevel: 0 | 1 | 2 | 3;
}

const FOOD_ITEMS: FoodItem[] = [
  {
    id: "fd1",
    name: "Shanghai Xiao Long Bao",
    chineseName: "南翔小笼包",
    description: "Classic steamed soup dumplings filled with tender seasoned pork and a rich, hot broth. Hand-folded with 18 delicate pleats.",
    price: 68.0,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800",
    category: "Dim Sum",
    tags: ["Signature", "Steamed"],
    ratings: 4.9,
    availability: true,
    spiceLevel: 0,
  },
  {
    id: "fd2",
    name: "Mapo Tofu with Minced Beef",
    chineseName: "麻婆豆腐",
    description: "Silken tofu set in a spicy, fiery chili and broad bean paste sauce, topped with Szechuan peppercorns and green onions.",
    price: 52.0,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=800",
    category: "Szechuan",
    tags: ["Spicy Classic", "Gluten-Free Option"],
    ratings: 4.8,
    availability: true,
    spiceLevel: 3,
  },
  {
    id: "fd3",
    name: "Szechuan Dan Dan Noodles",
    chineseName: "四川担担面",
    description: "Springy wheat noodles served in a savory sesame-peanut paste, spiked with chili oil, roasted minced pork, and preserved vegetables.",
    price: 48.0,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
    category: "Noodles",
    tags: ["Best Seller", "Nutty"],
    ratings: 4.9,
    availability: true,
    spiceLevel: 2,
  },
  {
    id: "fd4",
    name: "Crispy Wonton Soup",
    chineseName: "清汤云吞",
    description: "Delicate shrimp and pork wontons in a clear, soothing chicken broth seasoned with sesame oil, white pepper, and fresh cilantro.",
    price: 42.0,
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=800",
    category: "Soups",
    tags: ["Light & Comforting"],
    ratings: 4.7,
    availability: true,
    spiceLevel: 0,
  },
  {
    id: "fd5",
    name: "Cantonese Shrimp Har Gow",
    chineseName: "水晶虾饺皇",
    description: "Translucent steamed dumplings stuffed with plump, sweet bamboo-shoot-accented shrimp, seasoned simply to let freshness shine.",
    price: 72.0,
    image: "https://images.unsplash.com/photo-1496116211227-72bd9d89a425?auto=format&fit=crop&q=80&w=800",
    category: "Dim Sum",
    tags: ["Premium Seafood", "Steamed"],
    ratings: 4.8,
    availability: true,
    spiceLevel: 0,
  },
  {
    id: "fd6",
    name: "Chongqing Spicy Dice Chicken",
    chineseName: "歌乐山辣子鸡",
    description: "Crispy fried bite-sized chicken wok-tossed with an abundance of dried Szechuan red chilies, peppercorns, garlic, and toasted sesame.",
    price: 78.0,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800",
    category: "Szechuan",
    tags: ["Chef Special", "Very Spicy"],
    ratings: 4.9,
    availability: true,
    spiceLevel: 3,
  },
  {
    id: "fd7",
    name: "Golden Yangzhou Fried Rice",
    chineseName: "扬州炒饭",
    description: "Fluffy jasmine rice wok-fired with barbecue pork, baby shrimp, sweet peas, eggs, and scallions in a light savory sauce.",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1603133872878-685f588c5207?auto=format&fit=crop&q=80&w=800",
    category: "Noodles",
    tags: ["Comfort Food"],
    ratings: 4.6,
    availability: true,
    spiceLevel: 0,
  },
  {
    id: "fd8",
    name: "Sweet Red Bean Pancakes",
    chineseName: "豆沙锅饼",
    description: "Crispy pan-fried sweet dough pastries filled with a smooth, sweet adzuki red bean paste, dusted with toasted white sesame seeds.",
    price: 36.0,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800",
    category: "Dessert",
    tags: ["Sweet", "Crispy"],
    ratings: 4.7,
    availability: false,
    spiceLevel: 0,
  }
];

interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const categories = ["All", "Dim Sum", "Szechuan", "Noodles", "Soups", "Dessert"];

  // Filter food items based on category selection and search query
  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.chineseName.includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart Handlers
  const handleAddToCart = (item: FoodItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.foodItem.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.foodItem.id === item.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prevCart, { foodItem: item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, amount: number) => {
    setCart((prevCart) =>
      prevCart
        .map((ci) => {
          if (ci.foodItem.id === itemId) {
            const nextQty = ci.quantity + amount;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.foodItem.id !== itemId));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, ci) => total + ci.foodItem.price * ci.quantity, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((count, ci) => count + ci.quantity, 0);
  }, [cart]);

  return (
    <div className="bg-chinese-white min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Decorative Traditional Border Top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-imperial-red via-imperial-hover to-imperial-red relative z-50" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-chinese-white/90 backdrop-blur-md border-b border-charcoal-dark/5 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-10 h-10 bg-imperial-red rounded-lg flex items-center justify-center text-chinese-white font-serif font-bold text-xl shadow-red-glow">
              御
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wide text-charcoal-dark block leading-none">御膳</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-charcoal-medium font-bold block mt-1">Imperial Feast</span>
            </div>
          </div>

          {/* Quick Nav / Brand Tags */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-charcoal-medium border-l border-charcoal-dark/10 pl-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-jade-green" /> 100% Fresh Ingredients
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-imperial-red" /> Signature Imperial Flavors
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-4">
            
            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-charcoal-dark/10 hover:border-imperial-red hover:bg-imperial-light group transition-all duration-300"
              aria-label="Open Shopping Cart"
            >
              {/* Shopping Bag Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-charcoal-dark group-hover:text-imperial-red transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-[20px] h-5 px-1.5 bg-imperial-red text-[10px] font-bold text-chinese-white rounded-full flex items-center justify-center shadow-red-glow animate-scaleIn">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Quick Order Now Button */}
            <button 
              onClick={() => {
                const element = document.getElementById("menu-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 bg-imperial-red text-chinese-white font-medium text-xs rounded-full hover:bg-imperial-hover transition-all duration-300 shadow-red-glow hover:-translate-y-0.5"
            >
              浏览菜单 Menu
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Backdrop Wrapper with Subtle Pattern */}
      <main className="flex-1 relative">
        
        {/* Subtle Geometric Background Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none chinese-grid-bg" />

        {/* Hero Section */}
        <section className="relative px-6 py-16 lg:py-24 max-w-7xl mx-auto z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Callout & Typography */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-imperial-light text-imperial-red rounded-full text-xs font-semibold w-fit select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-imperial-red animate-pulse" />
                东方味道 • 鲜热送达 Warm & Aromatic Chinese Gastronomy
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-serif leading-[1.15] text-charcoal-dark tracking-tight">
                味蕾穿越宫廷，<br />
                <span className="text-imperial-red relative">
                  尽享现代东方美学
                  <span className="absolute bottom-0 left-0 w-full h-[6px] bg-imperial-red/10 rounded-full" />
                </span>
              </h1>

              <p className="text-charcoal-medium text-sm sm:text-base max-w-xl leading-relaxed">
                Meticulously hand-wrapped dim sum, fiery Szechuan wok-tossed wonders, and soothing bowls of broth. Prepared by culinary masters and packaged premium to preserve aroma and warmth.
              </p>

              {/* Advanced Search Input */}
              <div className="relative max-w-md w-full pt-4">
                <div className="absolute inset-y-0 left-4 top-4 flex items-center pointer-events-none text-charcoal-light">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="搜索美食: 饺子 / 麻婆豆腐 / 面条..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-chinese-white border border-charcoal-dark/10 rounded-2xl text-charcoal-dark placeholder-charcoal-light text-sm focus:outline-none focus:ring-2 focus:ring-imperial-red focus:border-transparent shadow-sm hover:border-charcoal-dark/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-8 -translate-y-1/2 text-charcoal-light hover:text-imperial-red text-xs font-semibold transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

            </div>

            {/* Premium Food Showcase Collage */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Decorative Circle Elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-imperial-light to-transparent rounded-full opacity-35 filter blur-3xl pointer-events-none" />
              
              <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-charcoal-dark/10 shadow-ink bg-chinese-white group">
                <Image
                  src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800"
                  alt="Delicious Chinese Dim Sum Dumplings"
                  fill
                  sizes="(max-w-768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Floating Showcase Badges */}
                <div className="absolute top-4 left-4 bg-chinese-white/90 backdrop-blur-md border border-charcoal-dark/5 rounded-2xl p-3 flex items-center gap-2.5 shadow-sm animate-[bounce_4s_infinite_2s]">
                  <span className="w-8 h-8 rounded-full bg-imperial-light flex items-center justify-center text-imperial-red text-lg font-serif">包</span>
                  <div>
                    <h4 className="text-[11px] font-bold text-charcoal-dark leading-none">Best Xiao Long Bao</h4>
                    <span className="text-[9px] text-charcoal-medium">Fresh Steamed Daily</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-chinese-white/95 backdrop-blur-md border border-charcoal-dark/5 rounded-2xl p-3 flex items-center gap-2.5 shadow-sm">
                  <span className="w-8 h-8 rounded-full bg-jade-light flex items-center justify-center text-jade-green text-sm font-bold">100%</span>
                  <div>
                    <h4 className="text-[11px] font-bold text-charcoal-dark leading-none">Fresh and Hot</h4>
                    <span className="text-[9px] text-charcoal-medium">Delivered in 30 mins</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Menu Section */}
        <section id="menu-section" className="py-16 border-t border-charcoal-dark/5 px-6 max-w-7xl mx-auto z-10 relative">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-charcoal-dark tracking-tight">
                精选御膳单 <span className="text-imperial-red font-sans text-xl block md:inline md:ml-2 font-normal">Explore Signature Flavors</span>
              </h2>
              <p className="text-charcoal-medium text-xs sm:text-sm mt-2">
                Order fresh items made on demand. Use the filters to explore culinary styles.
              </p>
            </div>

            {/* Category Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 bg-chinese-offwhite/50 p-1.5 rounded-2xl border border-charcoal-dark/5 w-fit">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
                      isActive
                        ? cat === "Szechuan"
                          ? "bg-imperial-red text-chinese-white shadow-red-glow"
                          : cat === "Dessert"
                          ? "bg-jade-green text-chinese-white shadow-jade-glow"
                          : "bg-charcoal-dark text-chinese-white shadow-ink"
                        : "text-charcoal-medium hover:text-charcoal-dark hover:bg-charcoal-dark/5"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Layout of Items */}
          {filteredItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => {
                const isItemAvailable = item.availability;
                
                return (
                  <div
                    key={item.id}
                    className={`group relative bg-chinese-white border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isItemAvailable
                        ? "border-charcoal-dark/5 hover:border-charcoal-dark/15 hover:shadow-ink hover:-translate-y-1"
                        : "border-charcoal-dark/5 opacity-75"
                    }`}
                  >
                    
                    {/* Item Image with hover zoom */}
                    <div className="aspect-[4/3] w-full relative bg-charcoal-dark/5 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-w-768px) 100vw, 280px"
                        className={`object-cover transition-transform duration-700 ${
                          isItemAvailable ? "group-hover:scale-105" : ""
                        }`}
                      />
                      
                      {/* Availability Overlay */}
                      {!isItemAvailable && (
                        <div className="absolute inset-0 bg-charcoal-dark/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                          <span className="px-4 py-2 border border-chinese-white/20 bg-charcoal-dark/70 rounded-full text-xs font-bold text-chinese-white tracking-wider">
                            售罄 Sold Out
                          </span>
                        </div>
                      )}

                      {/* Tag Badges */}
                      {isItemAvailable && item.tags.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 text-[9px] font-bold tracking-wide rounded-md uppercase ${
                                tag.toLowerCase().includes("spicy")
                                  ? "bg-imperial-light text-imperial-red border border-imperial-red/10"
                                  : tag.toLowerCase().includes("vegan") || tag.toLowerCase().includes("fresh")
                                  ? "bg-jade-light text-jade-green border border-jade-green/10"
                                  : "bg-chinese-white text-charcoal-dark border border-charcoal-dark/5"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Spice Level Indicator Overlay */}
                      {isItemAvailable && item.spiceLevel > 0 && (
                        <div className="absolute bottom-3 left-3 bg-chinese-white/95 backdrop-blur-sm border border-charcoal-dark/5 rounded-full px-2 py-1 flex items-center gap-0.5 shadow-sm z-10 select-none">
                          <span className="text-[8px] font-bold text-charcoal-medium mr-0.5">Spicy:</span>
                          {Array.from({ length: item.spiceLevel }).map((_, i) => (
                            <span key={i} className="text-imperial-red text-[10px]">🌶️</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Details and Actions */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-light">
                            {item.category}
                          </span>
                          <span className="text-xs font-semibold text-charcoal-medium flex items-center gap-0.5">
                            ★ {item.ratings}
                          </span>
                        </div>
                        
                        <h3 className="font-serif text-lg font-bold text-charcoal-dark leading-tight group-hover:text-imperial-red transition-colors">
                          {item.name}
                        </h3>
                        <p className="font-serif text-xs text-imperial-red/70 font-semibold italic">
                          {item.chineseName}
                        </p>
                        <p className="text-charcoal-medium text-[11px] leading-relaxed line-clamp-2 pt-1.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="font-serif text-base font-bold text-charcoal-dark">
                          ¥{item.price.toFixed(2)}
                        </span>

                        {/* Add to Cart Floating plus button */}
                        {isItemAvailable && (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-9 h-9 rounded-full bg-imperial-red text-chinese-white hover:bg-imperial-hover flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-red-glow hover:scale-105 active:scale-95"
                            aria-label={`Add ${item.name} to Cart`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-chinese-offwhite/30 border border-dashed border-charcoal-dark/10 rounded-3xl max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12 text-charcoal-light mx-auto mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
              <h3 className="font-serif text-lg font-semibold text-charcoal-dark">未找到匹配菜品</h3>
              <p className="text-charcoal-medium text-xs mt-1 px-6">
                We couldn't find any dishes matching "{searchQuery}". Try searching for other tags or categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-xs font-bold text-imperial-red hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Cart Slide-out Sidebar Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          
          {/* Black backdrop click handler */}
          <div
            className="absolute inset-0 bg-charcoal-dark/45 backdrop-blur-[2px] transition-opacity animate-fadeIn"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-chinese-white shadow-2xl flex flex-col border-l-4 border-imperial-red animate-slideLeft">
              
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-charcoal-dark/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-bold text-charcoal-dark">我的御膳单</span>
                  <span className="text-xs bg-imperial-light text-imperial-red px-2 py-0.5 rounded-full font-bold">
                    {totalCartCount} Items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-charcoal-light hover:text-imperial-red hover:bg-charcoal-dark/5 transition-colors"
                  aria-label="Close Shopping Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.foodItem.id}
                      className="flex items-center gap-4 py-3 border-b border-charcoal-dark/5 group animate-fadeIn"
                    >
                      {/* Thumbnail image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-charcoal-dark/5 flex-shrink-0">
                        <Image
                          src={item.foodItem.image}
                          alt={item.foodItem.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      {/* Detail metadata */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-charcoal-dark truncate">
                          {item.foodItem.name}
                        </h4>
                        <p className="text-[10px] text-imperial-red/80 font-serif font-semibold italic">
                          {item.foodItem.chineseName}
                        </p>
                        <span className="text-xs text-charcoal-medium block mt-0.5">
                          ¥{item.foodItem.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Increment / Decrement Quantity Action */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border border-charcoal-dark/10 rounded-full bg-chinese-offwhite/50 p-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.foodItem.id, -1)}
                            className="w-5 h-5 rounded-full hover:bg-charcoal-dark/5 text-charcoal-medium flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-charcoal-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.foodItem.id, 1)}
                            className="w-5 h-5 rounded-full hover:bg-charcoal-dark/5 text-charcoal-medium flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.foodItem.id)}
                          className="text-[10px] font-semibold text-charcoal-light hover:text-imperial-red"
                        >
                          Remove
                        </button>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-charcoal-light space-y-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12 mx-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <h4 className="font-serif font-semibold text-charcoal-dark">购物车还是空的</h4>
                    <p className="text-xs max-w-[200px] mx-auto leading-relaxed">
                      Your order list is empty. Tap the (+) button on any food card to add dishes!
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer Footer Billing summary */}
              {cart.length > 0 && (
                <div className="px-6 py-5 border-t border-charcoal-dark/5 bg-chinese-offwhite/50 space-y-4">
                  <div className="space-y-1.5 text-xs text-charcoal-medium">
                    <div className="flex justify-between">
                      <span>菜品小计 Subtotal</span>
                      <span className="font-serif text-charcoal-dark">¥{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>配送费 Delivery Fee</span>
                      <span className="font-serif text-jade-green font-semibold">FREE (Promo)</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-charcoal-dark/5 text-sm text-charcoal-dark font-bold">
                      <span>总计 Total Price</span>
                      <span className="font-serif text-imperial-red text-base">¥{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert("Thank you for ordering from Imperial Feast! Simulating checkout success.");
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3.5 bg-imperial-red hover:bg-imperial-hover text-chinese-white rounded-full font-bold text-xs shadow-red-glow hover:shadow-lg transition-all duration-300 tracking-wider flex items-center justify-center gap-2"
                  >
                    确认结算 Secure Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* Footer */}
      <footer className="bg-charcoal-dark text-chinese-offwhite/70 py-12 px-6 border-t-4 border-imperial-red mt-20 z-10 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-imperial-red rounded flex items-center justify-center text-chinese-white font-serif font-bold text-lg">
                御
              </div>
              <span className="font-serif text-xl font-bold text-chinese-white tracking-wide">御膳 Imperial Feast</span>
            </div>
            <p className="text-xs leading-relaxed">
              Experience modern dining aesthetics with warm, authentic palace dishes prepared daily.
            </p>
          </div>

          <div>
            <h4 className="text-chinese-white font-serif text-sm font-semibold mb-4">关于我们 About</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-imperial-red transition-colors">Heritage Brand</a></li>
              <li><a href="#" className="hover:text-imperial-red transition-colors">Master Chefs</a></li>
              <li><a href="#" className="hover:text-imperial-red transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-chinese-white font-serif text-sm font-semibold mb-4">客户服务 Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-imperial-red transition-colors">Help & FAQ</a></li>
              <li><a href="#" className="hover:text-imperial-red transition-colors">Delivery Range</a></li>
              <li><a href="#" className="hover:text-imperial-red transition-colors">Corporate Catering</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-chinese-white font-serif text-sm font-semibold mb-4">联系方式 Address</h4>
            <p className="text-xs">北京市东城区东直门内大街美食城</p>
            <p className="text-xs mt-1">contact@imperialfeast.com</p>
            <p className="text-xs mt-1">400-820-8820</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-chinese-offwhite/10 flex flex-col sm:flex-row items-center justify-between text-[11px]">
          <p>© {new Date().getFullYear()} Imperial Feast (御膳). All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-imperial-red">Privacy Policy</a>
            <a href="#" className="hover:text-imperial-red">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
