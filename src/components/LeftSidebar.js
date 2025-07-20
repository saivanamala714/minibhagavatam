import React from 'react';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const menuItems = [
    { icon: '/images/Canto 1.png', text: 'Canto 1', isProfile: true },
    { icon: '/images/Canto 2.png', text: 'Canto 2' },
    { icon: '/images/Canto 3.png', text: 'Canto 3' },
    { icon: '/images/Canto 4.png', text: 'Canto 4' },
    { icon: '/images/Canto 5.png', text: 'Canto 5' },
    { icon: '/images/Canto 6.png', text: 'Canto 6' },
    { icon: '/images/Canto 7.png', text: 'Canto 7' },
    { icon: '/images/Canto 8.png', text: 'Canto 8' },
    { icon: '/images/Canto 9.png', text: 'Canto 9' },
    { icon: '/images/Canto 10.png', text: 'Canto 10' },
    { icon: '/images/Canto 11.png', text: 'Canto 11' },
    { icon: '/images/Canto 12.png', text: 'Canto 12' }
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
            <div className="menu-icon">
              {item.icon.startsWith('/images/') ? (
                <img src={item.icon} alt={item.text} className="menu-icon-image" />
              ) : (
                item.icon
              )}
            </div>
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
