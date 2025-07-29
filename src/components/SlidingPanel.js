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

            <div className="cards-grid">
              <div className="info-card host-card">
                <div className="card-header">
                  <div className="card-icon">👤</div>
                  <div className="card-title">Host</div>
                </div>
                <div className="card-content">
                  <div className="card-value">Ramya</div>
                </div>
              </div>

              <div className="info-card timing-card">
                <div className="card-header">
                  <div className="card-icon">🕕</div>
                  <div className="card-title">Timing</div>
                </div>
                <div className="card-content">
                  <div className="card-value">6pm</div>
                </div>
              </div>

              <div className="info-card location-card">
                <div className="card-header">
                  <div className="card-icon">📍</div>
                  <div className="card-title">Location</div>
                </div>
                <div className="card-content">
                  <div className="card-value">706 Arcadia Dr</div>
                </div>
              </div>

              <div className="info-card participants-card">
                <div className="card-header">
                  <div className="card-icon">👥</div>
                  <div className="card-title">Participants</div>
                </div>
                <div className="card-content">
                  <div className="card-value">25</div>
                  <div className="card-subtitle">Expected</div>
                </div>
              </div>

              <div className="info-card description-card full-width">
                <div className="card-header">
                  <div className="card-icon">📝</div>
                  <div className="card-title">Description</div>
                </div>
                <div className="card-content">
                  <div className="card-description">Join us for an enlightening session of Bhakti Vriksha, exploring the spiritual teachings of the Bhagavatam with devotional discussions and community fellowship.</div>
                </div>
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
