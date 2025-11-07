// src/components/NavBar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/shared.css'; 

function Navbar() {
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
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <ul className={`navbar-nav }`}>
      
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="/account">Account</Link></li>
        <li><Link className="nav-link" to="/quiz">Quiz</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
