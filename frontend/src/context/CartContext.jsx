import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart as fetchCartApi, addToCart as addCartApi, updateCartItem as updateCartApi, removeFromCart as removeCartApi, applyPromo as promoApi } from '../api/client';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('chicnco_local_cart');
    return saved ? JSON.parse(saved) : { items: [], promoCode: '', discountPercent: 0, giftPackaging: false };
  });
  const [loading, setLoading] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('chicnco_local_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, color, colorHex, size, quantity = 1) => {
    const newItem = {
      _id: 'item_' + Date.now(),
      productId: product._id,
      name: product.name,
      image: product.images?.[0]?.url || '',
      color: color || product.colors?.[0]?.name || 'Standard',
      colorHex: colorHex || product.colors?.[0]?.hex || '#1a1a1a',
      size: size || 'S',
      quantity: Number(quantity),
      price: product.price,
      salePrice: product.salePrice
    };

    setCart(prev => {
      const existingIdx = prev.items.findIndex(
        i => (i.productId === product._id || i.name === product.name) && i.color === newItem.color && i.size === newItem.size
      );

      let updatedItems = [...prev.items];
      if (existingIdx > -1) {
        updatedItems[existingIdx].quantity += Number(quantity);
      } else {
        updatedItems.push(newItem);
      }
      return { ...prev, items: updatedItems };
    });

    try {
      await addCartApi({
        productId: product._id,
        color: newItem.color,
        colorHex: newItem.colorHex,
        size: newItem.size,
        quantity
      });
    } catch (e) {
      // Local state is preserved
    }
  };

  const updateQuantity = (itemId, newQty) => {
    setCart(prev => {
      if (newQty <= 0) {
        return {
          ...prev,
          items: prev.items.filter(i => i._id !== itemId)
        };
      }
      return {
        ...prev,
        items: prev.items.map(i => i._id === itemId ? { ...i, quantity: newQty } : i)
      };
    });
  };

  const removeItem = (itemId) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(i => i._id !== itemId)
    }));
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CHIC15') {
      setCart(prev => ({ ...prev, promoCode: 'CHIC15', discountPercent: 15 }));
      return { success: true, message: 'CHIC15 applied! 15% discount activated.' };
    }
    return { success: false, message: 'Invalid voucher. Use code CHIC15 for 15% off.' };
  };

  const toggleGiftPackaging = () => {
    setCart(prev => ({ ...prev, giftPackaging: !prev.giftPackaging }));
  };

  const clearCart = () => {
    setCart({ items: [], promoCode: '', discountPercent: 0, giftPackaging: false });
    localStorage.removeItem('chicnco_local_cart');
  };

  const subtotal = cart.items.reduce((acc, item) => {
    const price = item.salePrice || item.price;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = Math.round(subtotal * (cart.discountPercent / 100) * 100) / 100;
  const shippingThreshold = 120;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingProgress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const totalItemCount = cart.items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeItem,
      applyPromoCode,
      toggleGiftPackaging,
      clearCart,
      subtotal,
      discountAmount,
      isFreeShipping,
      shippingProgress,
      amountToFreeShipping,
      totalItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

