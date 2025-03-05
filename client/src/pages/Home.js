import React from 'react';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Chào mừng đến với CAND Project
      </Typography>
      <Typography variant="body1" paragraph>
        Đây là trang chủ của dự án. Bạn có thể bắt đầu thêm nội dung vào đây.
      </Typography>
    </Box>
  );
};

export default Home;
