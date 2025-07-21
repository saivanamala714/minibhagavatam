import React from 'react';
import PostCreator from './PostCreator';
import Post from './Post';
import summaryData from '../summaryInFiftyWords.json';
import './MainFeed.css';

const MainFeed = () => {
  const posts = summaryData.cantos.map((canto, index) => ({
    id: canto.number,
    user: {
      name: 'Srimad Bhagavatam',
      avatar: '📖',
      time: `${canto.number}h`
    },
    content: `Canto ${canto.number}: ${canto.title} - ${canto.summary}`,
    image: `/images/Canto ${canto.number}.png`,
    likes: [108, 156, 189, 203, 312, 267, 445, 378, 523, 1008, 687, 456][index],
    comments: [24, 42, 35, 67, 89, 54, 98, 76, 134, 256, 145, 87][index],
    shares: [12, 28, 17, 45, 23, 31, 67, 42, 89, 178, 98, 54][index]
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
