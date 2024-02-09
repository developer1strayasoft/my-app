import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Weather from './components/weather';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
const clientId = '862857909482-1gu20u6oqbeohcdesj3g0np071hshlir.apps.googleusercontent.com';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<GoogleOAuthProvider clientId={clientId}>
          <Login />
        </GoogleOAuthProvider>} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
};

export default App;
