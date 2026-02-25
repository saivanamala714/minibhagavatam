
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import SlidingPanel from './SlidingPanel';
import FeedbackStats from './FeedbackStats/FeedbackStats';
import ConversationsView from './ConversationsView/ConversationsView';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState('events'); // 'events' or 'addEvent'
  const [showFeedbackStats, setShowFeedbackStats] = useState(false);
  const [showConversations, setShowConversations] = useState(false);

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
          <button className="popup-button" onClick={() => setShowConversations(true)}>
            <span className="button-icon">💬</span>
            <span className="button-text">Chats</span>
          </button>
          <button className="popup-button" onClick={() => setShowFeedbackStats(true)}>
            <span className="button-icon">📊</span>
            <span className="button-text">Stats</span>
          </button>
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
          title={popupMode === 'events' ? 'Upcoming Events' : 'Add New Event'}
        />
      )}
      {showFeedbackStats && (
        <FeedbackStats onClose={() => setShowFeedbackStats(false)} />
      )}
      {showConversations && (
        <ConversationsView onClose={() => setShowConversations(false)} />
      )}
    </>
  );
};

export default Header;
