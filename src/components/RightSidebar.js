import React from 'react';
import './RightSidebar.css';

const RightSidebar = () => {
  const contacts = [
    { name: 'Alice Smith', avatar: '👩‍🦰', online: true },
    { name: 'Bob Johnson', avatar: '👨‍🦲', online: true },
    { name: 'Carol Davis', avatar: '👩‍🦱', online: false },
    { name: 'David Wilson', avatar: '👨‍🦳', online: true },
    { name: 'Eva Brown', avatar: '👩‍🦳', online: false },
    { name: 'Frank Miller', avatar: '👨‍🦰', online: true },
    { name: 'Grace Lee', avatar: '👩', online: true },
    { name: 'Henry Taylor', avatar: '👨', online: false }
  ];

  const sponsoredContent = [
    {
      title: 'Learn React Development',
      description: 'Master React with our comprehensive course',
      image: '⚛️',
      link: 'reactcourse.com'
    },
    {
      title: 'Best Code Editor 2024',
      description: 'Discover the most popular code editors',
      image: '💻',
      link: 'codeeditor.com'
    }
  ];

  const suggestions = [
    { name: 'JavaScript Developers', members: '45K members', image: '🟨' },
    { name: 'React Native Community', members: '32K members', image: '📱' },
    { name: 'Web Design Inspiration', members: '28K members', image: '🎨' }
  ];

  return (
    <div className="right-sidebar">
      <div className="sponsored-section">
        <h3 className="section-title">Sponsored</h3>
        {sponsoredContent.map((item, index) => (
          <div key={index} className="sponsored-item">
            <div className="sponsored-image">{item.image}</div>
            <div className="sponsored-content">
              <h4 className="sponsored-title">{item.title}</h4>
              <p className="sponsored-description">{item.description}</p>
              <span className="sponsored-link">{item.link}</span>
            </div>
          </div>
        ))}
      </div>

      <hr className="sidebar-divider" />

      <div className="suggestions-section">
        <h3 className="section-title">Suggested for you</h3>
        {suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-item">
            <div className="suggestion-image">{suggestion.image}</div>
            <div className="suggestion-content">
              <h4 className="suggestion-name">{suggestion.name}</h4>
              <p className="suggestion-members">{suggestion.members}</p>
            </div>
            <button className="join-button">Join</button>
          </div>
        ))}
      </div>

      <hr className="sidebar-divider" />

      <div className="contacts-section">
        <div className="contacts-header">
          <h3 className="section-title">Contacts</h3>
          <div className="contacts-actions">
            <span className="contact-icon">🔍</span>
            <span className="contact-icon">⋯</span>
          </div>
        </div>
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <div className="contact-avatar-container">
              <div className="contact-avatar">{contact.avatar}</div>
              {contact.online && <div className="online-indicator"></div>}
            </div>
            <span className="contact-name">{contact.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
