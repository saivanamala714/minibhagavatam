import { useState, useEffect } from 'react';
import './InfoPopup.css';

const InfoPopup = ({ onClose }) => {
  const [location, setLocation] = useState('Loading...');
  const [currentTime, setCurrentTime] = useState('');
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    // Get hostname
    setHostname(window.location.hostname || 'localhost');

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding API to get location name
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              setLocation(`${data.city || data.locality || 'Unknown'}, ${data.countryName || 'Unknown'}`);
            })
            .catch(() => {
              setLocation('Location unavailable');
            });
        },
        () => {
          setLocation('Location permission denied');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }

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
            <div className="info-icon">📍</div>
            <div className="info-details">
              <div className="info-label">Location</div>
              <div className="info-value">{location}</div>
            </div>
          </div>

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
