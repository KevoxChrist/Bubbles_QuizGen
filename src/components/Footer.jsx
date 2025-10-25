// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared.css'; 

const Footer = () => {
  return (
<footer className="shared__footer">     

  <div className="footer-container">
    <div className="col__1">
      <h2>Useful Links</h2>
      <Link to="/">Home</Link>
      <Link to="/account">Account</Link>
      <Link to="/quiz">Quiz</Link>
    </div>
  </div>

    <div className="col__2">
      <div className="social__links">
        <a href="#"><i className="fa-brands fa-facebook"></i></a>
        <a href="#"><i className="fa-brands fa-instagram"></i></a>
        <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
        <a href="#"><i className="fa-brands fa-tiktok"></i></a>
      </div>
    </div>
  <p className="footer__copyright">
    ©2025 Bubbles. All rights reserved.
  </p>
</footer>

  );
};

export default Footer;