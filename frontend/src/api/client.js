import api from './api';

export const getProducts = async (params = {}) => {
  const res = await api.get('/products', { params });
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const getCart = async () => {
  const res = await api.get('/cart');
  return res.data;
};

export const addToCart = async (itemData) => {
  const res = await api.post('/cart', itemData);
  return res.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const res = await api.put(`/cart/${itemId}`, { quantity });
  return res.data;
};

export const removeFromCart = async (itemId) => {
  const res = await api.delete(`/cart/${itemId}`);
  return res.data;
};

export const applyPromo = async (code) => {
  const res = await api.post('/cart/promo', { code });
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data;
};

export const getOrder = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

export const submitContact = async (formData) => {
  const res = await api.post('/contact', formData);
  return res.data;
};

export const getReviews = async (productId) => {
  const res = await api.get(`/reviews/product/${productId}`);
  return res.data;
};

export const postReview = async (reviewData) => {
  const res = await api.post('/reviews', reviewData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const register = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

