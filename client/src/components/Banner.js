import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Banner.css';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerData = [
    {
      id: 1,
      image: '/images/restaurant1.jpg',
      title: 'Nhà hàng Việt Phố',
      description: 'Khám phá hương vị Việt Nam truyền thống',
      link: '/restaurant/viet-pho'
    },
    {
      id: 2,
      image: '/images/restaurant2.jpg',
      title: 'Sea Food Paradise',
      description: 'Thiên đường hải sản tươi sống',
      link: '/restaurant/sea-food-paradise'
    },
    {
      id: 3,
      image: '/images/restaurant3.jpg',
      title: 'BBQ Garden',
      description: 'Nướng ngon đậm vị',
      link: '/restaurant/bbq-garden'
    },
    // Thêm 2 slide nữa
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === bannerData.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner">
      <div className="banner-slider" 
           style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {bannerData.map((slide) => (
          <div key={slide.id} className="banner-slide">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <Link to={slide.link} className="view-details-btn">
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="banner-dots">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
