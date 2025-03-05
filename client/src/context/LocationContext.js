import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState('all');
  const [locations] = useState([
    { id: 'all', name: 'Tất cả' },
    { id: 'da-nang', name: 'Đà Nẵng' },
    { id: 'ho-chi-minh', name: 'TP.HCM' },
    { id: 'ha-noi', name: 'Hà Nội' }
  ]);

  const changeLocation = (locationId) => {
    setCurrentLocation(locationId);
  };

  return (
    <LocationContext.Provider value={{ 
      currentLocation, 
      locations, 
      changeLocation,
      getCurrentLocationName: () => locations.find(loc => loc.id === currentLocation)?.name
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
