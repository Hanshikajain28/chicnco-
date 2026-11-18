import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getReviews, postReview } from '../api/client';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('desc');
  const [reviews, setReviews] = useState([]);
  const [addedPopup, setAddedPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load product
  useEffect(() => {
    setLoading(true);
    getProductById(id || 'the-florentine-pleated-satin-maxi-dress').then(data => {
      if (data.product) {
        setProduct(data.product);
        if (data.product.colors?.length > 0) {
          setSelectedColor(data.product.colors[0]);
        }
      }
      setLoading(false);
    }).catch(() => setLoading(false));

    getReviews(id || 'the-florentine-pleated-satin-maxi-dress').then(data => {
      if (data.reviews) setReviews(data.reviews);
    }).catch(console.error);
  }, [id]);

  if (loading || !product) {
    return (
      <div className="w-full min-h-screen pt-40 pb-20 text-center font-title-editorial text-title-editorial text-secondary">
        Summoning atelier piece...
      </div>
    );
  }

  const isFavorited = isInWishlist(product._id);
  const images = product.images?.length > 0 ? product.images : [
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhSOZNSMta0ySyW0--91lBFfvwtlwVnFp2-pqL8UaxV4yrrV5Iyh2G1upRz_i_H2HgfDlJsRV8D47czipMnXINMAUINPlx54JS8VKfGm5NPypIhuNCZYai-oD0Ok7sFc9iK7fPmB3giRiekXxRSf8luFLCKuumZQAsxGQ32tLDQyuWI8OFbIB8R1yyZNIIjDaFbfFsejyepXxOb-8J0omAtB0ySTE1APRL5VnbwJ7ldoWEK7Q4klq6pQ', alt: 'Main View' }
  ];

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedColor?.name || 'Soft Blush',
      selectedColor?.hex || '#f7d6dd',
      selectedSize,
      quantity
    );
    setAddedPopup(true);
    setTimeout(() => setAddedPopup(false), 3000);
  };

  return (
    <div className="w-full pt-28 bg-surface">
      {/* Top Breadcrumb & Live Demand Alert */}
      <section className="max-w-[1440px] mx-auto w-full px-margin-mobile md:px-margin py-4">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
            <span className="text-on-surface-variant/40">/</span>
            <Link className="hover:text-primary transition-colors" to="/shop">Shop</Link>
            <span className="text-on-surface-variant/40">/</span>
            <Link className="hover:text-primary transition-colors" to={`/shop?category=${product.category}`}>{product.category}</Link>
            <span className="text-on-surface-variant/40">/</span>
            <span className="text-on-surface font-semibold truncate max-w-[240px] md:max-w-none">{product.name}</span>
          </nav>
          <div className="hidden sm:flex items-center gap-space-sm font-label-sm text-label-sm text-secondary tracking-widest uppercase bg-secondary-fixed/40 px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span>High Demand: 18 atelier shoppers viewing right now</span>
          </div>
        </div>
      </section>

      {/* Main Product Stage (Split Gallery / Sticky Purchase Column) */}
      <section className="max-w-[1440px] mx-auto w-full px-margin-mobile md:px-margin pb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-space-md items-start">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 w-full md:w-20 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden shrink-0 transition-all ${
                    activeImageIndex === idx ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.alt || 'Thumbnail'} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>

            {/* Main Viewer */}
            <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-low shadow-sm group">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm uppercase tracking-wider shadow-sm">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                  Sustainable Silk Blend
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider shadow-sm">
                  Atelier Favorite
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Save to Wishlist"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary shadow-sm transition-transform active:scale-90"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0", color: isFavorited ? '#b81059' : 'inherit' }}
                >
                  favorite
                </span>
              </button>

              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <img
                  className="w-full h-full object-cover object-top"
                  src={images[activeImageIndex]?.url || images[0].url}
                  alt={product.name}
                />
              </div>

              {/* Model Specs Strip */}
              <div className="p-3 bg-surface-container-low/95 flex items-center justify-between text-on-surface-variant font-body-sm text-[12px] border-t border-surface-container">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">accessibility_new</span>
                  <span>Model is 5'9" (175cm), bust 33", wearing Size S (UK 8 / US 4)</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> True Atelier Cut
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Details */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-space-md">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-bold">Chic N Co. Atelier Collection</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded">
                  SKU: {product.sku || 'CH-8201-BL'}
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight font-bold">
                {product.name}
              </h1>

              {/* Reviews Summary */}
              <div className="flex items-center gap-space-sm pt-1">
                <div className="flex items-center text-tertiary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <a className="font-label-md text-label-md text-on-surface underline hover:text-secondary transition-colors" href="#reviews">
                  5.0 (142 verified reviews)
                </a>
                <span className="text-on-surface-variant/40">•</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">94% report true to size</span>
              </div>
            </div>

            {/* Pricing Tier */}
            <div className="p-space-sm rounded-xl bg-surface-container-low space-y-1">
              <div className="flex items-baseline gap-space-sm">
                <span className="font-price-headline text-price-headline text-on-surface font-bold text-[28px]">
                  ${(product.salePrice || product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="font-body-md text-body-md text-on-surface-variant line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                {product.salePrice && (
                  <span className="font-label-sm text-label-sm uppercase tracking-wide bg-secondary-fixed text-on-secondary-fixed font-bold px-2 py-0.5 rounded-full">
                    Save {Math.round((1 - product.salePrice / product.price) * 100)}%
                  </span>
                )}
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Or 4 interest-free payments of <span className="font-semibold text-on-surface">${((product.salePrice || product.price) / 4).toFixed(2)}</span> with <span className="font-bold text-on-surface underline">Klarna</span>.
              </p>
            </div>

            {/* Color Selector */}
            <div className="space-y-space-xs pt-1">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
                  Color: <span className="text-secondary font-bold">{selectedColor?.name || 'Soft Blush'}</span>
                </label>
                <span className="font-body-sm text-[12px] text-on-surface-variant">{product.colors?.length || 4} Seasonal Shades</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors?.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    aria-label={`Select ${c.name}`}
                    className={`relative w-9 h-9 rounded-full p-0.5 ring-offset-2 ring-offset-surface focus:outline-none transition-transform active:scale-95 ${
                      selectedColor?.name === c.name ? 'ring-2 ring-primary scale-105' : 'hover:ring-1 hover:ring-outline'
                    }`}
                  >
                    <span className="block w-full h-full rounded-full shadow-inner" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-space-xs pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Size:</label>
                  <span className="font-label-md text-label-md font-bold text-secondary">{selectedSize}</span>
                  <span className="font-body-sm text-[12px] text-secondary font-medium ml-2">• Only 3 pieces left in Atelier</span>
                </div>
                <span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface underline">
                  <span className="material-symbols-outlined text-[16px]">straighten</span>
                  Size & Fit Guide
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', '1X', '2X', '3X'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2.5 rounded-lg text-center font-label-md text-label-md font-semibold transition-all ${
                      selectedSize === s ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Picker & Add to Bag */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Counter Pill */}
                <div className="flex items-center bg-surface-container-low rounded-full px-3 py-1.5 h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-secondary"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                  <span className="w-8 text-center font-label-md text-label-md font-bold text-on-surface">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-secondary"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 px-6 rounded-full bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-on-surface-variant hover:scale-[1.01] transition-all shadow-md active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Add to Bag — ${((product.salePrice || product.price) * quantity).toFixed(2)}</span>
                </button>
              </div>

              {addedPopup && (
                <div className="p-3 bg-secondary-fixed text-on-secondary-fixed rounded-xl text-center font-label-md uppercase tracking-wider flex items-center justify-center gap-2 animate-bounce">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Added to your curated atelier shopping bag!</span>
                </div>
              )}
            </div>

            {/* Atelier Value Props Assurance Bar */}
            <div className="grid grid-cols-3 gap-2 pt-3">
              <div className="p-3 rounded-lg bg-surface-container-low text-center space-y-1">
                <span className="material-symbols-outlined text-[20px] text-secondary">flight_takeoff</span>
                <p className="font-label-sm text-[11px] font-bold text-on-surface leading-tight">Carbon-Neutral</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant leading-none">Free over $120</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low text-center space-y-1">
                <span className="material-symbols-outlined text-[20px] text-secondary">restart_alt</span>
                <p className="font-label-sm text-[11px] font-bold text-on-surface leading-tight">30-Day Easy</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant leading-none">Complimentary return</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low text-center space-y-1">
                <span className="material-symbols-outlined text-[20px] text-secondary">redeem</span>
                <p className="font-label-sm text-[11px] font-bold text-on-surface leading-tight">Gift Ready</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant leading-none">Silk garment bag</p>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-2 pt-4">
              {/* Accordion 1: Narrative */}
              <div className="rounded-xl bg-surface-container-low overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'desc' ? '' : 'desc')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-label-md text-label-md uppercase tracking-wider text-on-surface hover:text-secondary font-bold"
                >
                  <span>Editorial Cut & Silhouette</span>
                  <span className={`material-symbols-outlined text-[20px] transition-transform ${activeAccordion === 'desc' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {activeAccordion === 'desc' && (
                  <div className="px-5 pb-5 pt-0 text-on-surface-variant font-body-md text-body-md space-y-3">
                    <p>{product.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-body-sm font-body-sm">
                      <li>Adjustable French halter neckline with gold-capped ties</li>
                      <li>Concealed side zipper with reinforced internal hook-and-eye</li>
                      <li>Fully lined in 100% breathable organic modal through mid-thigh</li>
                      <li>Ankle-grazing sweeping hemline with hand-rolled edge finishing</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Materials */}
              <div className="rounded-xl bg-surface-container-low overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'mat' ? '' : 'mat')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-label-md text-label-md uppercase tracking-wider text-on-surface hover:text-secondary font-bold"
                >
                  <span>Fabric Composition & Sustainability</span>
                  <span className={`material-symbols-outlined text-[20px] transition-transform ${activeAccordion === 'mat' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {activeAccordion === 'mat' && (
                  <div className="px-5 pb-5 pt-0 text-on-surface-variant font-body-sm text-body-sm space-y-3">
                    <p><strong>Composition:</strong> {product.fabricComposition || '70% Eco-Vero Viscose, 30% Mulberry Silk.'}</p>
                    <p><strong>Sustainability:</strong> {product.sustainability || 'OEKO-TEX Standard 100.'}</p>
                    <p><strong>Care:</strong> {product.careInstructions || 'Dry clean gently or delicate hand-wash.'}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Delivery */}
              <div className="rounded-xl bg-surface-container-low overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'del' ? '' : 'del')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-label-md text-label-md uppercase tracking-wider text-on-surface hover:text-secondary font-bold"
                >
                  <span>Express Delivery & Returns</span>
                  <span className={`material-symbols-outlined text-[20px] transition-transform ${activeAccordion === 'del' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {activeAccordion === 'del' && (
                  <div className="px-5 pb-5 pt-0 text-on-surface-variant font-body-sm text-body-sm space-y-2">
                    <p>• <strong>Express Worldwide:</strong> 2–3 business days via DHL Express ($15 or free over $120).</p>
                    <p>• <strong>Same-Day London & NYC:</strong> Order before 1:00 PM for evening atelier delivery.</p>
                    <p>• <strong>Returns:</strong> 30-day effortless return window. Prepaid label included.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-[1440px] mx-auto w-full px-margin-mobile md:px-margin py-space-xl border-t border-surface-container" id="reviews">
        <div className="space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Client Reflections</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Atelier Community Reviews</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {reviews.map(r => (
              <div key={r._id} className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col justify-between space-y-space-md shadow-sm">
                <div className="space-y-space-xs">
                  <div className="flex items-center text-tertiary">
                    {[...Array(r.rating || 5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <h3 className="font-title-editorial text-title-editorial text-on-surface font-semibold">"{r.title}"</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{r.content}</p>
                </div>
                <div className="pt-space-xs flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold flex items-center justify-center font-label-md text-label-md">
                    {r.authorInitials || 'CL'}
                  </div>
                  <div>
                    <span className="font-label-md text-label-md font-bold text-on-surface block">{r.authorName}</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">{r.fitSpecs} • {r.fitFeedback}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

