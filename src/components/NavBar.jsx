// src/components/NavBar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/shared.css'; 

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log('Menu toggle clicked, current state:', menuOpen);
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link 
          to="/" 
          className="logo"
          aria-label="Bubbles LRNR - Home"
        >
          <motion.div 
            className="logoIcon"
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="sparkle" aria-hidden="true" />
          </motion.div>
          <h1 className="logoText">
            Bubbles <span className="divider">|</span> LRNR
          </h1>
        </Link>
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <ul className={`navbar-nav ${menuOpen ? 'active' : ''}`}>
        <li><Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link className="nav-link" to="/account" onClick={() => setMenuOpen(false)}>Account</Link></li>
        <li><Link className="nav-link" to="/quiz" onClick={() => setMenuOpen(false)}>Quiz</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
