import React from 'react';
import { Box } from '@mui/material';
import { PLACEHOLDER_IMAGE } from '../../assets/images';

const ImagePlaceholder = ({ width, height, alt = 'placeholder' }) => {
  return (
    <Box
      component="div"
      sx={{
        width: width || '100%',
        height: height || '100%',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ccc',
        borderRadius: 1,
        color: '#666',
        fontSize: '0.875rem',
      }}
    >
      {width}x{height}
    </Box>
  );
};

export default ImagePlaceholder;
