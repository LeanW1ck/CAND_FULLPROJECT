import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>FoodReview</h1>
          </Link>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/restaurants">Nhà hàng</Link></li>
            <li><Link to="/blog">Bài viết</Link></li>
            <li><Link to="/reviews">Đánh giá</Link></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Đăng nhập</Link>
          <Link to="/register" className="register-btn">Đăng ký</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
