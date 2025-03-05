import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRestaurant } from '../context/RestaurantContext';
import '../styles/EditHoursModal.css';

const EditHoursModal = ({ isOpen, onClose }) => {
  const { restaurant, updateOpeningHours } = useRestaurant();
  const [hours, setHours] = useState(restaurant.openingHours);

  const days = [
    { key: 'monday', label: 'Thứ 2' },
    { key: 'tuesday', label: 'Thứ 3' },
    { key: 'wednesday', label: 'Thứ 4' },
    { key: 'thursday', label: 'Thứ 5' },
    { key: 'friday', label: 'Thứ 6' },
    { key: 'saturday', label: 'Thứ 7' },
    { key: 'sunday', label: 'Chủ nhật' }
  ];

  const handleTimeChange = (day, type, value) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };

  const handleSave = () => {
    // Cập nhật giờ mở cửa cho từng ngày
    Object.entries(hours).forEach(([day, timeRange]) => {
      updateOpeningHours(day, timeRange);
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="modal-header">
              <h2>Chỉnh sửa giờ mở cửa</h2>
              <button className="close-button" onClick={onClose}>&times;</button>
            </div>

            <div className="modal-body">
              {days.map(({ key, label }) => (
                <div key={key} className="time-row">
                  <span className="day-label">{label}</span>
                  <div className="time-inputs">
                    <div className="time-input-group">
                      <label>Mở cửa:</label>
                      <input
                        type="time"
                        value={hours[key].open}
                        onChange={(e) => handleTimeChange(key, 'open', e.target.value)}
                      />
                    </div>
                    <div className="time-input-group">
                      <label>Đóng cửa:</label>
                      <input
                        type="time"
                        value={hours[key].close}
                        onChange={(e) => handleTimeChange(key, 'close', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="cancel-button" onClick={onClose}>Hủy</button>
              <button className="save-button" onClick={handleSave}>Lưu thay đổi</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditHoursModal;
