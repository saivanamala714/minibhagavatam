import React, { useState } from 'react';
import './Post.css';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user-info">
          <div className="post-avatar">{post.user.avatar}</div>
          <div className="post-user-details">
            <h4 className="post-username">{post.user.name}</h4>
            <span className="post-time">{post.user.time} ago</span>
          </div>
        </div>
        <div className="post-options">
          <span className="post-menu">⋯</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <div className="post-image">
            {post.image.startsWith('/images/') ? (
              <img src={post.image} alt="Canto illustration" className="actual-image" />
            ) : (
              <div className="image-placeholder">{post.image}</div>
            )}
          </div>
        )}
      </div>

      <div className="post-stats">
        <div className="post-likes">
          <span className="like-icon">👍</span>
          <span className="like-count">{likesCount}</span>
        </div>
        <div className="post-engagement">
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      <hr className="post-divider" />

      <div className="post-actions">
        <div 
          className={`post-action ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">👍</span>
          <span className="action-text">Like</span>
        </div>
        <div className="post-action">
          <span className="action-icon">💬</span>
          <span className="action-text">Comment</span>
        </div>
        <div className="post-action">
          <span className="action-icon">📤</span>
          <span className="action-text">Share</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
