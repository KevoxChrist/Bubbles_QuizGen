// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import Footer from './components/Footer';

import HomePage from './pages/Home.jsx';
// import Quiz from './pages/Quiz';
// import Account from './pages/Account';

import './styles/shared.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/*<Route path="/quiz" element={<Quiz />} />*/}
            {/* <Route path="/account" element={<Account />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
