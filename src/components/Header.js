
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <span className="logo-text">Bhakti Vriksha</span>
      </div>
      <div className="header-right">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Header;
