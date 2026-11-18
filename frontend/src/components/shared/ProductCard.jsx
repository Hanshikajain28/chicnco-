import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product._id);
  const primaryImg = product.images?.[0]?.url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhSOZNSMta0ySyW0--91lBFfvwtlwVnFp2-pqL8UaxV4yrrV5Iyh2G1upRz_i_H2HgfDlJsRV8D47czipMnXINMAUINPlx54JS8VKfGm5NPypIhuNCZYai-oD0Ok7sFc9iK7fPmB3giRiekXxRSf8luFLCKuumZQAsxGQ32tLDQyuWI8OFbIB8R1yyZNIIjDaFbfFsejyepXxOb-8J0omAtB0ySTE1APRL5VnbwJ7ldoWEK7Q4klq6pQ';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors?.[0]?.name || 'Standard';
    const defaultHex = product.colors?.[0]?.hex || '#1a1a1a';
    addToCart(product, defaultColor, defaultHex, 'S', 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Product Image Stage */}
      <Link to={`/product/${product._id || product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-surface-container block">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          src={primaryImg}
          alt={product.name}
          loading="lazy"
        />

        {/* Badge (Sale / Best Seller / Inclusive Sizing) */}
        {product.badge && (
          <span className={`absolute top-3 left-3 font-label-sm text-label-sm px-2.5 py-1 rounded-full uppercase tracking-wider font-bold shadow-sm ${
            product.badge.includes('OFF') || product.onSale
              ? 'bg-secondary text-on-secondary'
              : product.badge === 'Best Seller' || product.badge === 'Inclusive Sizing'
              ? 'bg-secondary-fixed text-on-secondary-fixed'
              : 'bg-surface-container-lowest/90 backdrop-blur-md text-on-surface'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Add to Wishlist"
          className="wishlist-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/85 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary transition-colors shadow-sm"
        >
          <span
            className="material-symbols-outlined text-[19px]"
            style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0", color: isFavorited ? '#b81059' : 'inherit' }}
          >
            favorite
          </span>
        </button>

        {/* Quick Add Pill Overlay on Hover */}
        <button
          onClick={handleQuickAdd}
          className="quick-add-btn absolute bottom-3 left-3 right-3 py-2.5 bg-primary/95 text-on-primary rounded-full font-label-md text-label-md uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 shadow-md hover:bg-secondary"
        >
          <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
          <span>Quick Add</span>
        </button>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Reviews Star summary */}
          <div className="flex items-center gap-1 text-tertiary mb-1">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="font-body-sm text-body-sm font-semibold text-on-surface">
              {product.rating || '4.9'}
            </span>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              ({product.reviewCount || 84} reviews)
            </span>
          </div>

          <Link to={`/product/${product._id || product.slug}`}>
            <h3 className="font-title-editorial text-title-editorial text-on-surface group-hover:text-secondary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {product.shortDescription && (
            <p className="font-body-sm text-[13px] text-on-surface-variant mt-0.5 line-clamp-1">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Colors & Pricing */}
        <div className="pt-2 flex items-center justify-between border-t border-surface-container/50">
          {/* Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors?.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full ring-1 ring-outline-variant inline-block shadow-sm"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            {product.salePrice ? (
              <>
                <span className="font-body-sm text-[12px] text-on-surface-variant line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="font-price-headline text-price-headline text-secondary font-bold">
                  ${product.salePrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-price-headline text-price-headline text-on-surface">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

