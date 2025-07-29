
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import InfoPopup from './InfoPopup';
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
        <button className="info-button" onClick={togglePopup}>
          <span className="button-icon">ℹ️</span>
          <span className="button-text">Info</span>
        </button>
      </div>
      {showPopup && <InfoPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Header;
