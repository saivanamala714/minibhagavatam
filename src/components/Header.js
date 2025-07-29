
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import SlidingPanel from './SlidingPanel';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState('events'); // 'events' or 'addEvent'

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
    if (!showPopup) {
      setPopupMode('events'); // Reset to events view when opening
    }
  };

  const showAddEventForm = () => {
    setPopupMode('addEvent');
  };

  const backToEvents = () => {
    setPopupMode('events');
  };

  return (
    <>
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
      </div>
      {showPopup && (
        <SlidingPanel
          onClose={() => setShowPopup(false)}
          mode={popupMode}
          onShowAddEvent={showAddEventForm}
          onBackToEvents={backToEvents}
        />
      )}
    </>
  );
};

export default Header;
