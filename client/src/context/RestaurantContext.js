import React, { createContext, useContext, useState, useEffect } from 'react';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState({
    id: '1',
    name: 'Nhà hàng ABC',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    phone: '0123456789',
    email: 'contact@abc.com',
    avatar: '/images/restaurants/abc-logo.jpg',
    coverImage: '/images/restaurants/abc-cover.jpg',
    rating: 4.5,
    totalReviews: 128,
    status: 'open',
    categories: ['Việt Nam', 'Đặc sản'],
    openingHours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '22:00' },
      saturday: { open: '08:00', close: '22:00' },
      sunday: { open: '08:00', close: '22:00' }
    },
    statistics: {
      totalOrders: 1250,
      monthlyViews: 3500,
      avgRating: 4.5,
      totalBookings: 850
    },
    recentReviews: [
      {
        id: 1,
        user: 'Nguyễn Văn A',
        rating: 5,
        comment: 'Đồ ăn ngon, phục vụ tốt',
        date: '2024-03-04'
      },
      {
        id: 2,
        user: 'Trần Thị B',
        rating: 4,
        comment: 'Không gian đẹp, giá cả hợp lý',
        date: '2024-03-03'
      }
    ],
    pendingBookings: [
      {
        id: 1,
        customerName: 'Lê Văn C',
        date: '2024-03-06',
        time: '19:00',
        guests: 4,
        status: 'pending'
      },
      {
        id: 2,
        customerName: 'Phạm Thị D',
        date: '2024-03-07',
        time: '18:30',
        guests: 2,
        status: 'pending'
      }
    ]
  });

  const getDayKey = (dayNumber) => {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ];
    return days[dayNumber];
  };

  const checkIfOpen = () => {
    const now = new Date();
    const dayKey = getDayKey(now.getDay());
    const currentTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });

    const dayHours = restaurant.openingHours[dayKey];
    if (!dayHours) return false;

    const isOpen = currentTime >= dayHours.open && currentTime <= dayHours.close;
    setRestaurant(prev => ({
      ...prev,
      status: isOpen ? 'open' : 'closed'
    }));
  };

  // Kiểm tra trạng thái mỗi phút
  useEffect(() => {
    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000);
    return () => clearInterval(interval);
  }, [restaurant.openingHours]);

  const updateOpeningHours = (day, newHours) => {
    setRestaurant(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: newHours
      }
    }));
    checkIfOpen(); // Kiểm tra lại trạng thái ngay sau khi cập nhật giờ
  };

  return (
    <RestaurantContext.Provider value={{ 
      restaurant, 
      updateOpeningHours,
      checkIfOpen 
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
