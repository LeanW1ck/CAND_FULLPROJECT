import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import { useAuth } from './context/AuthContext';

// Components
import Header from './components/Header';
import Banner from './components/Banner';
import FeaturedRestaurants from './components/FeaturedRestaurants';
import Reviews from './components/Reviews';
import BlogPosts from './components/BlogPosts';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import RestaurantDashboard from './pages/RestaurantDashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e74c3c',
    },
    secondary: {
      main: '#2ecc71',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

// Main content layout that's shared between routes
const MainContent = () => (
  <>
    <Banner />
    <FeaturedRestaurants />
    <Reviews />
    <BlogPosts />
  </>
);

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            !user ? <MainContent /> : <Navigate to="/dashboard" />
          } />
          <Route path="/login" element={
            !user ? <Login /> : <Navigate to="/dashboard" />
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainContent />
            </ProtectedRoute>
          } />
          <Route path="/restaurant/dashboard" element={
            <ProtectedRoute>
              <RestaurantDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LocationProvider>
          <RestaurantProvider>
            <Router>
              <AppContent />
            </Router>
          </RestaurantProvider>
        </LocationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
