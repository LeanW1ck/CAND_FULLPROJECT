import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import '../styles/Header.css';

const Header = () => {
  const { currentLocation, locations, changeLocation } = useLocation();
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>FoodReview</h1>
          </Link>
        </div>

        <div className="location-selector">
          <button 
            className="location-button"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
          >
            <i className="fas fa-map-marker-alt"></i>
            {locations.find(loc => loc.id === currentLocation)?.name}
            <i className="fas fa-chevron-down"></i>
          </button>
          
          {isLocationOpen && (
            <div className="location-dropdown">
              {locations.map(location => (
                <button
                  key={location.id}
                  className={`location-option ${currentLocation === location.id ? 'active' : ''}`}
                  onClick={() => {
                    changeLocation(location.id);
                    setIsLocationOpen(false);
                  }}
                >
                  {location.name}
                </button>
              ))}
            </div>
          )}
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
