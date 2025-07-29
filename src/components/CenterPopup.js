import './CenterPopup.css';

const CenterPopup = ({ onClose }) => {
  // Close popup when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="center-popup">
        <div className="popup-header">
          <h3 className="popup-title">Menu</h3>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="popup-content">
          <div className="menu-item">
            <div className="menu-icon">🏠</div>
            <div className="menu-details">
              <div className="menu-label">Home</div>
              <div className="menu-description">Return to main page</div>
            </div>
          </div>

          <div className="menu-item">
            <div className="menu-icon">📚</div>
            <div className="menu-details">
              <div className="menu-label">Cantos</div>
              <div className="menu-description">Browse all 12 Cantos</div>
            </div>
          </div>

          <div className="menu-item">
            <div className="menu-icon">🕉️</div>
            <div className="menu-details">
              <div className="menu-label">Quotes</div>
              <div className="menu-description">Daily spiritual wisdom</div>
            </div>
          </div>

          <div className="menu-item">
            <div className="menu-icon">🎵</div>
            <div className="menu-details">
              <div className="menu-label">Music</div>
              <div className="menu-description">Background devotional music</div>
            </div>
          </div>

          <div className="menu-item">
            <div className="menu-icon">🌙</div>
            <div className="menu-details">
              <div className="menu-label">Theme</div>
              <div className="menu-description">Switch between light and dark mode</div>
            </div>
          </div>

          <div className="menu-item">
            <div className="menu-icon">ℹ️</div>
            <div className="menu-details">
              <div className="menu-label">About</div>
              <div className="menu-description">Learn about Bhakti Vriksha</div>
            </div>
          </div>
        </div>

        <div className="popup-footer">
          <button className="action-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenterPopup;
