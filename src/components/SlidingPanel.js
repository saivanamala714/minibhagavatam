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
          <h3 className="panel-title">Event Details</h3>
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
                <span className="event-key">Event Location:</span>
                <span className="event-value">706 Arcadia Dr</span>
              </div>
            </div>

            <div className="timing-card">
              <div className="card-header">
                <div className="card-icon">🕕</div>
                <div className="card-title">Event Timing</div>
              </div>
              <div className="card-content">
                <div className="timing-display">6pm</div>
                <div className="timing-subtitle">Today's Session</div>
              </div>
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
