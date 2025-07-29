import { useState } from 'react';
import './SlidingPanel.css';

const SlidingPanel = ({ onClose, mode = 'events', onShowAddEvent, onBackToEvents, title = 'Upcoming Events' }) => {
  const [expandedCards, setExpandedCards] = useState({
    card1: true,
    card2: false,
    card3: false,
    card4: false,
    card5: false
  });

  const [events, setEvents] = useState([
    {
      id: 'card1',
      date: 'December 15, 2024',
      title: 'Bhakti Vriksha Canto 1 Session',
      host: 'Ramya',
      timing: '6:00 PM',
      address: '706 Arcadia Dr',
      description: 'Bhakti Vriksha session exploring Canto 1 with devotional discussions and community fellowship.'
    },
    {
      id: 'card2',
      date: 'December 22, 2024',
      title: 'Special Kirtan Evening',
      host: 'Krishna Das',
      timing: '7:00 PM',
      address: '123 Temple Street',
      description: 'Special Kirtan evening with traditional devotional songs and spiritual discourse on Bhagavatam teachings.'
    },
    {
      id: 'card3',
      date: 'December 29, 2024',
      title: 'Year-End Celebration',
      host: 'Priya Sharma',
      timing: '5:30 PM',
      address: '456 Lotus Avenue',
      description: 'Year-end celebration with Bhagavatam recitation, prasadam sharing, and community bonding activities.'
    },
    {
      id: 'card4',
      date: 'January 5, 2025',
      title: 'New Year Spiritual Gathering',
      host: 'Govind Patel',
      timing: '6:30 PM',
      address: '789 Vrindavan Circle',
      description: 'New Year spiritual gathering focusing on Canto 2 with meditation and philosophical discussions.'
    },
    {
      id: 'card5',
      date: 'January 12, 2025',
      title: 'Bhakti Principles Workshop',
      host: 'Radha Devi',
      timing: '4:00 PM',
      address: '321 Gokul Gardens',
      description: 'Interactive workshop on Bhakti principles with practical applications in daily life and spiritual growth.'
    }
  ]);



  // Close panel when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('panel-overlay')) {
      onClose();
    }
  };

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const addNewEvent = (eventData) => {
    const newEventId = `card${events.length + 1}`;
    const newEvent = {
      id: newEventId,
      ...eventData
    };

    setEvents(prev => [...prev, newEvent]);
    setExpandedCards(prev => ({
      ...prev,
      [newEventId]: true
    }));
    onBackToEvents();
  };

  return (
    <div className="panel-overlay" onClick={handleOverlayClick}>
      <div className="sliding-panel">
        <div className="panel-header">
          <h3 className="panel-title">{title}</h3>
        </div>
        
        <div className="panel-content">
          {mode === 'events' ? (
            <div className="events-section">
              <div className="events-list">
                {events.map((event) => (
                  <div key={event.id} className="event-card">
                    <div className="event-date-header" onClick={() => toggleCard(event.id)}>
                      <div className="date-text">{event.date}</div>
                      <div className="collapse-button">
                        {expandedCards[event.id] ? '▼' : '▶'}
                      </div>
                    </div>
                    <div className="event-title-section">
                      <h5 className="event-title">{event.title}</h5>
                      <span className="event-host">by {event.host}</span>
                    </div>
                    {expandedCards[event.id] && (
                      <div className="event-details">
                        <div className="detail-item">
                          <span className="detail-label">Timing:</span>
                          <span className="detail-value">{event.timing}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Address:</span>
                          <span className="detail-value">{event.address}</span>
                        </div>
                        <div className="detail-item description">
                          <span className="detail-label">Description:</span>
                          <span className="detail-value">{event.description}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="add-event-section">
                  <button
                    className="add-event-button"
                    onClick={onShowAddEvent}
                  >
                    <span className="add-icon">➕</span>
                    <span className="add-text">Add New Event</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <AddEventForm onAdd={addNewEvent} onCancel={onBackToEvents} />
          )}
        </div>
      </div>
    </div>
  );
};

const AddEventForm = ({ onAdd, onCancel }) => {
  // Get today's date in YYYY-MM-DD format for date input
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get today's date in readable format for display
  const getTodayFormatted = () => {
    const today = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return today.toLocaleDateString('en-US', options);
  };

  const [formData, setFormData] = useState({
    date: getTodayFormatted(),
    dateRaw: getTodayDate(),
    title: '',
    host: '',
    timing: '',
    address: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date && formData.title && formData.host) {
      onAdd(formData);
      setFormData({
        date: getTodayFormatted(),
        dateRaw: getTodayDate(),
        title: '',
        host: '',
        timing: '',
        address: '',
        description: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Format date for display in event cards
    if (name === 'date' && value) {
      const dateObj = new Date(value);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      processedValue = dateObj.toLocaleDateString('en-US', options);
    }

    setFormData(prev => ({
      ...prev,
      [name]: name === 'date' ? processedValue : value,
      [`${name}Raw`]: name === 'date' ? value : undefined
    }));
  };

  return (
    <div className="add-event-inline">
      <div className="form-header">
        <button className="back-button" onClick={onCancel}>
          <span className="back-icon">←</span>
          <span className="back-text">Back to Events</span>
        </button>
      </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label className="form-label">Event Date *</label>
            <div className="date-input-wrapper">
              <input
                type="date"
                name="date"
                value={formData.dateRaw || ''}
                onChange={handleChange}
                className="form-input date-input"
                required
              />
              <span className="date-icon">📅</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Bhakti Yoga Workshop"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Host Name *</label>
            <input
              type="text"
              name="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Timing</label>
            <input
              type="text"
              name="timing"
              value={formData.timing}
              onChange={handleChange}
              placeholder="e.g., 7:00 PM"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main Street"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event..."
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Event
            </button>
          </div>
        </form>
    </div>
  );
};

export default SlidingPanel;
