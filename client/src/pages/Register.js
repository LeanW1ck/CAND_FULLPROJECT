import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Paper,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    restaurantName: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  // Validation function for each field
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'fullName':
        if (!value.trim()) {
          return 'Họ tên là bắt buộc';
        } else if (value.trim().length < 2) {
          return 'Họ tên phải có ít nhất 2 ký tự';
        }
        return null;

      case 'email':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
          return 'Email là bắt buộc';
        } else if (!emailRegex.test(value)) {
          return 'Email không hợp lệ (ví dụ: example@domain.com)';
        }
        return null;

      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value) {
          return 'Số điện thoại là bắt buộc';
        } else if (!phoneRegex.test(value)) {
          return 'Số điện thoại phải có đúng 10 số';
        }
        return null;

      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!value) {
          return 'Mật khẩu là bắt buộc';
        } else if (!passwordRegex.test(value)) {
          return 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số';
        }
        return null;

      case 'confirmPassword':
        if (!value) {
          return 'Vui lòng xác nhận mật khẩu';
        } else if (value !== formData.password) {
          return 'Mật khẩu xác nhận không khớp';
        }
        return null;

      case 'restaurantName':
        if (formData.role === 'restaurant' && !value.trim()) {
          return 'Tên nhà hàng là bắt buộc';
        }
        return null;

      case 'agreeToTerms':
        if (!value) {
          return 'Bạn phải đồng ý với điều khoản';
        }
        return null;

      default:
        return null;
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === 'agreeToTerms' ? checked : value;

    // Special handling for phone number
    if (name === 'phone') {
      const numericValue = value.replace(/[^\d]/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      const error = validateField(name, numericValue);
      setErrors(prev => ({ ...prev, [name]: error }));
      return;
    }

    // Handle other fields
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Validate the changed field
    const error = validateField(name, newValue);
    setErrors(prev => ({ ...prev, [name]: error }));

    // Special handling for password/confirmPassword
    if (name === 'password') {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
  
    // Validate all required fields
    const requiredFields = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
    if (formData.role === 'restaurant') {
      requiredFields.push('restaurantName');
    }
  
    let hasErrors = false;
    const newErrors = {};
  
    // Check required fields
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });
  
    // Check terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Bạn phải đồng ý với điều khoản';
      hasErrors = true;
    }
  
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: 'customer',
          restaurantName: '',
          agreeToTerms: false
        });
        setErrors({});
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        // Show specific error from server
        setErrors({ 
          submit: data.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.' 
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        submit: 'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.' 
      });
    }
  };

  

  return (
    <Container component="main" maxWidth="sm" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      <Paper elevation={3} sx={{ 
        p: { xs: 2, md: 4 }, 
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2
      }}>
        <Typography 
          component="h1" 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          Đăng ký tài khoản
        </Typography>

        Nhập họ và tên
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Họ tên"
            name="fullName"
            autoComplete="name"
            autoFocus
            value={formData.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={{ mb: 2 }}
          />

        Nhập email
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}

            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Số điện thoại"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={{ mb: 2 }}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{ mb: 2 }}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                sx={{ mb: 2 }}
            />

          <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Vai trò:</Typography>
            <RadioGroup
              row
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="customer" 
                control={<Radio />} 
                label="Khách hàng"
                sx={{ mr: 4 }}
              />
              <FormControlLabel 
                value="restaurant" 
                control={<Radio />} 
                label="Nhà hàng" 
              />
            </RadioGroup>
          </FormControl>

          {formData.role === 'restaurant' && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tên nhà hàng"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              error={!!errors.restaurantName}
              helperText={errors.restaurantName}
              sx={{ mt: 2 }}
            />
          )}

          <FormControlLabel
            control={
              <Checkbox
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Tôi đồng ý với các điều khoản sử dụng"
            sx={{ mt: 2 }}
          />

          {errors.agreeToTerms && (
            <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
              {errors.agreeToTerms}
            </Typography>
          )}

          {errors.submit && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {errors.submit}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Đăng ký
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Đã có tài khoản?{' '}
            <Link 
              href="/login" 
              variant="body2"
              sx={{ 
                textDecoration: 'none',
                fontWeight: 'medium',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Đăng nhập
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;