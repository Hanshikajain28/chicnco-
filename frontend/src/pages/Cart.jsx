import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeItem,
    subtotal,
    discountAmount,
    isFreeShipping,
    shippingProgress,
    amountToFreeShipping,
    applyPromoCode,
    toggleGiftPackaging
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const res = applyPromoCode(promoInput);
    setPromoMessage(res);
  };

  const shippingCost = isFreeShipping ? 0 : 15;
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.08 * 100) / 100;
  const orderTotal = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  return (
    <div className="w-full pt-28 bg-surface">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin w-full pb-16">
        {/* Stage Indicator */}
        <div className="pt-2 pb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Curated Atelier Selection</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1 tracking-tight font-bold">Shopping Bag</h1>
          </div>
          <nav aria-label="Checkout Progress" className="flex items-center gap-space-sm bg-surface-container-low px-5 py-2.5 rounded-full shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-[11px] font-bold">1</span>
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Shopping Bag</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>
            <div className="flex items-center gap-2 opacity-60">
              <span className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-sm text-[11px]">2</span>
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Checkout</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline-variant hidden sm:inline-block">chevron_right</span>
            <div className="hidden sm:flex items-center gap-2 opacity-40">
              <span className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-sm text-[11px]">3</span>
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Confirmation</span>
            </div>
          </nav>
        </div>

        {/* Free Shipping Progress Tracker Banner */}
        <div className="w-full bg-secondary-fixed/40 p-5 rounded-xl shadow-sm mb-space-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-secondary">local_shipping</span>
              <p className="font-body-md text-body-md text-on-surface font-medium">
                {isFreeShipping ? (
                  <span>Congratulations! Your atelier order qualifies for <strong className="text-secondary">Complimentary Worldwide Express Delivery</strong>.</span>
                ) : (
                  <span>You're only <span className="font-bold text-secondary font-price-headline text-[16px]">${amountToFreeShipping.toFixed(2)}</span> away from complimentary Worldwide Express Delivery!</span>
                )}
              </p>
            </div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold bg-surface-container-lowest px-3 py-1 rounded-full self-start sm:self-auto shadow-sm">
              {shippingProgress}% Reached
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all duration-700 ease-out" style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-24 bg-surface-container-lowest rounded-2xl p-8 space-y-4">
            <span className="material-symbols-outlined text-[48px] text-secondary">shopping_bag</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Your atelier bag is currently empty</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Discover our resort capsule collection crafted for every silhouette.</p>
            <Link to="/shop" className="inline-block mt-4 px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider">
              Explore Collections
            </Link>
          </div>
        ) : (
          /* Two-Column Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Left Column: Bag Items */}
            <section className="lg:col-span-8 space-y-space-lg">
              <div className="flex items-center justify-between pb-space-xs">
                <h2 className="font-title-editorial text-title-editorial text-on-surface uppercase tracking-wide font-bold">
                  Your Pieces <span className="text-on-surface-variant font-label-md font-normal lowercase">({cart.items.length} items)</span>
                </h2>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Standard Curated Dispatch: 24h</span>
              </div>

              {cart.items.map(item => (
                <article key={item._id} className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-md">
                  <div className="flex flex-col sm:flex-row gap-space-md">
                    <div className="relative w-full sm:w-36 h-48 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-space-sm">
                          <div>
                            <span className="font-label-sm text-[10px] tracking-widest text-on-surface-variant uppercase">Atelier Edition</span>
                            <h3 className="font-title-editorial text-title-editorial text-on-surface mt-0.5 font-bold">{item.name}</h3>
                          </div>
                          <span className="font-price-headline text-price-headline text-on-surface font-semibold text-right">
                            ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 mt-2.5 text-on-surface-variant font-body-sm text-body-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">Color:</span>
                            <span className="inline-flex items-center gap-1">
                              <span className="w-3 h-3 rounded-full inline-block shadow-inner" style={{ backgroundColor: item.colorHex || '#f4ccd4' }} />
                              <span>{item.color}</span>
                            </span>
                          </div>
                          <span className="text-outline-variant">•</span>
                          <div className="flex items-center gap-1">
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">Size:</span>
                            <span>{item.size}</span>
                          </div>
                          <span className="text-outline-variant">•</span>
                          <div className="flex items-center gap-1 text-secondary font-semibold">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            <span className="font-label-sm text-[11px] uppercase tracking-wider">In Stock</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-space-md pt-5 mt-4 border-t border-surface-container/50">
                        <div className="flex items-center gap-space-sm">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Qty</span>
                          <div className="flex items-center bg-surface-container-low rounded-full px-2 py-1 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface"
                            >
                              <span className="material-symbols-outlined text-[16px]">remove</span>
                            </button>
                            <span className="w-8 text-center font-label-md text-label-md text-on-surface font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface"
                            >
                              <span className="material-symbols-outlined text-[16px]">add</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-space-md">
                          <button
                            onClick={() => removeItem(item._id)}
                            className="flex items-center gap-1 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-error transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Luxury Gifting Option Card */}
              <div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm">
                <label className="flex items-start gap-3.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cart.giftPackaging}
                    onChange={toggleGiftPackaging}
                    className="mt-1 h-5 w-5 rounded accent-secondary cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">redeem</span>
                      <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Complimentary Atelier Gift Packaging</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Each piece arrives cushioned in acid-free tissue paper, custom silk garment travel bag, and debossed ribbon presentation box.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {/* Right Column: Order Summary */}
            <aside className="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md sticky top-32">
              <h3 className="font-title-editorial text-title-editorial uppercase text-on-surface font-bold tracking-wide">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Voucher Code (CHIC15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-surface-container-low rounded-lg text-body-sm focus:outline-none uppercase"
                  />
                  <button type="submit" className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md uppercase font-bold hover:bg-surface-container-high">
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`font-body-sm text-[12px] ${promoMessage.success ? 'text-secondary font-bold' : 'text-error'}`}>
                    {promoMessage.message}
                  </p>
                )}
              </form>

              <div className="space-y-2 pt-2 border-t border-surface-container font-body-md text-body-md text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Voucher ({cart.promoCode})</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Express</span>
                  <span className="text-on-surface font-semibold">{isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-on-surface font-semibold">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-surface-container text-on-surface font-bold text-headline-sm">
                  <span>Total</span>
                  <span className="font-price-headline text-[24px] text-primary">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                to="/checkout"
                className="w-full py-4 rounded-full bg-primary text-on-primary font-label-lg uppercase tracking-wider text-center block shadow-md hover:bg-secondary hover:scale-[1.01] transition-all"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

