import React from 'react';
import './Post.css';

const Post = ({ post }) => {

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user-info">
          <div className="post-avatar">{post.user.avatar}</div>
          <div className="post-user-details">
            <h4 className="post-username">{post.user.name}</h4>
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


    </div>
  );
};

export default Post;
