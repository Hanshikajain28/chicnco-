import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { totalItemCount, subtotal } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.04)]">
      {/* Top Announcement Bar */}
      <div className="bg-secondary-fixed/50 py-1.5 px-margin text-center overflow-hidden">
        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-secondary-fixed">
          Free Worldwide Express Shipping on Orders Over $120 • Use code <span className="font-bold underline">CHIC15</span> for 15% off your first order • Complimentary Gift Packaging
        </p>
      </div>

      {/* Main Header */}
      <div className="h-20 max-w-[1440px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-lg">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-on-surface hover:text-secondary focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Brand Logo & Wordmark */}
        <Link to="/" className="flex items-center gap-space-md">
          <img
            alt="Chic N Co. Brand Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XxsK-IQFDu8j8W5jnMqIUjMpnb6mgGBvYX-eomQMvfpkVb5mkgCpTodUIfzORDdt2OMSSUmphL2XZymRFuq1F3p2jGeQbNkOdiw_WbbJP_SrX24UZYtq2DPfO-gieFKMWZ61awkKhRWI4uCTRpS6a8bLtgMzi7PV5YEKavrbTuBgYtXkVFKE6V0beWPmd0dwqYdzntui-cS2PwLkEO4qJDkRx74FwU_feMXqWgrGqIVNsIaSwyAMdPvpao"
          />
          <span className="font-title-editorial text-title-editorial tracking-tight text-on-surface uppercase font-bold">
            Chic N Co.
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-space-lg">
          <Link
            to="/"
            className={`font-label-md text-label-md uppercase tracking-wider transition-colors ${
              isActive('/') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`font-label-md text-label-md uppercase tracking-wider transition-colors ${
              isActive('/shop') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Shop
          </Link>
          <Link
            to="/shop?filter=new"
            className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors"
          >
            New Arrivals
          </Link>
          <div className="relative group flex items-center gap-space-xs cursor-pointer">
            <Link
              to="/shop"
              className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Categories
            </Link>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:rotate-180 transition-transform duration-200">
              expand_more
            </span>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 hidden group-hover:block pt-2">
              <div className="bg-surface-container-lowest shadow-xl rounded-xl p-4 w-48 border border-outline-variant/30 space-y-2">
                <Link to="/shop?category=Dresses" className="block font-body-sm text-body-sm hover:text-secondary py-1">Dresses</Link>
                <Link to="/shop?category=Tops & Blouses" className="block font-body-sm text-body-sm hover:text-secondary py-1">Tops & Blouses</Link>
                <Link to="/shop?category=Bottoms" className="block font-body-sm text-body-sm hover:text-secondary py-1">Bottoms</Link>
                <Link to="/shop?category=Co-ords" className="block font-body-sm text-body-sm hover:text-secondary py-1">Co-ords</Link>
                <Link to="/shop?category=Plus Size Atelier" className="block font-body-sm text-body-sm hover:text-secondary py-1">Plus Size Atelier</Link>
              </div>
            </div>
          </div>
          <Link
            to="/about"
            className={`font-label-md text-label-md uppercase tracking-wider transition-colors ${
              isActive('/about') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`font-label-md text-label-md uppercase tracking-wider transition-colors ${
              isActive('/contact') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-space-md">
          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search Atelier"
              className="hidden md:flex items-center gap-space-sm py-1.5 px-3 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-[0_1px_6px_rgba(0,0,0,0.03)] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="font-body-sm text-body-sm">Search...</span>
              <kbd className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">⌘K</kbd>
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 w-72 bg-surface-container-lowest p-3 rounded-xl shadow-xl border border-outline-variant/30 z-50">
                <input
                  type="text"
                  placeholder="Search silk, dresses, blazers..."
                  className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-body-sm focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Wishlist Link */}
          <Link
            to="/shop"
            aria-label="Wishlist"
            className="relative p-2 rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Cart Pill */}
          <Link
            to="/cart"
            aria-label="Shopping Cart"
            className="flex items-center gap-space-xs py-1.5 px-3 rounded-full bg-surface-container-lowest hover:bg-surface-container-high transition-all shadow-[0_1px_6px_rgba(0,0,0,0.03)]"
          >
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[20px] text-on-surface">shopping_bag</span>
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold">
                  {totalItemCount}
                </span>
              )}
            </div>
            <span className="font-label-md text-label-md text-on-surface font-semibold ml-1.5 hidden sm:inline">
              ${subtotal.toFixed(2)}
            </span>
          </Link>

          {/* User Profile Avatar */}
          <div className="flex items-center pl-space-xs">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.08)] border border-surface-container-highest"
              src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuCzQFxsQtOc2mCcTTVCu54CQxQzEkM482GSE3FhqsZrnI7hyXb7XSLQEqYILyCicTATJlRKQtM3A1or3FM3pu6nFoxmNun1nkj1lj2lRMRYgybgVubDDjVTv0fgFaHIIB4djj077_o_1m16s-an2Ywiy-DVwaQqS1P3IhteOOG1RsPOeVv6jKQAkVqWcmAR7HH1fksKiZ77tNFKUsd9Ad0EZOcZ2eR8nIMRYZ3ey2oCnaihs85cpzSRCA"}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-outline-variant/30 px-margin-mobile py-6 space-y-4 shadow-xl">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-label-md text-label-md uppercase tracking-wider py-2 text-on-surface"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-label-md text-label-md uppercase tracking-wider py-2 text-on-surface"
          >
            Shop All Collections
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-label-md text-label-md uppercase tracking-wider py-2 text-on-surface"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-label-md text-label-md uppercase tracking-wider py-2 text-on-surface"
          >
            Contact & Concierge
          </Link>
        </div>
      )}
    </header>
  );
}

