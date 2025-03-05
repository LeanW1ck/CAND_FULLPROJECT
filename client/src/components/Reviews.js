import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '../context/LocationContext';
import AnimatedSection from './common/AnimatedSection';
import '../styles/Reviews.css';

const Reviews = () => {
  const { currentLocation, locations } = useLocation();

  const reviews = [
    {
      id: 1,
      userName: 'Minh Anh',
      userAvatar: '/images/avatars/user1.jpg',
      restaurantName: 'Nhà hàng Việt Phố',
      rating: 5,
      comment: 'Món ăn ngon, phục vụ chu đáo, không gian thoáng mát và sang trọng.',
      images: ['/images/reviews/review1.jpg'],
      date: '2024-03-01',
      city: 'ho-chi-minh'
    },
    {
      id: 2,
      userName: 'Hải Nam',
      userAvatar: '/images/avatars/user2.jpg',
      restaurantName: 'Sea Food Paradise',
      rating: 4.5,
      comment: 'Hải sản tươi ngon, view biển tuyệt đẹp. Giá cả hợp lý.',
      images: ['/images/reviews/review2.jpg'],
      date: '2024-03-02',
      city: 'da-nang'
    },
    {
      id: 3,
      userName: 'Thu Hà',
      userAvatar: '/images/avatars/user3.jpg',
      restaurantName: 'Phố Cổ Restaurant',
      rating: 4.8,
      comment: 'Không gian mang đậm nét Hà Nội xưa, món ăn đậm đà hương vị truyền thống.',
      images: ['/images/reviews/review3.jpg'],
      date: '2024-03-03',
      city: 'ha-noi'
    }
  ];

  const filteredReviews = currentLocation === 'all'
    ? reviews
    : reviews.filter(review => review.city === currentLocation);

  const currentLocationName = locations.find(loc => loc.id === currentLocation)?.name;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatedSection className="reviews-section">
      <h2 className="section-title">
        Đánh giá từ thực khách {currentLocation !== 'all' && `tại ${currentLocationName}`}
      </h2>
      <motion.div
        className="reviews-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredReviews.map(review => (
          <motion.div
            key={review.id}
            className="review-card"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="review-header">
              <motion.div 
                className="user-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <img src={review.userAvatar} alt={review.userName} className="user-avatar" />
                <div>
                  <h4 className="user-name">{review.userName}</h4>
                  <p className="restaurant-name">{review.restaurantName}</p>
                </div>
              </motion.div>
              <motion.div 
                className="rating"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="stars">{'★'.repeat(Math.floor(review.rating))}</span>
                <span className="rating-number">{review.rating}</span>
              </motion.div>
            </div>
            <motion.p 
              className="review-comment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {review.comment}
            </motion.p>
            {review.images && review.images.length > 0 && (
              <motion.div 
                className="review-images"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {review.images.map((image, index) => (
                  <img key={index} src={image} alt={`Review ${index + 1}`} />
                ))}
              </motion.div>
            )}
            <motion.div 
              className="review-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="review-date">
                {new Date(review.date).toLocaleDateString('vi-VN')}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
};

export default Reviews;
