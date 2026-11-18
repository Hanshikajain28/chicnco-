import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('chicnco_user');
    return saved ? JSON.parse(saved) : {
      firstName: 'Eleanor',
      lastName: 'Vane',
      email: 'eleanor.vane@atelier-vane.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzQFxsQtOc2mCcTTVCu54CQxQzEkM482GSE3FhqsZrnI7hyXb7XSLQEqYILyCicTATJlRKQtM3A1or3FM3pu6nFoxmNun1nkj1lj2lRMRYgybgVubDDjVTv0fgFaHIIB4djj077_o_1m16s-an2Ywiy-DVwaQqS1P3IhteOOG1RsPOeVv6jKQAkVqWcmAR7HH1fksKiZ77tNFKUsd9Ad0EZOcZ2eR8nIMRYZ3ey2oCnaihs85cpzSRCA'
    };
  });

  const loginUser = async (email, password) => {
    try {
      const data = await loginApi({ email, password });
      if (data.token) {
        localStorage.setItem('chicnco_token', data.token);
      }
      setUser(data.user);
      localStorage.setItem('chicnco_user', JSON.stringify(data.user));
      return { success: true };
    } catch (e) {
      return { success: false, message: e.response?.data?.message || 'Login failed' };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('chicnco_token');
    localStorage.removeItem('chicnco_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

