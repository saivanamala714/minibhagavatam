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
          <div className="events-section">
            <h4 className="events-title">Upcoming Events</h4>

            <div className="events-list">
              <div className="event-card">
                <div className="event-date-header">
                  <div className="date-icon">📅</div>
                  <div className="date-text">December 15, 2024</div>
                </div>
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">Host:</span>
                    <span className="detail-value">Ramya</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Timing:</span>
                    <span className="detail-value">6:00 PM</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">706 Arcadia Dr</span>
                  </div>
                  <div className="detail-item description">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">Bhakti Vriksha session exploring Canto 1 with devotional discussions and community fellowship.</span>
                  </div>
                </div>
              </div>

              <div className="event-card">
                <div className="event-date-header">
                  <div className="date-icon">📅</div>
                  <div className="date-text">December 22, 2024</div>
                </div>
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">Host:</span>
                    <span className="detail-value">Krishna Das</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Timing:</span>
                    <span className="detail-value">7:00 PM</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">123 Temple Street</span>
                  </div>
                  <div className="detail-item description">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">Special Kirtan evening with traditional devotional songs and spiritual discourse on Bhagavatam teachings.</span>
                  </div>
                </div>
              </div>

              <div className="event-card">
                <div className="event-date-header">
                  <div className="date-icon">📅</div>
                  <div className="date-text">December 29, 2024</div>
                </div>
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">Host:</span>
                    <span className="detail-value">Priya Sharma</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Timing:</span>
                    <span className="detail-value">5:30 PM</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">456 Lotus Avenue</span>
                  </div>
                  <div className="detail-item description">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">Year-end celebration with Bhagavatam recitation, prasadam sharing, and community bonding activities.</span>
                  </div>
                </div>
              </div>

              <div className="event-card">
                <div className="event-date-header">
                  <div className="date-icon">📅</div>
                  <div className="date-text">January 5, 2025</div>
                </div>
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">Host:</span>
                    <span className="detail-value">Govind Patel</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Timing:</span>
                    <span className="detail-value">6:30 PM</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">789 Vrindavan Circle</span>
                  </div>
                  <div className="detail-item description">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">New Year spiritual gathering focusing on Canto 2 with meditation and philosophical discussions.</span>
                  </div>
                </div>
              </div>

              <div className="event-card">
                <div className="event-date-header">
                  <div className="date-icon">📅</div>
                  <div className="date-text">January 12, 2025</div>
                </div>
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">Host:</span>
                    <span className="detail-value">Radha Devi</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Timing:</span>
                    <span className="detail-value">4:00 PM</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">321 Gokul Gardens</span>
                  </div>
                  <div className="detail-item description">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">Interactive workshop on Bhakti principles with practical applications in daily life and spiritual growth.</span>
                  </div>
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
