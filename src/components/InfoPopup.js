import { useState, useEffect } from 'react';
import './InfoPopup.css';

const InfoPopup = ({ onClose }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    // Get hostname
    setHostname(window.location.hostname || 'localhost');

    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Close popup when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="info-popup">
        <div className="popup-header">
          <h3 className="popup-title">System Information</h3>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="popup-content">
          <div className="info-item">
            <div className="info-icon">🕐</div>
            <div className="info-details">
              <div className="info-label">Current Time</div>
              <div className="info-value">{currentTime}</div>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">🌐</div>
            <div className="info-details">
              <div className="info-label">Hostname</div>
              <div className="info-value">{hostname}</div>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">🕉️</div>
            <div className="info-details">
              <div className="info-label">Website</div>
              <div className="info-value">Bhakti Vriksha</div>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📱</div>
            <div className="info-details">
              <div className="info-label">Platform</div>
              <div className="info-value">{navigator.platform || 'Unknown'}</div>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">🌍</div>
            <div className="info-details">
              <div className="info-label">Browser</div>
              <div className="info-value">{navigator.userAgent.split(' ')[0] || 'Unknown'}</div>
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

export default InfoPopup;
