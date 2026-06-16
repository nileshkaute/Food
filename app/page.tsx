import Image from "next/image";

export default function Home() {
  return (
    <div className="chinese-grid-bg min-h-screen flex flex-col font-sans selection:bg-imperial-light selection:text-imperial-red">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-chinese-white/85 backdrop-blur-md border-b border-charcoal-dark/5 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-imperial-red rounded-lg flex items-center justify-center text-chinese-white font-serif font-bold text-xl shadow-red-glow">
              御
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wide text-charcoal-dark block leading-none">御膳</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-charcoal-medium font-medium">Imperial Feast</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal-medium">
            <a href="#menu" className="hover:text-imperial-red transition-colors duration-200">精选菜单 Menu</a>
            <a href="#about" className="hover:text-imperial-red transition-colors duration-200">品牌故事 Story</a>
            <a href="#reviews" className="hover:text-imperial-red transition-colors duration-200">飨客评价 Reviews</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex text-xs font-semibold px-4 py-2 border border-charcoal-dark/10 rounded-full text-charcoal-medium hover:bg-charcoal-dark/5 transition-all">
              登入 Sign In
            </button>
            <button className="px-5 py-2.5 bg-imperial-red text-chinese-white font-medium text-xs rounded-full hover:bg-imperial-hover transition-all duration-300 shadow-red-glow hover:-translate-y-0.5">
              立即点餐 Order Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-imperial-light text-imperial-red rounded-full text-xs font-semibold w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-imperial-red animate-pulse" />
              传承千年御膳文化 Authentic Palace Recipes
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold font-serif leading-[1.15] text-charcoal-dark brush-stroke pb-2">
              品味宫廷盛宴，<br />
              <span className="text-imperial-red">舌尖上的东方美学</span>
            </h1>

            <p className="text-charcoal-medium text-base lg:text-lg max-w-xl leading-relaxed">
              Every dish is a work of art. Experience the richness of traditional Chinese cuisine meticulously prepared by our master chefs, delivered with modern speed and care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center h-12 px-8 bg-charcoal-dark text-chinese-white rounded-full font-medium hover:bg-charcoal-medium transition-all duration-200 shadow-ink"
              >
                浏览菜单 View Menu
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center h-12 px-8 border border-charcoal-dark/20 text-charcoal-dark rounded-full font-medium hover:bg-chinese-white hover:border-charcoal-dark/50 transition-all duration-200"
              >
                探索故事 Our Heritage
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-charcoal-dark/10">
              <div>
                <p className="font-serif text-3xl font-bold text-imperial-red">30 Min</p>
                <p className="text-xs text-charcoal-medium">Speedy Hot Delivery</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-jade-green">100%</p>
                <p className="text-xs text-charcoal-medium">Fresh Ingredients</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-ming-blue">4.9 ★</p>
                <p className="text-xs text-charcoal-medium">5,000+ Reviews</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square bg-gradient-to-tr from-imperial-light to-chinese-white rounded-full border-8 border-chinese-white shadow-ink flex items-center justify-center overflow-hidden p-8 relative">
              {/* Outer decorative ring */}
              <div className="absolute inset-4 border border-dashed border-imperial-red/25 rounded-full animate-[spin_120s_linear_infinite]" />
              
              <div className="text-center z-10 flex flex-col items-center">
                <span className="font-serif text-6xl text-imperial-red block mb-2 font-bold animate-[pulse_3s_ease-in-out_infinite]">香</span>
                <span className="font-serif text-2xl text-charcoal-dark font-medium tracking-widest">Aroma & Taste</span>
                <p className="text-[10px] text-charcoal-medium max-w-[180px] mt-2">
                  Curated signature banquets, delivered hot to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase Section */}
      <section id="menu" className="py-20 bg-chinese-white border-y border-charcoal-dark/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-serif text-charcoal-dark">
                主厨推荐 <span className="text-imperial-red">Chef's Signature Specials</span>
              </h2>
              <p className="text-charcoal-medium text-sm mt-2">
                Handcrafted masterpieces representing the four great culinary traditions of China.
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-6 md:mt-0 bg-chinese-offwhite p-1 rounded-full border border-charcoal-dark/5">
              <button className="px-4 py-1.5 bg-imperial-red text-chinese-white text-xs font-medium rounded-full shadow-red-glow">
                全部 All
              </button>
              <button className="px-4 py-1.5 text-charcoal-medium text-xs font-medium rounded-full hover:text-imperial-red transition-colors">
                川菜 Sichuan
              </button>
              <button className="px-4 py-1.5 text-charcoal-medium text-xs font-medium rounded-full hover:text-imperial-red transition-colors">
                粤菜 Cantonese
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Menu Item 1 */}
            <div className="group bg-chinese-offwhite rounded-2xl border border-charcoal-dark/5 overflow-hidden transition-all duration-300 hover:shadow-ink hover:-translate-y-1">
              <div className="h-56 bg-gradient-to-br from-imperial-light/40 to-charcoal-dark/5 p-6 flex flex-col justify-between relative">
                <div className="flex justify-between items-start z-10">
                  <span className="px-2.5 py-1 bg-jade-light text-jade-green text-[10px] font-bold tracking-wider rounded-full uppercase">
                    ● Available
                  </span>
                  <span className="w-8 h-8 rounded-full bg-chinese-white flex items-center justify-center text-charcoal-medium text-xs font-bold shadow-sm group-hover:text-imperial-red transition-colors">
                    ♥
                  </span>
                </div>
                
                <div className="z-10">
                  <span className="text-[10px] uppercase tracking-wider text-imperial-red font-bold block mb-1">
                    Sichuan Classic
                  </span>
                  <h3 className="text-xl font-bold font-serif text-charcoal-dark">
                    宫保鸡丁 Kung Pao Chicken
                  </h3>
                </div>
                
                {/* Decorative watermarked background symbol */}
                <div className="absolute right-4 bottom-2 text-8xl font-serif text-charcoal-dark/[0.03] select-none font-bold">
                  川
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-charcoal-medium text-xs leading-relaxed">
                  Tender diced chicken breast stir-fried with golden peanuts, scallions, and crisp red chili peppers in a perfectly balanced sweet, savory, and spicy glaze.
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-serif text-lg font-bold text-imperial-red">
                    ¥ 58.00
                  </span>
                  <button className="px-4 py-2 bg-charcoal-dark text-chinese-white hover:bg-imperial-red text-xs font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-red-glow">
                    加入购物车 Add
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Item 2 */}
            <div className="group bg-chinese-offwhite rounded-2xl border border-charcoal-dark/5 overflow-hidden transition-all duration-300 hover:shadow-ink hover:-translate-y-1">
              <div className="h-56 bg-gradient-to-br from-jade-light/20 to-charcoal-dark/5 p-6 flex flex-col justify-between relative">
                <div className="flex justify-between items-start z-10">
                  <span className="px-2.5 py-1 bg-jade-light text-jade-green text-[10px] font-bold tracking-wider rounded-full uppercase">
                    ● Vegetarian
                  </span>
                  <span className="w-8 h-8 rounded-full bg-chinese-white flex items-center justify-center text-charcoal-medium text-xs font-bold shadow-sm group-hover:text-imperial-red transition-colors">
                    ♥
                  </span>
                </div>
                
                <div className="z-10">
                  <span className="text-[10px] uppercase tracking-wider text-jade-green font-bold block mb-1">
                    Authentic Buddhist Recipe
                  </span>
                  <h3 className="text-xl font-bold font-serif text-charcoal-dark">
                    罗汉斋 Buddha's Delight
                  </h3>
                </div>
                
                <div className="absolute right-4 bottom-2 text-8xl font-serif text-charcoal-dark/[0.03] select-none font-bold">
                  斋
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-charcoal-medium text-xs leading-relaxed">
                  A traditional, aromatic vegetarian feast consisting of wood ear mushrooms, fresh bamboo shoots, lotus root, ginkgo nuts, and bean curd skin in a light soy essence.
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-serif text-lg font-bold text-imperial-red">
                    ¥ 48.00
                  </span>
                  <button className="px-4 py-2 bg-charcoal-dark text-chinese-white hover:bg-imperial-red text-xs font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-red-glow">
                    加入购物车 Add
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Item 3 */}
            <div className="group bg-chinese-offwhite rounded-2xl border border-charcoal-dark/5 overflow-hidden transition-all duration-300 hover:shadow-ink hover:-translate-y-1">
              <div className="h-56 bg-gradient-to-br from-ming-light/40 to-charcoal-dark/5 p-6 flex flex-col justify-between relative">
                <div className="flex justify-between items-start z-10">
                  <span className="px-2.5 py-1 bg-jade-light text-jade-green text-[10px] font-bold tracking-wider rounded-full uppercase">
                    ● Signature
                  </span>
                  <span className="w-8 h-8 rounded-full bg-chinese-white flex items-center justify-center text-charcoal-medium text-xs font-bold shadow-sm group-hover:text-imperial-red transition-colors">
                    ♥
                  </span>
                </div>
                
                <div className="z-10">
                  <span className="text-[10px] uppercase tracking-wider text-ming-blue font-bold block mb-1">
                    Cantonese Roasted Roast
                  </span>
                  <h3 className="text-xl font-bold font-serif text-charcoal-dark">
                    蜜汁叉烧 Honey Glazed Char Siu
                  </h3>
                </div>
                
                <div className="absolute right-4 bottom-2 text-8xl font-serif text-charcoal-dark/[0.03] select-none font-bold">
                  粤
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-charcoal-medium text-xs leading-relaxed">
                  Premium pork collar marinated in our secret Chinese five-spice honey marinade, roasted to sticky caramelized perfection with a melt-in-your-mouth tenderness.
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-serif text-lg font-bold text-imperial-red">
                    ¥ 68.00
                  </span>
                  <button className="px-4 py-2 bg-charcoal-dark text-chinese-white hover:bg-imperial-red text-xs font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-red-glow">
                    加入购物车 Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-dark text-chinese-offwhite/70 py-12 px-6 mt-auto border-t-4 border-imperial-red">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-imperial-red rounded flex items-center justify-center text-chinese-white font-serif font-bold text-lg">
                御
              </div>
              <span className="font-serif text-xl font-bold text-chinese-white tracking-wide">御膳 Imperial Feast</span>
            </div>
            <p className="text-xs leading-relaxed">
              Serving the art of Chinese gastronomy, crafted for modern lifestyle with prompt delivery.
            </p>
          </div>

          <div>
            <h4 className="text-chinese-white font-serif text-sm font-semibold mb-4">关于我们 About</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-imperial-red transition-colors">Our Story</a></li>
              <li><a href="#culinary" className="hover:text-imperial-red transition-colors">Culinary Team</a></li>
              <li><a href="#careers" className="hover:text-imperial-red transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-chinese-white font-serif text-sm font-semibold mb-4">客户服务 Service</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#help" className="hover:text-imperial-red transition-colors">FAQ & Support</a></li>
              <li><a href="#delivery" className="hover:text-imperial-red transition-colors">Delivery Areas</a></li>
              <li><a href="#contact" className="hover:text-imperial-red transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-chinese-white font-serif text-sm font-semibold mb-4">联系方式 Contact</h4>
            <p className="text-xs">北京市东城区东直门内大街东仔路</p>
            <p className="text-xs mt-1">support@imperialfeast.com</p>
            <p className="text-xs mt-1">400-820-8820</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-chinese-offwhite/10 flex flex-col sm:flex-row items-center justify-between text-[11px]">
          <p>© {new Date().getFullYear()} Imperial Feast (御膳). All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-imperial-red">Privacy Policy</a>
            <a href="#terms" className="hover:text-imperial-red">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
