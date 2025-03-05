import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeaturedRestaurants.css';

const FeaturedRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: 'Nhà hàng Việt Phố',
      location: 'Quận 1, TP.HCM',
      rating: 4.5,
      image: '/images/viet-pho.jpg',
      reviews: 120
    },
    {
      id: 2,
      name: 'Sea Food Paradise',
      location: 'Quận 3, TP.HCM',
      rating: 4.8,
      image: '/images/seafood.jpg',
      reviews: 89
    },
    // Thêm các nhà hàng khác
  ];

  return (
    <section className="featured-restaurants">
      <h2 className="section-title">Nhà Hàng Nổi Bật</h2>
      <div className="restaurant-grid">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
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
          </div>
        ))}
      </div>
      <div className="view-all">
        <Link to="/restaurants" className="view-all-btn">
          Xem tất cả nhà hàng
        </Link>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
