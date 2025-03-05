import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRestaurant } from '../context/RestaurantContext';
import UserMenu from '../components/UserMenu';
import '../styles/Home.css';

const Home = () => {
  const { user } = useAuth();
  const { restaurant } = useRestaurant();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <div className="user-details">
            <h2>{user.name}</h2>
            {user.role === 'restaurant' && (
              <>
                <p className="restaurant-address">
                  <i className="fas fa-map-marker-alt"></i> {restaurant.address}
                </p>
                <div className="restaurant-status">
                  <span className={`status-badge ${restaurant.status}`}>
                    {restaurant.status === 'open' ? 'Đang mở cửa' : 'Đã đóng cửa'}
                  </span>
                  <span className="rating">
                    <i className="fas fa-star"></i>
                    {restaurant.rating} ({restaurant.totalReviews} đánh giá)
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <UserMenu />
      </div>

      <div className="dashboard-content">
        {user.role === 'restaurant' ? (
          <div className="restaurant-actions">
            <div className="action-card">
              <i className="fas fa-utensils"></i>
              <h3>Quản lý Menu</h3>
              <p>Cập nhật món ăn và giá cả</p>
            </div>
            <div className="action-card">
              <i className="fas fa-calendar-alt"></i>
              <h3>Đặt bàn</h3>
              <p>Xem và quản lý đơn đặt bàn</p>
            </div>
            <div className="action-card">
              <i className="fas fa-chart-line"></i>
              <h3>Thống kê</h3>
              <p>Xem báo cáo doanh thu</p>
            </div>
            <div className="action-card">
              <i className="fas fa-comments"></i>
              <h3>Đánh giá</h3>
              <p>Phản hồi đánh giá khách hàng</p>
            </div>
          </div>
        ) : (
          <div className="user-actions">
            <div className="action-card">
              <i className="fas fa-heart"></i>
              <h3>Nhà hàng yêu thích</h3>
              <p>Xem danh sách yêu thích</p>
            </div>
            <div className="action-card">
              <i className="fas fa-history"></i>
              <h3>Lịch sử đặt bàn</h3>
              <p>Xem các đơn đặt bàn</p>
            </div>
            <div className="action-card">
              <i className="fas fa-star"></i>
              <h3>Đánh giá của tôi</h3>
              <p>Quản lý đánh giá</p>
            </div>
            <div className="action-card">
              <i className="fas fa-bell"></i>
              <h3>Thông báo</h3>
              <p>Cập nhật mới nhất</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
