import React from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainFeed from './components/MainFeed';
import RightSidebar from './components/RightSidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <LeftSidebar />
        <MainFeed />
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
