import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const dashboardItems = [
    {
      title: 'Nhà hàng yêu thích',
      icon: '❤️',
      count: 12,
      link: '/favorites'
    },
    {
      title: 'Đánh giá của tôi',
      icon: '⭐',
      count: 8,
      link: '/my-reviews'
    },
    {
      title: 'Đặt chỗ',
      icon: '📅',
      count: 3,
      link: '/reservations'
    },
    {
      title: 'Điểm thưởng',
      icon: '🎁',
      count: 520,
      link: '/points'
    }
  ];

  const recentActivities = [
    {
      type: 'review',
      restaurant: 'Nhà hàng ABC',
      time: '2 giờ trước',
      action: 'đã đánh giá'
    },
    {
      type: 'booking',
      restaurant: 'Quán XYZ',
      time: '1 ngày trước',
      action: 'đã đặt bàn'
    },
    {
      type: 'favorite',
      restaurant: 'Quán BBQ 123',
      time: '3 ngày trước',
      action: 'đã thêm vào yêu thích'
    }
  ];

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <motion.div 
        className="welcome-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="user-welcome">
          <img src={user.avatar} alt={user.name} className="dashboard-avatar" />
          <div className="welcome-text">
            <h1>Xin chào, {user.name}!</h1>
            <p>Chúc bạn một ngày tuyệt vời</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="dashboard-grid">
        {dashboardItems.map((item, index) => (
          <motion.div
            key={item.title}
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card-icon">{item.icon}</div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p className="card-count">{item.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities */}
      <motion.div
        className="recent-activities"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Hoạt động gần đây</h2>
        <div className="activities-list">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              className="activity-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="activity-content">
                <p>
                  <strong>Bạn</strong> {activity.action}{' '}
                  <span className="restaurant-name">{activity.restaurant}</span>
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Restaurants */}
      <motion.div
        className="recommended-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Gợi ý cho bạn</h2>
        <div className="recommended-grid">
          {/* Add recommended restaurants here */}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
