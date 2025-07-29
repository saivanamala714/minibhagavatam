
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import CenterPopup from './CenterPopup';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <span className="logo-text">Bhakti Vriksha</span>
      </div>
      <div className="header-right">
        <DarkModeToggle />
        <button className="popup-button" onClick={togglePopup}>
          <span className="button-icon">📋</span>
          <span className="button-text">Menu</span>
        </button>
      </div>
      {showPopup && <CenterPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Header;
