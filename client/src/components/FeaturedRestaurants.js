import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from '../context/LocationContext';
import AnimatedSection from './common/AnimatedSection';
import '../styles/FeaturedRestaurants.css';

const FeaturedRestaurants = () => {
  const { currentLocation, locations } = useLocation();

  const restaurants = [
    {
      id: 1,
      name: 'Nhà hàng Việt Phố',
      location: 'Quận 1, TP.HCM',
      rating: 4.5,
      image: '/images/viet-pho.jpg',
      reviews: 120,
      city: 'ho-chi-minh'
    },
    {
      id: 2,
      name: 'Sea Food Paradise',
      location: 'Sơn Trà, Đà Nẵng',
      rating: 4.8,
      image: '/images/seafood.jpg',
      reviews: 89,
      city: 'da-nang'
    },
    {
      id: 3,
      name: 'Phố Cổ Restaurant',
      location: 'Hoàn Kiếm, Hà Nội',
      rating: 4.6,
      image: '/images/pho-co.jpg',
      reviews: 150,
      city: 'ha-noi'
    },
    // Thêm các nhà hàng khác
  ];

  const filteredRestaurants = currentLocation === 'all'
    ? restaurants
    : restaurants.filter(restaurant => restaurant.city === currentLocation);

  const currentLocationName = locations.find(loc => loc.id === currentLocation)?.name;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatedSection className="featured-restaurants">
      <h2 className="section-title">
        Nhà Hàng Nổi Bật {currentLocation !== 'all' && `tại ${currentLocationName}`}
      </h2>
      <motion.div
        className="restaurant-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredRestaurants.map(restaurant => (
          <motion.div
            key={restaurant.id}
            className="restaurant-card"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
          >
            <div className="restaurant-image">
              <img src={restaurant.image} alt={restaurant.name} />
            </div>
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p className="location">{restaurant.location}</p>
              <div className="rating">
                <span className="stars">{'★'.repeat(Math.floor(restaurant.rating))}</span>
                <span className="rating-number">{restaurant.rating}</span>
                <span className="review-count">({restaurant.reviews} đánh giá)</span>
              </div>
              <Link to={`/restaurant/${restaurant.id}`} className="view-details">
                Xem chi tiết
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        className="view-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/restaurants" className="view-all-btn">
          Xem tất cả nhà hàng
        </Link>
      </motion.div>
    </AnimatedSection>
  );
};

export default FeaturedRestaurants;
