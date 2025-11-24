import { useState, useEffect } from 'react';
import './SlidingPanel.css';

const SlidingPanel = ({ onClose, mode = 'events', onShowAddEvent, onBackToEvents, title = 'Upcoming Events' }) => {
  const [expandedCards, setExpandedCards] = useState({
    card1: true,
    card2: false,
    card3: false,
    card4: false,
    card5: false
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events from API
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api-ezqtprfi3a-uc.a.run.app/api/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
      
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Events fetched successfully:', result);
      console.log('Result type:', typeof result, 'Is array:', Array.isArray(result));

      // Check if result is an array or has an events property
      let eventsArray = [];
      if (Array.isArray(result)) {
        eventsArray = result;
      } else if (result && Array.isArray(result.events)) {
        eventsArray = result.events;
      } else if (result && Array.isArray(result.data)) {
        eventsArray = result.data;
      } else {
        console.warn('Unexpected API response structure:', result);
        eventsArray = [];
      }

      // Transform API response to match our event structure
      const transformedEvents = eventsArray.map(event => {
        let eventDetails = {};
        try {
          eventDetails = JSON.parse(event.details);
        } catch (e) {
          console.error('Error parsing event details:', e);
          eventDetails = {
            title: 'Event',
            host: 'Unknown',
            timing: '',
            address: '',
            description: ''
          };
        }

        return {
          id: event.id,
          date: event.date,
          title: eventDetails.title,
          host: eventDetails.host,
          timing: eventDetails.timing,
          address: eventDetails.address,
          description: eventDetails.description
        };
      });

      setEvents(transformedEvents);

      // Set expanded state for all events (first one expanded by default)
      const expandedState = {};
      if (transformedEvents.length > 0) {
        transformedEvents.forEach((event, index) => {
          expandedState[event.id] = index === 0;
        });
      }
      setExpandedCards(expandedState);

    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

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

  const addNewEvent = async (eventData) => {
    try {
      const newEventId = `deployed-event-${Date.now()}`;

      // Prepare API payload matching the required format
      const apiPayload = {
        id: newEventId,
        date: eventData.dateRaw || eventData.date,
        details: JSON.stringify({
          title: eventData.title,
          host: eventData.host,
          timing: eventData.timing,
          address: eventData.address,
          description: eventData.description
        })
      };

      // Make API call to save event
      const response = await fetch('https://api-ezqtprfi3a-uc.a.run.app/api/event/saveEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Event saved successfully:', result);

      // Refresh events from server to get the latest data
      await fetchEvents();
      onBackToEvents();

      // Show success message
      alert('Event saved successfully!');

    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const deleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`https://api-ezqtprfi3a-uc.a.run.app/api/event/deleteEvent/${eventId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete event: ${response.status}`);
        }

        // Update local state after successful API call
        setEvents(prev => prev.filter(event => event.id !== eventId));
        setExpandedCards(prev => {
          const newExpandedCards = { ...prev };
          delete newExpandedCards[eventId];
          return newExpandedCards;
        });

        // Refresh events from server to get the latest data
        await fetchEvents();

        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  return (
    <div className="panel-overlay" onClick={handleOverlayClick}>
      <div className="sliding-panel">
        <div className="panel-header">
          <h3 className="panel-title">{title}</h3>
          <button className="close-button" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
        </div>
        
        <div className="panel-content">
          {mode === 'events' ? (
            <div className="events-section">
              {loading ? (
                <div className="loading-section">
                  <div className="loading-spinner">🔄</div>
                  <p>Loading events...</p>
                </div>
              ) : error ? (
                <div className="error-section">
                  <p>{error}</p>
                  <button onClick={fetchEvents} className="retry-button">
                    Try Again
                  </button>
                </div>
              ) : (
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
                      <div className="title-content">
                        <h5 className="event-title">{event.title}</h5>
                        <span className="event-host">by {event.host}</span>
                      </div>
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEvent(event.id);
                        }}
                        title="Delete Event"
                      >
                        🗑️
                      </button>
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
              )}
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
    timingRaw: '',
    address: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.date && formData.title && formData.host) {
      await onAdd(formData);
      setFormData({
        date: getTodayFormatted(),
        dateRaw: getTodayDate(),
        title: '',
        host: '',
        timing: '',
        timingRaw: '',
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

    // Format time for display in event cards
    if (name === 'timing' && value) {
      const [hours, minutes] = value.split(':');
      const hour12 = parseInt(hours) % 12 || 12;
      const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
      processedValue = `${hour12}:${minutes} ${ampm}`;
    }

    setFormData(prev => ({
      ...prev,
      [name]: (name === 'date' || name === 'timing') ? processedValue : value,
      [`${name}Raw`]: (name === 'date' || name === 'timing') ? value : undefined
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
            <div className="timing-input-wrapper">
              <input
                type="time"
                name="timing"
                value={formData.timingRaw || ''}
                onChange={handleChange}
                className="form-input timing-input"
              />
              <span className="timing-icon">🕐</span>
            </div>
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
