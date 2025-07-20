import React from 'react';
import PostCreator from './PostCreator';
import Post from './Post';
import './MainFeed.css';

const MainFeed = () => {
  const posts = [
    {
      id: 1,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '�',
        time: '1h'
      },
      content: 'Canto 1: Creation - The beginning of all creation and the appearance of Narada Muni. This canto establishes the foundation of spiritual knowledge.',
      image: '/images/Canto 1.png',
      likes: 108,
      comments: 24,
      shares: 12
    },
    {
      id: 2,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '📖',
        time: '2h'
      },
      content: 'Canto 2: The Cosmic Manifestation - Describes the universal form and the process of creation through the Supreme Lord.',
      image: '/images/Canto 2.png',
      likes: 156,
      comments: 42,
      shares: 28
    },
    {
      id: 3,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '�',
        time: '3h'
      },
      content: 'Canto 3: The Status Quo - The creation of the material universe and the appearance of Lord Brahma.',
      image: '/images/Canto 3.png',
      likes: 189,
      comments: 35,
      shares: 17
    },
    {
      id: 4,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '📖',
        time: '4h'
      },
      content: 'Canto 4: The Creation of the Fourth Order - Stories of devotees and the importance of devotional service.',
      image: '/images/Canto 4.png',
      likes: 203,
      comments: 67,
      shares: 45
    },
    {
      id: 5,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '📖',
        time: '5h'
      },
      content: 'Canto 5: The Creative Impetus - Describes the structure of the universe and the activities of King Priyavrata.',
      image: '/images/Canto 5.png',
      likes: 312,
      comments: 89,
      shares: 23
    },
    {
      id: 6,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '�',
        time: '6h'
      },
      content: 'Canto 6: Prescribed Duties for Mankind - The story of Ajamila and the power of chanting the holy names.',
      image: '/images/Canto 6.png',
      likes: 267,
      comments: 54,
      shares: 31
    },
    {
      id: 7,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '📖',
        time: '7h'
      },
      content: 'Canto 7: The Science of God - The story of Prahlada Maharaja and his devotion to Lord Narasimha.',
      image: '/images/Canto 7.png',
      likes: 445,
      comments: 98,
      shares: 67
    },
    {
      id: 8,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '📖',
        time: '8h'
      },
      content: 'Canto 8: Withdrawal of the Cosmic Creations - The churning of the ocean and the appearance of Lord Kurma.',
      image: '/images/Canto 8.png',
      likes: 378,
      comments: 76,
      shares: 42
    },
    {
      id: 9,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '📖',
        time: '9h'
      },
      content: 'Canto 9: Liberation - The dynasties of the sun and moon, and the appearance of Lord Ramachandra.',
      image: '/images/Canto 9.png',
      likes: 523,
      comments: 134,
      shares: 89
    },
    {
      id: 10,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '📖',
        time: '10h'
      },
      content: 'Canto 10: The Summum Bonum - The pastimes of Lord Krishna in Vrindavan and Mathura. The most beloved canto.',
      image: '/images/Canto 10.png',
      likes: 1008,
      comments: 256,
      shares: 178
    },
    {
      id: 11,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '�',
        time: '11h'
      },
      content: 'Canto 11: General History - Krishna\'s final instructions to Uddhava before His departure from this world.',
      image: '/images/Canto 11.png',
      likes: 687,
      comments: 145,
      shares: 98
    },
    {
      id: 12,
      user: {
        name: 'Srimad Bhagavatam',
        avatar: '📖',
        time: '12h'
      },
      content: 'Canto 12: The Age of Deterioration - Predictions about Kali-yuga and the ultimate conclusion of the Bhagavatam.',
      image: '/images/Canto 12.png',
      likes: 456,
      comments: 87,
      shares: 54
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
