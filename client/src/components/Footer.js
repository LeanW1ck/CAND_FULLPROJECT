import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Về Chúng Tôi</h3>
          <p>FoodReview - Nền tảng review nhà hàng hàng đầu Việt Nam, giúp bạn tìm kiếm và đặt chỗ tại những nhà hàng tốt nhất.</p>
        </div>
        
        <div className="footer-section">
          <h3>Liên Kết Nhanh</h3>
          <ul>
            <li><Link to="/about">Giới thiệu</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
            <li><Link to="/terms">Điều khoản sử dụng</Link></li>
            <li><Link to="/privacy">Chính sách bảo mật</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Dành Cho Nhà Hàng</h3>
          <ul>
            <li><Link to="/restaurant/register">Đăng ký nhà hàng</Link></li>
            <li><Link to="/restaurant/login">Đăng nhập quản lý</Link></li>
            <li><Link to="/restaurant/guidelines">Hướng dẫn</Link></li>
            <li><Link to="/restaurant/support">Hỗ trợ</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Kết Nối Với Chúng Tôi</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
          
          <div className="contact-info">
            <p>Email: contact@foodreview.vn</p>
            <p>Hotline: 1900 xxxx</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="copyright">
          © {new Date().getFullYear()} FoodReview. Tất cả quyền được bảo lưu.
        </div>
        <div className="payment-methods">
          <img src="/images/payment/visa.png" alt="Visa" />
          <img src="/images/payment/mastercard.png" alt="Mastercard" />
          <img src="/images/payment/momo.png" alt="Momo" />
          <img src="/images/payment/zalopay.png" alt="ZaloPay" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
