import React, { useState } from 'react';
import './PostCreator.css';

const PostCreator = () => {
  const [postText, setPostText] = useState('');


  return (
    <div className="post-creator">
      <div className="post-creator-top">
        <div className="user-avatar">👤</div>
        <input
          type="text"
          placeholder="What's on your mind, John?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="post-input"
        />
      </div>
      
      <hr className="post-divider" />
      
      <div className="post-creator-bottom">
        <div className="post-option">
          <span className="option-icon">📹</span>
          <span className="option-text">Live Video</span>
        </div>
        <div className="post-option">
          <span className="option-icon">📷</span>
          <span className="option-text">Photo/Video</span>
        </div>
        <div className="post-option">
          <span className="option-icon">😊</span>
          <span className="option-text">Feeling/Activity</span>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
