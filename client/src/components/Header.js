import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRestaurant } from '../context/RestaurantContext';
import UserMenu from './UserMenu';
import '../styles/Header.css';

const Header = () => {
  const { user } = useAuth();
  const { restaurant } = useRestaurant();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="Logo" />
          <span>CAND Restaurant</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Trang chủ</Link>
          <Link to="/restaurants">Nhà hàng</Link>
          <Link to="/about">Về chúng tôi</Link>
          <Link to="/contact">Liên hệ</Link>
        </nav>

        <div className="header-right">
          {user ? (
            <div className="user-section">
              {user.role === 'restaurant' && (
                <span className={`status-badge ${restaurant.status}`}>
                  {restaurant.status === 'open' ? 'Đang mở cửa' : 'Đã đóng cửa'}
                </span>
              )}
              <UserMenu />
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Đăng nhập</Link>
              <Link to="/register" className="register-btn">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
