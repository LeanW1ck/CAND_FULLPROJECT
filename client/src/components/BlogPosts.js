import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from '../context/LocationContext';
import AnimatedSection from './common/AnimatedSection';
import '../styles/BlogPosts.css';

const BlogPosts = () => {
  const { currentLocation, locations } = useLocation();

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 quán ăn không thể bỏ qua tại Sài Gòn',
      excerpt: 'Khám phá những địa điểm ẩm thực độc đáo và hấp dẫn nhất tại thành phố năng động nhất Việt Nam.',
      image: '/images/blogs/saigon-food.jpg',
      author: 'Thanh Tùng',
      date: '2024-03-01',
      readTime: '5 phút',
      city: 'ho-chi-minh'
    },
    {
      id: 2,
      title: 'Ẩm thực đường phố Đà Nẵng',
      excerpt: 'Hành trình khám phá những món ngon đường phố không thể bỏ lỡ khi đến với thành phố biển xinh đẹp.',
      image: '/images/blogs/danang-street-food.jpg',
      author: 'Mai Linh',
      date: '2024-03-02',
      readTime: '4 phút',
      city: 'da-nang'
    },
    {
      id: 3,
      title: 'Phố cổ Hà Nội - Thiên đường ẩm thực',
      excerpt: 'Khám phá nét văn hóa ẩm thực độc đáo của 36 phố phường Hà Nội.',
      image: '/images/blogs/hanoi-food.jpg',
      author: 'Đức Anh',
      date: '2024-03-03',
      readTime: '6 phút',
      city: 'ha-noi'
    }
  ];

  const filteredPosts = currentLocation === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.city === currentLocation);

  const currentLocationName = locations.find(loc => loc.id === currentLocation)?.name;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatedSection className="blog-posts-section">
      <h2 className="section-title">
        Bài viết mới nhất {currentLocation !== 'all' && `về ẩm thực ${currentLocationName}`}
      </h2>
      <motion.div
        className="blog-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredPosts.map(post => (
          <motion.article
            key={post.id}
            className="blog-card"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="blog-image"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <img src={post.image} alt={post.title} />
            </motion.div>
            <div className="blog-content">
              <motion.h3 
                className="blog-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {post.title}
              </motion.h3>
              <motion.p 
                className="blog-excerpt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {post.excerpt}
              </motion.p>
              <motion.div 
                className="blog-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="author-info">
                  <span className="author">Bởi {post.author}</span>
                  <span className="date">
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <span className="read-time">{post.readTime}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to={`/blog/${post.id}`} className="read-more">
                  Đọc tiếp
                </Link>
              </motion.div>
            </div>
          </motion.article>
        ))}
      </motion.div>
      <motion.div 
        className="view-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/blog" className="view-all-btn">
          Xem tất cả bài viết
        </Link>
      </motion.div>
    </AnimatedSection>
  );
};

export default BlogPosts;
