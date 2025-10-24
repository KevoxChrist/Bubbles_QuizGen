// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import Footer from './components/Footer';

// import Home from './pages/Home';
// import Account from './pages/Account';
import Quiz from './pages/Quiz';

import './styles/shared.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Quiz />} />
            {/* <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/quiz" element={<Quiz />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

