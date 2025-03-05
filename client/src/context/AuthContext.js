import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'Nhà hàng ABC',
    email: 'restaurant@abc.com',
    avatar: '/images/avatars/default-avatar.jpg',
    role: 'restaurant', // 'user' or 'restaurant'
    restaurantInfo: {
      id: '1',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      phone: '0123456789',
      rating: 4.5,
      totalReviews: 128,
      status: 'open',
    },
    notifications: [
      {
        id: 1,
        type: 'booking',
        message: 'Có đơn đặt bàn mới',
        time: '2024-03-05T10:30:00Z',
        read: false
      },
      {
        id: 2,
        type: 'review',
        message: 'Khách hàng vừa đánh giá nhà hàng của bạn',
        time: '2024-03-05T09:15:00Z',
        read: false
      }
    ]
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
