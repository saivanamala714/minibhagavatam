import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-text">facebook</span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search Facebook" />
          <div className="search-icon">🔍</div>
        </div>
      </div>
      
      <div className="header-center">
        <div className="nav-icons">
          <div className="nav-icon active">🏠</div>
          <div className="nav-icon">👥</div>
          <div className="nav-icon">📺</div>
          <div className="nav-icon">🏪</div>
          <div className="nav-icon">👥</div>
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-option">
          <div className="profile-pic">👤</div>
          <span>John Doe</span>
        </div>
        <div className="header-option">
          <div className="icon">➕</div>
        </div>
        <div className="header-option">
          <div className="icon">💬</div>
        </div>
        <div className="header-option">
          <div className="icon">🔔</div>
        </div>
        <div className="header-option">
          <div className="icon">⚙️</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
