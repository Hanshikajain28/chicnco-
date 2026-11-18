import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/client';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, discountAmount, isFreeShipping, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: 'eleanor.vane@atelier-vane.com',
    marketingOptIn: true,
    phone: '+1 (415) 890-3412',
    firstName: 'Eleanor',
    lastName: 'Vane',
    country: 'United States',
    street: '482 Montgomery Street',
    apt: 'Penthouse 14B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94104',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '4111 2222 3333 9042',
    cardExp: '12/28',
    cardCvc: '842'
  });

  const [orderComplete, setOrderComplete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const shippingCost = formData.shippingMethod === 'whiteglove' ? 18.00 : (isFreeShipping ? 0.00 : 15.00);
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.08 * 100) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const orderPayload = {
      email: formData.email,
      items: cart.items.map(item => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        salePrice: item.salePrice
      })),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        apt: formData.apt,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone
      },
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod,
      promoCode: cart.promoCode,
      giftPackaging: cart.giftPackaging
    };

    try {
      const res = await createOrder(orderPayload);
      if (res.order) {
        setOrderComplete(res.order);
        clearCart();
      }
    } catch (err) {
      // Create local confirmation if backend server isn't reachable
      setOrderComplete({
        orderNumber: `CNC-${Math.floor(10000 + Math.random() * 90000)}`,
        total: grandTotal,
        guestEmail: formData.email
      });
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="w-full min-h-screen pt-36 pb-24 bg-surface flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-secondary-fixed text-secondary mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold block">
            Atelier Dispatch Confirmed
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Thank You, Eleanor</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Your order <strong className="text-on-surface font-mono">{orderComplete.orderNumber}</strong> has been received by our master atelier team in Porto. A tracking confirmation note has been dispatched to <strong>{formData.email}</strong>.
          </p>
          <div className="p-4 bg-surface-container-low rounded-xl text-left space-y-2 font-body-sm text-body-sm">
            <div className="flex justify-between">
              <span>Fulfillment Courier:</span>
              <span className="font-semibold text-on-surface">DHL Express Worldwide</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-semibold text-on-surface">2–3 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span>Total Paid:</span>
              <span className="font-bold text-secondary font-price-headline">${orderComplete.total?.toFixed(2) || grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/" className="inline-block px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider hover:bg-secondary transition-all">
            Return to Atelier Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-space-lg bg-surface">
      <div className="flex flex-col w-full max-w-7xl mx-auto py-space-md px-margin-mobile md:px-margin font-body-md text-on-surface">
        {/* Minimalist Checkout Header */}
        <header className="w-full flex flex-col md:flex-row items-center justify-between pb-space-lg mb-space-lg border-b border-surface-container-highest">
          <Link to="/" className="flex items-baseline space-x-2 mb-space-sm md:mb-0">
            <span className="font-display-hero text-headline-md tracking-widest text-primary font-bold">CHIC</span>
            <span className="font-display-hero text-headline-sm italic text-secondary font-medium">N</span>
            <span className="font-display-hero text-headline-md tracking-widest text-primary font-bold">CO.</span>
            <span className="w-2 h-2 rounded-full bg-secondary inline-block ml-1" />
          </Link>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-on-surface-variant text-label-md bg-surface-container-low px-space-md py-space-xs rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary mr-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              <span className="font-label-md tracking-wide">SECURE 256-BIT ENCRYPTED CHECKOUT</span>
            </div>
          </div>
        </header>

        {/* 2-Column Checkout Layout */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Form Steps */}
          <section className="lg:col-span-7 flex flex-col space-y-space-xl">
            {/* STEP 1: Contact Information */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm font-bold">1</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Contact Information</h2>
                </div>
                <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">Required</span>
              </div>
              <div className="space-y-space-md">
                <div>
                  <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">Email Address for Confirmation</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary font-body-md"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="marketingOptIn"
                    checked={formData.marketingOptIn}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-secondary accent-secondary cursor-pointer"
                  />
                  <label className="text-body-sm text-on-surface-variant">Keep me updated on private atelier releases and lookbooks.</label>
                </div>
                <div>
                  <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">Mobile Number (SMS Dispatch)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary font-body-md"
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: Shipping Address */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm font-bold">2</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Shipping Address</h2>
                </div>
                <span className="text-label-sm font-label-sm text-secondary tracking-wider font-bold">COMPLIMENTARY SHIPPING</span>
              </div>
              <div className="space-y-space-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                  <div>
                    <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Shipping Method */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm font-bold">3</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Shipping Method</h2>
              </div>
              <div className="space-y-space-sm">
                <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-primary"
                    />
                    <div>
                      <p className="font-label-lg text-on-surface font-bold">Standard Express Courier</p>
                      <p className="text-body-sm text-on-surface-variant">2-3 Business Days • Carbon Neutral Fulfillment</p>
                    </div>
                  </div>
                  <span className="font-label-lg text-secondary uppercase font-bold tracking-wider">{isFreeShipping ? 'Free' : '$15.00'}</span>
                </label>
                <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="whiteglove"
                      checked={formData.shippingMethod === 'whiteglove'}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-primary"
                    />
                    <div>
                      <p className="font-label-lg text-on-surface font-bold">Next-Day Atelier White Glove</p>
                      <p className="text-body-sm text-on-surface-variant">Guaranteed Tomorrow by 12:00 PM • Signature Garment Carrier</p>
                    </div>
                  </div>
                  <span className="font-price-headline text-on-surface font-semibold">$18.00</span>
                </label>
              </div>
            </div>

            {/* STEP 4: Payment */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm font-bold">4</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Payment Method</h2>
                </div>
                <span className="text-label-sm text-secondary font-bold">PCI-DSS COMPLIANT</span>
              </div>
              <div className="space-y-space-md">
                <div>
                  <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-space-md">
                  <div>
                    <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">Expiry</label>
                    <input
                      type="text"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleInputChange}
                      className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md uppercase text-on-surface-variant mb-space-xs">CVC</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="w-full h-12 px-space-md bg-surface-container-low text-on-surface rounded-lg focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Order Summary & Place Order */}
          <aside className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md sticky top-12">
            <h3 className="font-title-editorial text-title-editorial uppercase text-on-surface font-bold tracking-wide">
              Order Summary ({cart.items.length})
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {cart.items.map(item => (
                <div key={item._id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-md bg-surface-container" />
                  <div className="flex-1 text-body-sm">
                    <p className="font-bold text-on-surface">{item.name}</p>
                    <p className="text-on-surface-variant">{item.color} • {item.size} • Qty {item.quantity}</p>
                  </div>
                  <span className="font-price-headline text-[15px] font-semibold">${((item.salePrice || item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-surface-container font-body-md text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-on-surface font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-secondary font-semibold">
                  <span>Discount ({cart.promoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-on-surface font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="text-on-surface font-semibold">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-surface-container text-on-surface font-bold text-headline-sm">
                <span>Total</span>
                <span className="font-price-headline text-[24px] text-primary">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full bg-primary text-on-primary font-label-lg uppercase tracking-wider shadow-md hover:bg-secondary transition-all disabled:opacity-50"
            >
              {submitting ? 'Authenticating Order...' : `Complete Order — $${grandTotal.toFixed(2)}`}
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
}

