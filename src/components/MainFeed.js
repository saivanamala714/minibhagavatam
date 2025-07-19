import React from 'react';
import PostCreator from './PostCreator';
import Post from './Post';
import './MainFeed.css';

const MainFeed = () => {
  const posts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '👩',
        time: '2h'
      },
      content: 'Just finished an amazing React project! The new hooks are incredible for state management. 🚀',
      image: null,
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      user: {
        name: 'Tech News Daily',
        avatar: '📱',
        time: '4h'
      },
      content: 'Breaking: New JavaScript framework announced at the developer conference. What are your thoughts?',
      image: '🖼️',
      likes: 156,
      comments: 42,
      shares: 28
    },
    {
      id: 3,
      user: {
        name: 'Mike Chen',
        avatar: '👨',
        time: '6h'
      },
      content: 'Beautiful sunset from my office window today. Sometimes you need to take a break from coding and appreciate the view! 🌅',
      image: '🌅',
      likes: 89,
      comments: 15,
      shares: 7
    },
    {
      id: 4,
      user: {
        name: 'Web Dev Community',
        avatar: '🌐',
        time: '8h'
      },
      content: 'Tips for better CSS: Use flexbox and grid for layouts, CSS custom properties for theming, and always think mobile-first! What are your favorite CSS tips?',
      image: null,
      likes: 203,
      comments: 67,
      shares: 45
    },
    {
      id: 5,
      user: {
        name: 'Emma Wilson',
        avatar: '👩‍💻',
        time: '12h'
      },
      content: 'Just deployed my first full-stack application! It took months of learning, but seeing it live is incredible. Thank you to everyone who helped along the way! 💪',
      image: null,
      likes: 312,
      comments: 89,
      shares: 23
    }
  ];

  return (
    <div className="main-feed">
      <PostCreator />
      <div className="posts-container">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MainFeed;
