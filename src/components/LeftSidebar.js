import React from 'react';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const menuItems = [
    { icon: '👤', text: 'John Doe', isProfile: true },
    { icon: '👥', text: 'Friends' },
    { icon: '👥', text: 'Groups' },
    { icon: '🏪', text: 'Marketplace' },
    { icon: '📺', text: 'Watch' },
    { icon: '📅', text: 'Events' },
    { icon: '📄', text: 'Pages' },
    { icon: '💾', text: 'Saved' },
    { icon: '🎮', text: 'Gaming' },
    { icon: '📰', text: 'News' },
    { icon: '🏃', text: 'Fitness' },
    { icon: '🎵', text: 'Music' }
  ];

  const shortcuts = [
    { name: 'React Developers', image: '⚛️' },
    { name: 'JavaScript Community', image: '🟨' },
    { name: 'Web Development', image: '🌐' },
    { name: 'UI/UX Design', image: '🎨' },
    { name: 'Tech News', image: '📱' }
  ];

  return (
    <div className="left-sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div key={index} className={`menu-item ${item.isProfile ? 'profile-item' : ''}`}>
            <div className="menu-icon">{item.icon}</div>
            <span className="menu-text">{item.text}</span>
          </div>
        ))}
        <div className="menu-item">
          <div className="menu-icon">⬇️</div>
          <span className="menu-text">See More</span>
        </div>
      </div>

      <hr className="sidebar-divider" />

      <div className="shortcuts-section">
        <div className="shortcuts-header">
          <span>Your Shortcuts</span>
        </div>
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="shortcut-item">
            <div className="shortcut-image">{shortcut.image}</div>
            <span className="shortcut-name">{shortcut.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
