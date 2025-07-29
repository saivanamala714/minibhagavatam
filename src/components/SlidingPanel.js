import './SlidingPanel.css';

const SlidingPanel = ({ onClose }) => {
  // Close panel when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('panel-overlay')) {
      onClose();
    }
  };

  return (
    <div className="panel-overlay" onClick={handleOverlayClick}>
      <div className="sliding-panel">
        <div className="panel-header">
          <h3 className="panel-title">Menu</h3>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="panel-content">
          <div className="event-info-section">
            <h4 className="event-info-title">Event Information</h4>
            <div className="event-info-list">
              <div className="event-info-item">
                <span className="bullet">•</span>
                <span className="event-key">Event Host Name:</span>
                <span className="event-value">Ramya</span>
              </div>
              <div className="event-info-item">
                <span className="bullet">•</span>
                <span className="event-key">Event Timings:</span>
                <span className="event-value">6pm</span>
              </div>
              <div className="event-info-item">
                <span className="bullet">•</span>
                <span className="event-key">Event Location:</span>
                <span className="event-value">706 Arcadia Dr</span>
              </div>
            </div>
          </div>

          <div className="menu-divider"></div>

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

        <div className="panel-footer">
          <button className="action-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlidingPanel;
