import React from 'react';
import PostCreator from './PostCreator';
import Post from './Post';
import summaryData from '../summaryInFiftyWords.json';
import './MainFeed.css';

const MainFeed = () => {
  const posts = summaryData.cantos.map((canto) => ({
    id: canto.number,
    user: {
      name: 'Srimad Bhagavatam',
      avatar: '📖',
      time: `${canto.number}h`
    },
    content: `Canto ${canto.number}: ${canto.title} - ${canto.summary}`,
    image: `/images/Canto ${canto.number}.png`
  }));

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
