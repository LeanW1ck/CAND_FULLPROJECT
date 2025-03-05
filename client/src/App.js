import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocationProvider } from './context/LocationContext';

// Components
import Header from './components/Header';
import Banner from './components/Banner';
import FeaturedRestaurants from './components/FeaturedRestaurants';
import Reviews from './components/Reviews';
import BlogPosts from './components/BlogPosts';
import Footer from './components/Footer';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocationProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Banner />
                    <FeaturedRestaurants />
                    <Reviews />
                    <BlogPosts />
                  </>
                } />
                {/* Add more routes here */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;
