// src/components/Footer.jsx

import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import '../styles/shared.css';

const Footer = () => {
  return (
    <footer className="shared__footer">
      <div className="footer-container">
        <div className="col__1">
          <h2>Social</h2>
          <div className="social__links">
            <a href="https://www.facebook.com"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.twitter.com"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.tiktok.com"><i className="fa-brands fa-tiktok"></i></a>
          </div>
        </div>

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="footer-logoIcon">
              <Sparkles className="sparkle" aria-hidden="true" />
            </div>
            <h2 className="footer-logoText">
              Bubbles <span className="divider">|</span> LRNR
            </h2>
          </Link>
        </div>

        <div className="col__2">
          <h2>Useful Links</h2>
          <Link to="/">Home</Link>
          <Link to="/account">Account</Link>
          <Link to="/quiz">Quiz</Link>
        </div>
      </div>

      <p className="footer__copyright">
        ©2025 Bubbles. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;