import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRestaurant } from '../context/RestaurantContext';
import EditHoursModal from '../components/EditHoursModal';
import '../styles/RestaurantDashboard.css';

const RestaurantDashboard = () => {
  const { restaurant } = useRestaurant();
  const [isEditHoursModalOpen, setIsEditHoursModalOpen] = useState(false);

  const days = [
    { key: 'monday', label: 'Thứ 2' },
    { key: 'tuesday', label: 'Thứ 3' },
    { key: 'wednesday', label: 'Thứ 4' },
    { key: 'thursday', label: 'Thứ 5' },
    { key: 'friday', label: 'Thứ 6' },
    { key: 'saturday', label: 'Thứ 7' },
    { key: 'sunday', label: 'Chủ nhật' }
  ];

  const statCards = [
    {
      title: 'Tổng đơn hàng',
      value: restaurant.statistics.totalOrders,
      icon: '🛍️',
      trend: '+12%'
    },
    {
      title: 'Lượt xem tháng',
      value: restaurant.statistics.monthlyViews,
      icon: '👁️',
      trend: '+8%'
    },
    {
      title: 'Đánh giá trung bình',
      value: restaurant.statistics.avgRating,
      icon: '⭐',
      trend: '+0.2'
    },
    {
      title: 'Lượt đặt bàn',
      value: restaurant.statistics.totalBookings,
      icon: '📅',
      trend: '+15%'
    }
  ];

  return (
    <div className="restaurant-dashboard">
      {/* Header Section */}
      <motion.div 
        className="restaurant-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="restaurant-info">
          <img src={restaurant.avatar} alt={restaurant.name} className="restaurant-avatar" />
          <div className="restaurant-details">
            <h1>{restaurant.name}</h1>
            <p className="restaurant-address">
              <i className="fas fa-map-marker-alt"></i> {restaurant.address}
            </p>
            <div className="restaurant-status">
              <span className={`status-badge ${restaurant.status}`}>
                {restaurant.status === 'open' ? 'Đang mở cửa' : 
                 restaurant.status === 'closed' ? 'Đã đóng cửa' : 'Đang bận'}
              </span>
              <span className="rating">
                <i className="fas fa-star"></i> {restaurant.rating} ({restaurant.totalReviews} đánh giá)
              </span>
            </div>
          </div>
        </div>
        <div className="quick-actions">
          <button className="action-btn primary">
            <i className="fas fa-edit"></i> Chỉnh sửa thông tin
          </button>
          <button className="action-btn">
            <i className="fas fa-camera"></i> Cập nhật ảnh
          </button>
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value">
                {stat.value}
                <span className="trend positive">{stat.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Pending Bookings */}
        <motion.div
          className="dashboard-card bookings-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Đặt bàn chờ xác nhận</h2>
          <div className="booking-list">
            {restaurant.pendingBookings.map(booking => (
              <div key={booking.id} className="booking-item">
                <div className="booking-info">
                  <h4>{booking.customerName}</h4>
                  <p>
                    <i className="far fa-calendar"></i> {booking.date} | 
                    <i className="far fa-clock"></i> {booking.time} |
                    <i className="fas fa-user-friends"></i> {booking.guests} khách
                  </p>
                </div>
                <div className="booking-actions">
                  <button className="accept-btn">Xác nhận</button>
                  <button className="reject-btn">Từ chối</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div
          className="dashboard-card reviews-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Đánh giá gần đây</h2>
          <div className="review-list">
            {restaurant.recentReviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <h4>{review.user}</h4>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} 
                         className={`fas fa-star ${i < review.rating ? 'active' : ''}`}>
                      </i>
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
                <p className="review-date">{review.date}</p>
                <button className="reply-btn">Trả lời</button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          className="dashboard-card hours-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Giờ mở cửa</h2>
          <div className="hours-list">
            {days.map(({ key, label }) => (
              <div key={key} className="hours-item">
                <span>{label}</span>
                <span>
                  {restaurant.openingHours[key].open} - {restaurant.openingHours[key].close}
                </span>
              </div>
            ))}
          </div>
          <button 
            className="edit-hours-btn"
            onClick={() => setIsEditHoursModalOpen(true)}
          >
            <i className="fas fa-edit"></i> Chỉnh sửa giờ mở cửa
          </button>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="dashboard-card categories-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2>Danh mục</h2>
          <div className="categories-list">
            {restaurant.categories.map((category, index) => (
              <span key={index} className="category-tag">{category}</span>
            ))}
          </div>
          <button className="edit-categories-btn">
            <i className="fas fa-plus"></i> Thêm danh mục
          </button>
        </motion.div>
      </div>

      <EditHoursModal 
        isOpen={isEditHoursModalOpen}
        onClose={() => setIsEditHoursModalOpen(false)}
      />
    </div>
  );
};

export default RestaurantDashboard;
