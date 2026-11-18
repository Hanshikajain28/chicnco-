import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/shared/ProductCard';
import { getProducts } from '../api/client';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Styles');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || '');
  const [selectedColor, setSelectedColor] = useState(searchParams.get('color') || '');
  const [priceMax, setPriceMax] = useState(350);
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(4);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'All Styles', count: 48 },
    { name: 'Dresses', count: 16 },
    { name: 'Tops & Blouses', count: 12 },
    { name: 'Bottoms', count: 8 },
    { name: 'Co-ords', count: 6 },
    { name: 'Plus Size Atelier', count: 6 }
  ];

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', '1X', '2X', '3X'];

  const colors = [
    { name: 'Champagne Beige', hex: '#EADCC9' },
    { name: 'Blush Rose', hex: '#F5CAD6' },
    { name: 'Classic Noir', hex: '#1A1A1A' },
    { name: 'Soft Cream', hex: '#FAF5EE' },
    { name: 'Dusty Sage', hex: '#A2B29F' },
    { name: 'Mauve Rose', hex: '#9E5A73' },
    { name: 'Warm Mocha', hex: '#6B4E3D' }
  ];

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (selectedCategory && selectedCategory !== 'All Styles') params.category = selectedCategory;
    if (selectedSize) params.size = selectedSize;
    if (selectedColor) params.color = selectedColor;
    if (priceMax < 350) params.maxPrice = priceMax;
    if (searchParams.get('search')) params.search = searchParams.get('search');

    if (sortBy === 'price_asc') params.sort = 'price_asc';
    else if (sortBy === 'price_desc') params.sort = 'price_desc';
    else if (sortBy === 'newest') params.sort = 'newest';
    else if (sortBy === 'rating') params.sort = 'rating';

    getProducts(params).then(data => {
      if (data.products) setProducts(data.products);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [selectedCategory, selectedSize, selectedColor, priceMax, sortBy, searchParams]);

  const resetFilters = () => {
    setSelectedCategory('All Styles');
    setSelectedSize('');
    setSelectedColor('');
    setPriceMax(350);
    setSearchParams({});
  };

  return (
    <div className="w-full pt-28 bg-surface">
      {/* Editorial Breadcrumb & Intro Header */}
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin w-full pb-8">
        <nav className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm tracking-wider uppercase mb-space-md">
          <a className="hover:text-primary transition-colors" href="/">Home</a>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-bold">Women’s Ready-to-Wear</span>
        </nav>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="max-w-3xl space-y-space-xs">
            <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-secondary font-bold inline-block">SS 2025 Capsule</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">The Women’s Collection</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              Timeless staples, statement co-ords, and effortless silhouettes designed to empower every body. Showing {products.length} styles curated with sustainable silk, organic linens, and precision tailoring.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-space-sm bg-surface-container-low px-4 py-2.5 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">Atelier Guarantee • Inclusive Sizing 00–26</span>
          </div>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="sticky top-20 z-30 bg-surface/90 backdrop-blur-md shadow-sm border-y border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-3.5 flex flex-wrap items-center justify-between gap-space-md">
          {/* Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategory !== 'All Styles' && (
              <span
                onClick={() => setSelectedCategory('All Styles')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold cursor-pointer"
              >
                {selectedCategory}
                <span className="material-symbols-outlined text-[14px]">close</span>
              </span>
            )}
            {selectedSize && (
              <span
                onClick={() => setSelectedSize('')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold cursor-pointer"
              >
                Size: {selectedSize}
                <span className="material-symbols-outlined text-[14px]">close</span>
              </span>
            )}
            {selectedColor && (
              <span
                onClick={() => setSelectedColor('')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold cursor-pointer"
              >
                Color: {selectedColor}
                <span className="material-symbols-outlined text-[14px]">close</span>
              </span>
            )}
            {(selectedCategory !== 'All Styles' || selectedSize || selectedColor) && (
              <button
                onClick={resetFilters}
                className="font-label-sm text-label-sm tracking-wide text-secondary underline hover:text-on-secondary-container transition-colors pl-1"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Grid Layout & Sort */}
          <div className="flex items-center gap-space-md ml-auto">
            {/* 3 vs 4 cols switcher */}
            <div className="hidden md:flex items-center bg-surface-container-low rounded-full p-1 shadow-inner">
              <button
                onClick={() => setGridCols(3)}
                className={`px-2.5 py-1 rounded-full transition-all ${gridCols === 3 ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold' : 'text-on-surface-variant'}`}
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`px-2.5 py-1 rounded-full transition-all ${gridCols === 4 ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold' : 'text-on-surface-variant'}`}
              >
                <span className="material-symbols-outlined text-[18px]">view_comfy</span>
              </button>
            </div>

            {/* Sort Select */}
            <div className="relative flex items-center bg-surface-container-lowest rounded-full px-4 py-2 shadow-sm border border-outline-variant/30">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mr-2">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-label-md text-label-md text-on-surface font-semibold focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                <option value="featured">Featured Atelier</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated (4.8+)</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant pointer-events-none absolute right-3">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dual-Column Content */}
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Left Sidebar: Refine Atelier */}
          <aside className="hidden lg:block lg:col-span-3 space-y-space-lg">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-space-lg sticky top-36">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <h3 className="font-title-editorial text-title-editorial uppercase text-on-surface tracking-wide font-bold">
                  Refine Atelier
                </h3>
                <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-widest">
                  {products.length} Pieces
                </span>
              </div>

              {/* Categories */}
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
                  <span>Categories</span>
                </div>
                <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant pt-1">
                  {categories.map(cat => (
                    <li
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === cat.name ? 'bg-surface-container font-bold text-secondary' : 'hover:bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {selectedCategory === cat.name && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                        {cat.name}
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">{cat.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inclusive Sizing Filter */}
              <div className="space-y-space-sm pt-2">
                <div className="flex items-center justify-between font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
                  <span>Inclusive Sizing</span>
                  <a href="/about" className="font-label-sm text-[11px] text-secondary underline normal-case tracking-normal">Size Guide</a>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 font-label-sm text-label-sm">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(selectedSize === s ? '' : s)}
                      className={`py-2 rounded-lg font-medium transition-colors ${
                        selectedSize === s ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-space-sm pt-2">
                <div className="flex items-center justify-between font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
                  <span>Palette</span>
                </div>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(selectedColor === c.name ? '' : c.name)}
                      className={`w-7 h-7 rounded-full shadow-sm transition-all ${
                        selectedColor === c.name ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-space-sm pt-2">
                <div className="flex items-center justify-between font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
                  <span>Price Range</span>
                  <span className="font-price-headline text-[13px] text-on-surface font-bold">$50 – ${priceMax}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-secondary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-9 space-y-space-xl">
            {loading ? (
              <div className="py-20 text-center font-title-editorial text-title-editorial text-secondary">
                Curating atelier collection...
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-surface-container-lowest rounded-xl p-8">
                <p className="font-headline-sm text-headline-sm text-on-surface">No pieces matched your selected filters.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-space-lg`}>
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

