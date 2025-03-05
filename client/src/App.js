import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Header from './components/Header';
import Banner from './components/Banner';
import FeaturedRestaurants from './components/FeaturedRestaurants';

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
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Banner />
                  <FeaturedRestaurants />
                </>
              } />
              {/* Add more routes here */}
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
