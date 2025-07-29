import { useState, useEffect } from 'react';
import './KrishnaOverlay.css';

const KrishnaOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show Krishna overlay after a short delay when component mounts
    const showTimer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 2000); // Show after 2 seconds of page load

    return () => clearTimeout(showTimer);
  }, [hasShown]);

  useEffect(() => {
    if (isVisible) {
      // Hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  // Function to trigger Krishna overlay manually (can be called from other components)
  const showKrishnaBlessing = () => {
    setIsVisible(true);
  };

  // Expose the function globally for other components to use
  useEffect(() => {
    window.showKrishnaBlessing = showKrishnaBlessing;
    return () => {
      delete window.showKrishnaBlessing;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="krishna-overlay">
      <div className="krishna-background">
        <div className="krishna-gradient-top"></div>
        <div className="krishna-gradient-bottom"></div>
        <div className="krishna-gradient-left"></div>
        <div className="krishna-gradient-right"></div>
        
        <div className="krishna-image-container">
          <img 
            src="/images/krishnaImage.jpeg" 
            alt="Lord Krishna" 
            className="krishna-image"
          />
          <div className="krishna-glow"></div>
        </div>

        <div className="krishna-blessing-text">
          <div className="sanskrit-blessing">
            हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे
          </div>
          <div className="english-blessing">
            May Lord Krishna bless your spiritual journey
          </div>
        </div>

        <div className="divine-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
      </div>
    </div>
  );
};

export default KrishnaOverlay;
