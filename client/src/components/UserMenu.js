import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/UserMenu.css';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMenuItems = () => {
    if (user.role === 'restaurant') {
      return [
        { icon: '🏪', label: 'Trang quản lý', path: '/restaurant/dashboard' },
        { icon: '📊', label: 'Thống kê', path: '/restaurant/stats' },
        { icon: '🔔', label: 'Thông báo', path: '/notifications', 
          badge: user.notifications?.filter(n => !n.read).length },
        { icon: '📝', label: 'Menu & Giá', path: '/restaurant/menu' },
        { icon: '🖼️', label: 'Hình ảnh', path: '/restaurant/gallery' },
        { icon: '⚙️', label: 'Cài đặt', path: '/settings' },
      ];
    } else {
      return [
        { icon: '👤', label: 'Thông tin cá nhân', path: '/profile' },
        { icon: '⚙️', label: 'Cài đặt', path: '/settings' },
        { icon: '🔔', label: 'Thông báo', path: '/notifications', 
          badge: user.notifications?.filter(n => !n.read).length },
        { icon: '❤️', label: 'Nhà hàng yêu thích', path: '/favorites' },
        { icon: '📝', label: 'Đánh giá của tôi', path: '/my-reviews' },
        { icon: '📋', label: 'Đơn đặt chỗ', path: '/reservations' },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="user-menu" ref={menuRef}>
      <div className="user-menu-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="welcome-text">
          {user.role === 'restaurant' ? 'Quản lý:' : 'Xin chào,'} {user.name}
        </span>
        <div className="avatar-container">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="user-avatar"
          />
          {user.notifications?.some(n => !n.read) && (
            <span className="notification-badge" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="user-info">
              <img src={user.avatar} alt={user.name} className="user-avatar-large" />
              <div className="user-details">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                {user.role === 'restaurant' && (
                  <span className={`status-badge ${user.restaurantInfo.status}`}>
                    {user.restaurantInfo.status === 'open' ? 'Đang mở cửa' : 'Đã đóng cửa'}
                  </span>
                )}
              </div>
            </div>

            <div className="menu-items">
              {menuItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  className="menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="menu-item-icon">{item.icon}</span>
                  <span className="menu-item-label">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="menu-item-badge">{item.badge}</span>
                  )}
                </Link>
              ))}
            </div>

            <div className="menu-footer">
              <button 
                className="logout-button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <span className="menu-item-icon">🚪</span>
                Đăng xuất
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
