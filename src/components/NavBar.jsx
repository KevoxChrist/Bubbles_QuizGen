// src/components/NavBar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared.css'; 

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Bubbles</Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <ul className={`navbar-nav ${menuOpen ? 'active' : ''}`}>
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="/account">Account</Link></li>
        <li><Link className="nav-link" to="/quiz">Quiz</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
