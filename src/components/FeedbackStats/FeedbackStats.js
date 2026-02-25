import React, { useState, useEffect } from 'react';
import './FeedbackStats.css';

const apiUrl = 'https://bhagavad-gita-api-rbihcaaz5a-uc.a.run.app';

const FeedbackStats = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // PIN code - you can change this to your desired PIN
  const ADMIN_PIN = '1234';

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeedbackStats();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid PIN code. Please try again.');
      setPinInput('');
    }
  };

  const fetchFeedbackStats = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/feedback/stats`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch feedback stats');

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching feedback stats:', err);
      setError('Failed to load feedback statistics. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="feedback-stats-overlay" onClick={onClose}>
        <div className="feedback-stats-container pin-entry" onClick={(e) => e.stopPropagation()}>
          <div className="feedback-stats-header">
            <h2>🔒 Admin Access Required</h2>
            <button className="close-button" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
          <div className="pin-entry-content">
            <p>Please enter the PIN code to access feedback statistics</p>
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN"
                className="pin-input"
                maxLength="6"
                autoFocus
              />
              {pinError && <p className="pin-error">{pinError}</p>}
              <button type="submit" className="pin-submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-stats-overlay" onClick={onClose}>
      <div className="feedback-stats-container" onClick={(e) => e.stopPropagation()}>
        <div className="feedback-stats-header">
          <h2>📊 Feedback Statistics</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading statistics...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={fetchFeedbackStats} className="retry-button">
              Retry
            </button>
          </div>
        ) : stats ? (
          <div className="feedback-stats-content">
            {/* Summary Cards */}
            <div className="stats-summary">
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <h3>{stats.total_feedback}</h3>
                  <p>Total Feedback</p>
                </div>
              </div>
              <div className="stat-card positive">
                <div className="stat-icon">👍</div>
                <div className="stat-info">
                  <h3>{stats.thumbs_up}</h3>
                  <p>Thumbs Up</p>
                </div>
              </div>
              <div className="stat-card negative">
                <div className="stat-icon">👎</div>
                <div className="stat-info">
                  <h3>{stats.thumbs_down}</h3>
                  <p>Thumbs Down</p>
                </div>
              </div>
              <div className="stat-card satisfaction">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>{stats.satisfaction_rate}%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Recent Feedback List */}
            <div className="recent-feedback-section">
              <h3>Recent Feedback</h3>
              {stats.recent_feedback && stats.recent_feedback.length > 0 ? (
                <div className="feedback-list">
                  {stats.recent_feedback.map((feedback) => (
                    <div key={feedback.feedback_id} className="feedback-item">
                      <div className="feedback-header">
                        <span className={`feedback-badge ${feedback.liked ? 'liked' : 'disliked'}`}>
                          {feedback.liked ? '👍 Liked' : '👎 Disliked'}
                        </span>
                        <span className="feedback-date">{formatDate(feedback.created_at)}</span>
                      </div>
                      <div className="feedback-question">
                        <strong>Q:</strong> {feedback.question}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-feedback">No feedback available yet.</p>
              )}
            </div>

            {/* Refresh Button */}
            <div className="refresh-section">
              <button onClick={fetchFeedbackStats} className="refresh-button">
                🔄 Refresh Data
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FeedbackStats;
